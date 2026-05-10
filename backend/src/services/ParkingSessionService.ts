import { JsonRepository } from '../repositories/JsonRepository';
import { Account, ParkingSession, RFIDCard, Vehicle, ParkingSpot } from '../types/domain';
import { LogService } from './LogService';
import { GATE_CLOSE, GATE_OPEN, SubscriptionService } from './SubscriptionService';
import { PricingPolicyService } from './PricingPolicyService';

export class ParkingSessionService {
  private sessionRepo = new JsonRepository<ParkingSession>('parkingSessions.json');
  private cardRepo = new JsonRepository<RFIDCard>('rfidCards.json');
  private accountRepo = new JsonRepository<Account>('accounts.json');
  private vehicleRepo = new JsonRepository<Vehicle>('vehicles.json');
  private spotRepo = new JsonRepository<ParkingSpot>('parkingSpots.json');
  private subscriptionService = new SubscriptionService();
  private pricingPolicyService = new PricingPolicyService();
  private logger = new LogService();

  async gateIn(cardId: string, licensePlate: string) {

    // 1. Verify card
    const card = await this.cardRepo.findById(cardId);
    if (!card || card.status !== 'ACTIVE') throw new Error('Invalid or inactive card');

    // 2. Check for existing active session
    const active = await this.sessionRepo.findOne(s => s.cardId === cardId && s.status === 'Active');
    if (active) throw new Error('Card already has an active session');

    // 3. Create session
    const session: ParkingSession = {
      id: `sess_${Date.now()}`,
      cardId,
      licensePlate,
      checkInTime: new Date().toISOString(),
      status: 'Active',
      fee: 0
    };

    // Auto-link vehicle if member
    if (card.type === 'MEMBER') {
      const vehicle = await this.vehicleRepo.findOne(v => v.licensePlate === licensePlate);
      if (vehicle) session.vehicleId = vehicle.id;
    }

    await this.sessionRepo.save(session);
    await this.logger.log(cardId, 'GATE_IN', { licensePlate, sessionId: session.id });
    return session;
  }

  async previewGateOut(cardId: string, mockCheckOutTime?: string) {
    const session = await this.sessionRepo.findOne(s => s.cardId === cardId && s.status === 'Active');
    if (!session) throw new Error('No active session for this card');

    const checkOutTime = mockCheckOutTime || new Date().toISOString();
    const card = await this.cardRepo.findById(cardId);
    const account = card?.accountId ? await this.accountRepo.findById(card.accountId) : undefined;
    const isMember = card?.type === 'MEMBER';
    const policy = await this.pricingPolicyService.getPolicy();
    const fee = isMember && this.subscriptionService.isMonthActive(account, checkOutTime) ? 0 : this.pricingPolicyService.feeForCard(card, account, policy);

    return { ...session, checkOutTime, fee, status: isMember ? 'Completed' as const : 'ReadyToPay' as const };
  }

  async gateOut(cardId: string, mockCheckOutTime?: string) {
    const session = await this.previewGateOut(cardId, mockCheckOutTime);
    const card = await this.cardRepo.findById(cardId);
    const isMember = card?.type === 'MEMBER';

    const updated: ParkingSession = {
      ...session,
      status: isMember ? 'Completed' : 'ReadyToPay'
    };

    await this.sessionRepo.save(updated);
    await this.logger.log(cardId, 'GATE_OUT', { sessionId: session.id, fee: session.fee });

    // If member, create unpaid transaction/invoice line (simulated)
    return updated;
  }


  private ensureWithinGateWindow(isoTime: string) {
    const date = new Date(isoTime);
    const minutes = date.getHours() * 60 + date.getMinutes();
    const [openHour, openMinute] = GATE_OPEN.split(':').map(Number);
    const [closeHour, closeMinute] = GATE_CLOSE.split(':').map(Number);
    const open = openHour * 60 + openMinute;
    const close = closeHour * 60 + closeMinute;

    if (minutes < open || minutes > close) {
      throw new Error('Bai xe chi hoat dong tu 06:30 den 18:00');
    }
  }

  async getActiveSessions() {
    return this.sessionRepo.findAll().then(all => all.filter(s => s.status === 'Active'));
  }

  async getSpots() {
    return this.spotRepo.findAll();
  }
}

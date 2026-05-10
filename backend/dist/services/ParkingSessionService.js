"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSessionService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
const SubscriptionService_1 = require("./SubscriptionService");
const PricingPolicyService_1 = require("./PricingPolicyService");
class ParkingSessionService {
    constructor() {
        this.sessionRepo = new JsonRepository_1.JsonRepository('parkingSessions.json');
        this.cardRepo = new JsonRepository_1.JsonRepository('rfidCards.json');
        this.accountRepo = new JsonRepository_1.JsonRepository('accounts.json');
        this.vehicleRepo = new JsonRepository_1.JsonRepository('vehicles.json');
        this.spotRepo = new JsonRepository_1.JsonRepository('parkingSpots.json');
        this.subscriptionService = new SubscriptionService_1.SubscriptionService();
        this.pricingPolicyService = new PricingPolicyService_1.PricingPolicyService();
        this.logger = new LogService_1.LogService();
    }
    async gateIn(cardId, licensePlate) {
        // 1. Verify card
        const card = await this.cardRepo.findById(cardId);
        if (!card || card.status !== 'ACTIVE')
            throw new Error('Invalid or inactive card');
        // 2. Check for existing active session
        const active = await this.sessionRepo.findOne(s => s.cardId === cardId && s.status === 'Active');
        if (active)
            throw new Error('Card already has an active session');
        // 3. Create session
        const session = {
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
            if (vehicle)
                session.vehicleId = vehicle.id;
        }
        await this.sessionRepo.save(session);
        await this.logger.log(cardId, 'GATE_IN', { licensePlate, sessionId: session.id });
        return session;
    }
    async previewGateOut(cardId, mockCheckOutTime) {
        const session = await this.sessionRepo.findOne(s => s.cardId === cardId && s.status === 'Active');
        if (!session)
            throw new Error('No active session for this card');
        const checkOutTime = mockCheckOutTime || new Date().toISOString();
        const card = await this.cardRepo.findById(cardId);
        const account = card?.accountId ? await this.accountRepo.findById(card.accountId) : undefined;
        const isMember = card?.type === 'MEMBER';
        const policy = await this.pricingPolicyService.getPolicy();
        const fee = isMember && this.subscriptionService.isMonthActive(account, checkOutTime) ? 0 : this.pricingPolicyService.feeForCard(card, account, policy);
        return { ...session, checkOutTime, fee, status: isMember ? 'Completed' : 'ReadyToPay' };
    }
    async gateOut(cardId, mockCheckOutTime) {
        const session = await this.previewGateOut(cardId, mockCheckOutTime);
        const card = await this.cardRepo.findById(cardId);
        const isMember = card?.type === 'MEMBER';
        const updated = {
            ...session,
            status: isMember ? 'Completed' : 'ReadyToPay'
        };
        await this.sessionRepo.save(updated);
        await this.logger.log(cardId, 'GATE_OUT', { sessionId: session.id, fee: session.fee });
        // If member, create unpaid transaction/invoice line (simulated)
        return updated;
    }
    ensureWithinGateWindow(isoTime) {
        const date = new Date(isoTime);
        const minutes = date.getHours() * 60 + date.getMinutes();
        const [openHour, openMinute] = SubscriptionService_1.GATE_OPEN.split(':').map(Number);
        const [closeHour, closeMinute] = SubscriptionService_1.GATE_CLOSE.split(':').map(Number);
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
exports.ParkingSessionService = ParkingSessionService;

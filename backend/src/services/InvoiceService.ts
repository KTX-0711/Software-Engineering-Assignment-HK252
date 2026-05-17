import { JsonRepository } from '../repositories/JsonRepository';
import { Invoice, ParkingSession, RFIDCard } from '../types/domain';
import { LogService } from './LogService';

export class InvoiceService {
  private invoiceRepo = new JsonRepository<Invoice>('invoices.json');
  private sessionRepo = new JsonRepository<ParkingSession>('parkingSessions.json');
  private cardRepo = new JsonRepository<RFIDCard>('rfidCards.json');
  private logger = new LogService();

  async generateMonthlyInvoice(actorId: string) {
    const sessions = await this.sessionRepo.findAll();
    const invoices = await this.invoiceRepo.findAll();
    const cards = await this.cardRepo.findAll();
    const invoicedSessionIds = new Set(invoices.flatMap(invoice => invoice.sessionIds));
    const eligible = sessions.filter(s => s.status === 'Completed' && s.fee > 0 && !invoicedSessionIds.has(s.id));
    const byCustomer = new Map<string, ParkingSession[]>();

    for (const session of eligible) {
      const card = cards.find(item => item.id === session.cardId);
      if (!card?.accountId) continue;
      byCustomer.set(card.accountId, [...(byCustomer.get(card.accountId) || []), session]);
    }

    const created: Invoice[] = [];
    const now = new Date();
    for (const [customerId, customerSessions] of byCustomer.entries()) {
      const invoice: Invoice = {
        id: `inv_payg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        customerId,
        sessionIds: customerSessions.map(s => s.id),
        totalAmount: customerSessions.reduce((sum, s) => sum + s.fee, 0),
        status: 'Unpaid',
        dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: now.toISOString()
      };

      await this.invoiceRepo.save(invoice);
      created.push(invoice);
    }

    await this.logger.log(actorId, 'PAYG_INVOICES_GENERATED', { invoiceCount: created.length });
    return created;
  }

  async getInvoices() {
    const invoices = await this.invoiceRepo.findAll();
    // Derive reminder field at read time
    return invoices.map(inv => ({
      ...inv,
      reminder: inv.status === 'Unpaid' ? (new Date(inv.dueDate) < new Date() ? 'OVERDUE' : 'DUE_SOON') : null
    }));
  }
}

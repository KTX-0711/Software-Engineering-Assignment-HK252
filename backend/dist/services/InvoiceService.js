"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
class InvoiceService {
    constructor() {
        this.invoiceRepo = new JsonRepository_1.JsonRepository('invoices.json');
        this.sessionRepo = new JsonRepository_1.JsonRepository('parkingSessions.json');
        this.cardRepo = new JsonRepository_1.JsonRepository('rfidCards.json');
        this.logger = new LogService_1.LogService();
    }
    async generateMonthlyInvoice(actorId) {
        const sessions = await this.sessionRepo.findAll();
        const invoices = await this.invoiceRepo.findAll();
        const cards = await this.cardRepo.findAll();
        const invoicedSessionIds = new Set(invoices.flatMap(invoice => invoice.sessionIds));
        const eligible = sessions.filter(s => s.status === 'Completed' && s.fee > 0 && !invoicedSessionIds.has(s.id));
        const byCustomer = new Map();
        for (const session of eligible) {
            const card = cards.find(item => item.id === session.cardId);
            if (!card?.accountId)
                continue;
            byCustomer.set(card.accountId, [...(byCustomer.get(card.accountId) || []), session]);
        }
        const created = [];
        const now = new Date();
        for (const [customerId, customerSessions] of byCustomer.entries()) {
            const invoice = {
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
exports.InvoiceService = InvoiceService;

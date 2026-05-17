"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
const NotificationService_1 = require("./NotificationService");
const SubscriptionService_1 = require("./SubscriptionService");
class PaymentService {
    constructor() {
        this.transactionRepo = new JsonRepository_1.JsonRepository('transactions.json');
        this.sessionRepo = new JsonRepository_1.JsonRepository('parkingSessions.json');
        this.invoiceRepo = new JsonRepository_1.JsonRepository('invoices.json');
        this.accountRepo = new JsonRepository_1.JsonRepository('accounts.json');
        this.logger = new LogService_1.LogService();
        this.notificationService = new NotificationService_1.NotificationService();
    }
    async createTransaction(payload) {
        const transaction = {
            id: `tx_${Date.now()}`,
            amount: payload.amount || 0,
            status: payload.status || 'Unpaid',
            method: payload.method || 'BKPay',
            sessionId: payload.sessionId,
            invoiceId: payload.invoiceId,
            invoiceIds: payload.invoiceIds,
            timestamp: new Date().toISOString()
        };
        await this.transactionRepo.save(transaction);
        return transaction;
    }
    async confirmCashPayment(sessionId, actorId) {
        const session = await this.sessionRepo.findById(sessionId);
        if (!session)
            throw new Error('Session not found');
        if (session.status !== 'ReadyToPay')
            throw new Error('Session is not in ReadyToPay state');
        // Create paid cash transaction
        await this.createTransaction({
            sessionId,
            amount: session.fee,
            status: 'Paid',
            method: 'Cash'
        });
        // Mark session as completed
        await this.sessionRepo.update(sessionId, { status: 'Completed' });
        await this.logger.log(actorId, 'CASH_PAYMENT_CONFIRM', { sessionId, amount: session.fee });
    }
    async payInvoices(invoiceIds, customerId) {
        if (!invoiceIds.length)
            throw new Error('Chua chon khoan thanh toan');
        const invoices = await this.invoiceRepo.findAll();
        const selected = invoiceIds.map(id => {
            const invoice = invoices.find(item => item.id === id);
            if (!invoice)
                throw new Error(`Invoice ${id} not found`);
            return invoice;
        });
        if (selected.some(invoice => invoice.customerId !== customerId)) {
            throw new Error('Khong co quyen thanh toan hoa don nay');
        }
        if (selected.some(invoice => invoice.status !== 'Unpaid')) {
            throw new Error('Chi co the thanh toan khoan chua thanh toan');
        }
        const now = new Date().toISOString();
        const transaction = {
            id: `tx_bkpay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            invoiceIds,
            amount: selected.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
            status: 'Paid',
            method: 'BKPay',
            timestamp: now
        };
        await this.transactionRepo.save(transaction);
        for (const invoice of selected) {
            await this.invoiceRepo.update(invoice.id, { status: 'Paid' });
        }
        const monthlyPlanInvoice = selected.find(invoice => invoice.invoiceType === 'MONTHLY_PLAN');
        if (monthlyPlanInvoice) {
            const activatedAt = new Date(now);
            const expiresAt = new Date(activatedAt.getTime() + SubscriptionService_1.MONTHLY_PLAN_DAYS * 24 * 60 * 60 * 1000);
            await this.accountRepo.update(customerId, {
                parkingPlan: 'MONTH',
                planActivatedAt: activatedAt.toISOString(),
                planExpiresAt: expiresAt.toISOString()
            });
            await this.notificationService.createNotification({
                audience: 'CUSTOMER',
                userId: customerId,
                type: 'SUBSCRIPTION_CREATED',
                title: 'Đăng ký vé tháng thành công',
                message: `Vé tháng của bạn có hiệu lực đến ${expiresAt.toLocaleDateString('vi-VN')}.`,
                level: 'SUCCESS',
                link: '/customer/subscription',
                dedupeKey: `subscription-created-${monthlyPlanInvoice.id}`
            });
        }
        await this.logger.log(customerId, 'BKPAY_INVOICES_PAID', { transactionId: transaction.id, invoiceIds, amount: transaction.amount });
        await this.notificationService.createNotification({
            audience: 'CUSTOMER',
            userId: customerId,
            type: 'PAYMENT_SUCCESS',
            title: 'Thanh toán BKPay thành công',
            message: `Bạn đã thanh toán ${transaction.amount.toLocaleString('vi-VN')} VND cho ${selected.length} khoản qua BKPay.`,
            level: 'SUCCESS',
            link: '/customer/payment',
            dedupeKey: `payment-success-${transaction.id}`
        });
        return { success: true, transaction, paidInvoices: selected.map(invoice => invoice.id) };
    }
    async handleBKPayWebhook(payload) {
        const tx = await this.transactionRepo.findById(payload.transactionId);
        if (!tx)
            throw new Error('Transaction not found');
        await this.transactionRepo.update(payload.transactionId, { status: payload.status });
        // If paid and linked to session, complete the session
        if (payload.status === 'Paid' && tx.sessionId) {
            await this.sessionRepo.update(tx.sessionId, { status: 'Completed' });
        }
        await this.logger.log('BKPay', 'WEBHOOK_RECEIVED', payload);
    }
    async getTransactions() {
        return this.transactionRepo.findAll();
    }
}
exports.PaymentService = PaymentService;

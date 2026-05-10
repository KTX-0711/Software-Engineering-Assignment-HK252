"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = exports.GATE_CLOSE = exports.GATE_OPEN = exports.MONTHLY_PLAN_DAYS = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
const NotificationService_1 = require("./NotificationService");
const PricingPolicyService_1 = require("./PricingPolicyService");
exports.MONTHLY_PLAN_DAYS = 30;
exports.GATE_OPEN = '06:30';
exports.GATE_CLOSE = '18:00';
class SubscriptionService {
    constructor() {
        this.accountRepo = new JsonRepository_1.JsonRepository('accounts.json');
        this.invoiceRepo = new JsonRepository_1.JsonRepository('invoices.json');
        this.logger = new LogService_1.LogService();
        this.notificationService = new NotificationService_1.NotificationService();
        this.pricingPolicyService = new PricingPolicyService_1.PricingPolicyService();
    }
    async getSubscription(userId) {
        const account = await this.accountRepo.findById(userId);
        if (!account)
            throw new Error('Account not found');
        const invoices = await this.invoiceRepo.findAll();
        const unpaidInvoices = invoices.filter(invoice => invoice.customerId === userId && invoice.status === 'Unpaid');
        const policy = await this.pricingPolicyService.getPolicy();
        const freeAccount = this.pricingPolicyService.isFreeAccount(account);
        return {
            planType: this.getPlanType(account),
            accountCategory: account.accountCategory || 'STUDENT',
            planActivatedAt: account.planActivatedAt,
            planExpiresAt: account.planExpiresAt,
            perVisitFee: freeAccount ? 0 : policy.studentPerVisitFee,
            guestPerVisitFee: policy.guestPerVisitFee,
            monthlyFee: policy.monthlyFee || this.pricingPolicyService.calculateMonthlyFee(policy),
            monthlyDays: exports.MONTHLY_PLAN_DAYS,
            monthlyDiscountRate: policy.monthlyDiscountRate,
            monthlyAvailable: !freeAccount,
            gateOpen: exports.GATE_OPEN,
            gateClose: exports.GATE_CLOSE,
            unpaidAmount: unpaidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
        };
    }
    async updateSubscription(userId, planType) {
        if (!['PAYG', 'MONTH'].includes(planType))
            throw new Error('Invalid parking plan');
        const account = await this.accountRepo.findById(userId);
        if (!account)
            throw new Error('Account not found');
        const now = new Date();
        const activeMonth = account.parkingPlan === 'MONTH' && account.planExpiresAt && new Date(account.planExpiresAt) > now;
        if (activeMonth)
            throw new Error('Ban dang su dung goi thang roi');
        if (planType === 'MONTH') {
            if (this.pricingPolicyService.isFreeAccount(account))
                throw new Error('Tai khoan nay duoc mien phi gui xe, khong can dang ky ve thang');
            const policy = await this.pricingPolicyService.getPolicy();
            const monthlyFee = policy.monthlyFee || this.pricingPolicyService.calculateMonthlyFee(policy);
            const existingInvoices = await this.invoiceRepo.findAll();
            const pendingMonthlyInvoice = existingInvoices.find(invoice => invoice.customerId === userId && invoice.status === 'Unpaid' && invoice.invoiceType === 'MONTHLY_PLAN');
            if (pendingMonthlyInvoice)
                throw new Error('Ban da co hoa don ve thang dang cho thanh toan');
            const invoice = {
                id: `inv_month_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                customerId: userId,
                sessionIds: [],
                invoiceType: 'MONTHLY_PLAN',
                totalAmount: monthlyFee,
                status: 'Unpaid',
                dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: now.toISOString()
            };
            await this.invoiceRepo.save(invoice);
            await this.logger.log(userId, 'MONTHLY_PLAN_INVOICE_CREATED', { invoiceId: invoice.id, amount: monthlyFee });
            return this.getSubscription(userId);
        }
        await this.logger.log(userId, 'SUBSCRIPTION_UPDATED', { planType });
        return this.getSubscription(userId);
    }
    getPlanType(account) {
        return account?.parkingPlan || 'PAYG';
    }
    isMonthActive(account, at) {
        if (!account || this.getPlanType(account) !== 'MONTH' || !account.planExpiresAt)
            return false;
        const time = new Date(at).getTime();
        const activatedAt = account.planActivatedAt ? new Date(account.planActivatedAt).getTime() : 0;
        return time >= activatedAt && time <= new Date(account.planExpiresAt).getTime();
    }
}
exports.SubscriptionService = SubscriptionService;

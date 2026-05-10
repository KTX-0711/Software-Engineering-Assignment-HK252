import { JsonRepository } from '../repositories/JsonRepository';
import { Account, Invoice, ParkingPlanType } from '../types/domain';
import { LogService } from './LogService';
import { NotificationService } from './NotificationService';
import { PricingPolicyService } from './PricingPolicyService';

export const MONTHLY_PLAN_DAYS = 30;
export const GATE_OPEN = '06:30';
export const GATE_CLOSE = '18:00';

export class SubscriptionService {
  private accountRepo = new JsonRepository<Account>('accounts.json');
  private invoiceRepo = new JsonRepository<Invoice>('invoices.json');
  private logger = new LogService();
  private notificationService = new NotificationService();
  private pricingPolicyService = new PricingPolicyService();

  async getSubscription(userId: string) {
    const account = await this.accountRepo.findById(userId);
    if (!account) throw new Error('Account not found');

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
      monthlyDays: MONTHLY_PLAN_DAYS,
      monthlyDiscountRate: policy.monthlyDiscountRate,
      monthlyAvailable: !freeAccount,
      gateOpen: GATE_OPEN,
      gateClose: GATE_CLOSE,
      unpaidAmount: unpaidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
    };
  }

  async updateSubscription(userId: string, planType: ParkingPlanType) {
    if (!['PAYG', 'MONTH'].includes(planType)) throw new Error('Invalid parking plan');

    const account = await this.accountRepo.findById(userId);
    if (!account) throw new Error('Account not found');

    const now = new Date();
    const activeMonth = account.parkingPlan === 'MONTH' && account.planExpiresAt && new Date(account.planExpiresAt) > now;
    if (activeMonth) throw new Error('Ban dang su dung goi thang roi');

    if (planType === 'MONTH') {
      if (this.pricingPolicyService.isFreeAccount(account)) throw new Error('Tai khoan nay duoc mien phi gui xe, khong can dang ky ve thang');
      const policy = await this.pricingPolicyService.getPolicy();
      const monthlyFee = policy.monthlyFee || this.pricingPolicyService.calculateMonthlyFee(policy);
      const existingInvoices = await this.invoiceRepo.findAll();
      const pendingMonthlyInvoice = existingInvoices.find(invoice => invoice.customerId === userId && invoice.status === 'Unpaid' && invoice.invoiceType === 'MONTHLY_PLAN');
      if (pendingMonthlyInvoice) throw new Error('Ban da co hoa don ve thang dang cho thanh toan');

      const invoice: Invoice = {
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

  getPlanType(account?: Account): ParkingPlanType {
    return account?.parkingPlan || 'PAYG';
  }

  isMonthActive(account: Account | undefined, at: string) {
    if (!account || this.getPlanType(account) !== 'MONTH' || !account.planExpiresAt) return false;
    const time = new Date(at).getTime();
    const activatedAt = account.planActivatedAt ? new Date(account.planActivatedAt).getTime() : 0;
    return time >= activatedAt && time <= new Date(account.planExpiresAt).getTime();
  }
}

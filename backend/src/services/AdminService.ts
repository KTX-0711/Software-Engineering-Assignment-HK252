import { JsonRepository } from '../repositories/JsonRepository';
import { Account, ParkingSession, Transaction, Invoice, PricingPolicy, UserRole } from '../types/domain';
import { LogService } from './LogService';
import { PricingPolicyService } from './PricingPolicyService';

export class AdminService {
  private sessionRepo = new JsonRepository<ParkingSession>('parkingSessions.json');
  private txRepo = new JsonRepository<Transaction>('transactions.json');
  private invoiceRepo = new JsonRepository<Invoice>('invoices.json');
  private pricingPolicyService = new PricingPolicyService();
  private accountRepo = new JsonRepository<Account>('accounts.json');
  private logger = new LogService();

  async getSummary() {
    const sessions = await this.sessionRepo.findAll();
    const txs = await this.txRepo.findAll();
    const invoices = await this.invoiceRepo.findAll();

    return {
      activeSessions: sessions.filter(s => s.status === 'Active').length,
      pendingPayments: txs.filter(t => t.status === 'Unpaid').length,
      unpaidInvoices: invoices.filter(i => i.status === 'Unpaid').length
    };
  }

  async getPricingPolicy() {
    return this.pricingPolicyService.getPolicy();
  }

  async updatePricingPolicy(policy: Partial<PricingPolicy>, actorId: string) {
    const updated = await this.pricingPolicyService.updatePolicy(policy);
    await this.logger.log(actorId, 'PRICING_POLICY_UPDATED', updated);
    return updated;
  }

  async getInternalAccounts() {
    const accounts = await this.accountRepo.findAll();
    return accounts.filter(account => account.role === 'ADMIN' || account.role === 'EMPLOYEE');
  }

  async createInternalAccount(data: Partial<Account>, actorId: string) {
    const role = this.validateInternalRole(data.role);
    const displayName = this.requireText(data.displayName, 'displayName');
    const username = this.requireText(data.username, 'username');
    const password = this.requireText(data.password, 'password');
    await this.ensureUniqueUsername(username);

    const account: Account = {
      id: `acc_${Date.now()}`,
      username,
      password,
      role,
      displayName
    };

    await this.accountRepo.save(account);
    await this.logger.log(actorId, 'INTERNAL_ACCOUNT_CREATED', { accountId: account.id, role: account.role, username: account.username });
    return account;
  }

  async updateInternalAccount(id: string, data: Partial<Account>, actorId: string) {
    const account = await this.accountRepo.findById(id);
    if (!account || (account.role !== 'ADMIN' && account.role !== 'EMPLOYEE')) throw new Error('Internal account not found');

    const updates: Partial<Account> = {};
    if (data.displayName !== undefined) updates.displayName = this.requireText(data.displayName, 'displayName');
    if (data.username !== undefined) {
      const username = this.requireText(data.username, 'username');
      await this.ensureUniqueUsername(username, id);
      updates.username = username;
    }
    if (data.password !== undefined) updates.password = this.requireText(data.password, 'password');
    if (data.role !== undefined) updates.role = this.validateInternalRole(data.role);

    const updated = await this.accountRepo.update(id, updates);
    await this.logger.log(actorId, 'INTERNAL_ACCOUNT_UPDATED', { accountId: id, updates: Object.keys(updates) });
    return updated;
  }

  async deleteInternalAccount(id: string, actorId: string) {
    if (id === actorId) throw new Error('Cannot delete current account');
    const account = await this.accountRepo.findById(id);
    if (!account || (account.role !== 'ADMIN' && account.role !== 'EMPLOYEE')) throw new Error('Internal account not found');
    await this.accountRepo.delete(id);
    await this.logger.log(actorId, 'INTERNAL_ACCOUNT_DELETED', { accountId: id, username: account.username });
    return { success: true };
  }

  private validateInternalRole(role: unknown): UserRole {
    if (role === 'ADMIN' || role === 'EMPLOYEE') return role;
    throw new Error('Role must be ADMIN or EMPLOYEE');
  }

  private requireText(value: unknown, field: string) {
    if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} is required`);
    return value.trim();
  }

  private async ensureUniqueUsername(username: string, currentId?: string) {
    const existing = await this.accountRepo.findOne(account => account.username === username && account.id !== currentId);
    if (existing) throw new Error('Username already exists');
  }
}

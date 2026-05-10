"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const LogService_1 = require("./LogService");
const PricingPolicyService_1 = require("./PricingPolicyService");
class AdminService {
    constructor() {
        this.sessionRepo = new JsonRepository_1.JsonRepository('parkingSessions.json');
        this.txRepo = new JsonRepository_1.JsonRepository('transactions.json');
        this.invoiceRepo = new JsonRepository_1.JsonRepository('invoices.json');
        this.pricingPolicyService = new PricingPolicyService_1.PricingPolicyService();
        this.accountRepo = new JsonRepository_1.JsonRepository('accounts.json');
        this.logger = new LogService_1.LogService();
    }
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
    async updatePricingPolicy(policy, actorId) {
        const updated = await this.pricingPolicyService.updatePolicy(policy);
        await this.logger.log(actorId, 'PRICING_POLICY_UPDATED', updated);
        return updated;
    }
    async getInternalAccounts() {
        const accounts = await this.accountRepo.findAll();
        return accounts.filter(account => account.role === 'ADMIN' || account.role === 'EMPLOYEE');
    }
    async createInternalAccount(data, actorId) {
        const role = this.validateInternalRole(data.role);
        const displayName = this.requireText(data.displayName, 'displayName');
        const username = this.requireText(data.username, 'username');
        const password = this.requireText(data.password, 'password');
        await this.ensureUniqueUsername(username);
        const account = {
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
    async updateInternalAccount(id, data, actorId) {
        const account = await this.accountRepo.findById(id);
        if (!account || (account.role !== 'ADMIN' && account.role !== 'EMPLOYEE'))
            throw new Error('Internal account not found');
        const updates = {};
        if (data.displayName !== undefined)
            updates.displayName = this.requireText(data.displayName, 'displayName');
        if (data.username !== undefined) {
            const username = this.requireText(data.username, 'username');
            await this.ensureUniqueUsername(username, id);
            updates.username = username;
        }
        if (data.password !== undefined)
            updates.password = this.requireText(data.password, 'password');
        if (data.role !== undefined)
            updates.role = this.validateInternalRole(data.role);
        const updated = await this.accountRepo.update(id, updates);
        await this.logger.log(actorId, 'INTERNAL_ACCOUNT_UPDATED', { accountId: id, updates: Object.keys(updates) });
        return updated;
    }
    async deleteInternalAccount(id, actorId) {
        if (id === actorId)
            throw new Error('Cannot delete current account');
        const account = await this.accountRepo.findById(id);
        if (!account || (account.role !== 'ADMIN' && account.role !== 'EMPLOYEE'))
            throw new Error('Internal account not found');
        await this.accountRepo.delete(id);
        await this.logger.log(actorId, 'INTERNAL_ACCOUNT_DELETED', { accountId: id, username: account.username });
        return { success: true };
    }
    validateInternalRole(role) {
        if (role === 'ADMIN' || role === 'EMPLOYEE')
            return role;
        throw new Error('Role must be ADMIN or EMPLOYEE');
    }
    requireText(value, field) {
        if (typeof value !== 'string' || !value.trim())
            throw new Error(`${field} is required`);
        return value.trim();
    }
    async ensureUniqueUsername(username, currentId) {
        const existing = await this.accountRepo.findOne(account => account.username === username && account.id !== currentId);
        if (existing)
            throw new Error('Username already exists');
    }
}
exports.AdminService = AdminService;

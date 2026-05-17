"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
const MockSSOConnector_1 = require("../connectors/MockSSOConnector");
class AuthService {
    constructor() {
        this.repo = new JsonRepository_1.JsonRepository('accounts.json');
        this.sso = new MockSSOConnector_1.MockSSOConnector();
    }
    async login(username, password) {
        // 1. SSO authentication
        await this.sso.login(username, password);
        // 2. Local account lookup
        const account = await this.repo.findOne(a => a.username === username);
        if (!account)
            throw new Error('Account not found in local system');
        // 3. For MVP, we return account directly as "session"
        return account;
    }
    async resetCustomerPassword(username, password) {
        const account = await this.repo.findOne(a => a.username === username);
        if (!account || account.role !== 'CUSTOMER')
            throw new Error('Khong tim thay tai khoan HCMUT');
        return this.repo.update(account.id, { password });
    }
    async getAccountById(id) {
        return this.repo.findById(id);
    }
}
exports.AuthService = AuthService;

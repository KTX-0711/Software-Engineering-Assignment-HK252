import { JsonRepository } from '../repositories/JsonRepository';
import { Account } from '../types/domain';
import { MockSSOConnector } from '../connectors/MockSSOConnector';

export class AuthService {
  private repo = new JsonRepository<Account>('accounts.json');
  private sso = new MockSSOConnector();

  async login(username: string, password: string) {
    // 1. SSO authentication
    await this.sso.login(username, password);

    // 2. Local account lookup
    const account = await this.repo.findOne(a => a.username === username);
    if (!account) throw new Error('Account not found in local system');

    // 3. For MVP, we return account directly as "session"
    return account;
  }

  async resetCustomerPassword(username: string, password: string) {
    const account = await this.repo.findOne(a => a.username === username);
    if (!account || account.role !== 'CUSTOMER') throw new Error('Khong tim thay tai khoan HCMUT');
    return this.repo.update(account.id, { password });
  }

  async getAccountById(id: string) {
    return this.repo.findById(id);
  }
}

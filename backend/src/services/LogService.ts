import { JsonRepository } from '../repositories/JsonRepository';
import { AuditLog } from '../types/domain';

export class LogService {
  private repo = new JsonRepository<AuditLog>('logs.json');

  async log(actor: string, action: string, payload?: any) {
    const entry: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      payload
    };
    await this.repo.save(entry);
    console.log(`[AUDIT] ${actor}: ${action}`);
  }

  async getLogs() {
    return this.repo.findAll();
  }
}

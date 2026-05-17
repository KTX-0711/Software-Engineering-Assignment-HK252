"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const JsonRepository_1 = require("../repositories/JsonRepository");
class LogService {
    constructor() {
        this.repo = new JsonRepository_1.JsonRepository('logs.json');
    }
    async log(actor, action, payload) {
        const entry = {
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
exports.LogService = LogService;

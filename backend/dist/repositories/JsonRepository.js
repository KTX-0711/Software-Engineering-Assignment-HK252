"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class JsonRepository {
    constructor(fileName) {
        this.filePath = path_1.default.join(__dirname, '../data', fileName);
    }
    async findAll() {
        try {
            const data = await promises_1.default.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }
    async findById(id) {
        const all = await this.findAll();
        return all.find(item => item.id === id);
    }
    async findOne(predicate) {
        const all = await this.findAll();
        return all.find(predicate);
    }
    async save(item) {
        const all = await this.findAll();
        const index = all.findIndex(i => i.id === item.id);
        if (index !== -1) {
            all[index] = item;
        }
        else {
            all.push(item);
        }
        await promises_1.default.writeFile(this.filePath, JSON.stringify(all, null, 2));
    }
    async update(id, updates) {
        const all = await this.findAll();
        const index = all.findIndex(item => item.id === id);
        if (index === -1)
            throw new Error(`Item with id ${id} not found`);
        all[index] = { ...all[index], ...updates };
        await promises_1.default.writeFile(this.filePath, JSON.stringify(all, null, 2));
        return all[index];
    }
    async saveAll(items) {
        await promises_1.default.writeFile(this.filePath, JSON.stringify(items, null, 2));
    }
    async delete(id) {
        const all = await this.findAll();
        const next = all.filter(item => item.id !== id);
        if (next.length === all.length)
            throw new Error(`Item with id ${id} not found`);
        await promises_1.default.writeFile(this.filePath, JSON.stringify(next, null, 2));
    }
}
exports.JsonRepository = JsonRepository;

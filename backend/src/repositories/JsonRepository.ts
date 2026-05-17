import fs from 'fs/promises';
import path from 'path';

export class JsonRepository<T extends { id: string }> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(__dirname, '../data', fileName);
  }

  async findAll(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async findById(id: string): Promise<T | undefined> {
    const all = await this.findAll();
    return all.find(item => item.id === id);
  }

  async findOne(predicate: (item: T) => boolean): Promise<T | undefined> {
    const all = await this.findAll();
    return all.find(predicate);
  }

  async save(item: T): Promise<void> {
    const all = await this.findAll();
    const index = all.findIndex(i => i.id === item.id);
    if (index !== -1) {
      all[index] = item;
    } else {
      all.push(item);
    }
    await fs.writeFile(this.filePath, JSON.stringify(all, null, 2));
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const all = await this.findAll();
    const index = all.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Item with id ${id} not found`);

    all[index] = { ...all[index], ...updates };
    await fs.writeFile(this.filePath, JSON.stringify(all, null, 2));
    return all[index];
  }

  async saveAll(items: T[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
  }

  async delete(id: string): Promise<void> {
    const all = await this.findAll();
    const next = all.filter(item => item.id !== id);
    if (next.length === all.length) throw new Error(`Item with id ${id} not found`);
    await fs.writeFile(this.filePath, JSON.stringify(next, null, 2));
  }
}

class Cache {
  async get<T extends any>(key: string): Promise<T> {
    const result = await localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  async set<T extends any>(key: string, value: T): Promise<void> {
    await localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await localStorage.removeItem(key);
  }
}

export default new Cache();

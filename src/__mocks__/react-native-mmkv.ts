export class MMKV {
  private storage: Record<string, string> = {};

  set(key: string, value: string) {
    this.storage[key] = value;
  }

  getString(key: string) {
    return this.storage[key] ?? null;
  }

  delete(key: string) {
    delete this.storage[key];
  }

  clearAll() {
    this.storage = {};
  }
}
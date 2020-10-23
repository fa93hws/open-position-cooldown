export class LocalStorageService {
  constructor(private readonly localStorage = window.localStorage) {}

  async addToArray<T>(key: string, obj: T) {
    const values = this.localStorage.getItem(key);
    if (values == null) {
      this.localStorage.setItem(key, JSON.stringify([obj]));
      return;
    }
    const existingArray: T[] = JSON.parse(values);
    existingArray.push(obj);
    this.localStorage.setItem(key, JSON.stringify(existingArray));
  }

  async getItems<T>(key: string): Promise<T | null> {
    const item = this.localStorage.getItem(key);
    if (item == null) {
      return item;
    }
    return JSON.parse(item);
  }
}

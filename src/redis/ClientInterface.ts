export interface ClientInterface {
  connect(): void;
  setStr(val: string, key: string): void;
  getStr(key: string): string;
}

export interface ClientInterface {
  connect(): Promise<void>;
  quit(): Promise<void>;
  setStr(val: string, key: string): Promise<void>;
  getStr(key: string): Promise<string>;
}

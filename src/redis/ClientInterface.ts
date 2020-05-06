import { ConParamInterface } from "./ConParamInterface";

interface ClientInterface {
  connect(parameters: ConParamInterface): void;
  setStr(val: string, key: string): void;
  getStr(key: string): string;
}

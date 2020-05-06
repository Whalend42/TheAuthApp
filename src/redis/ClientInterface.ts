import { ConParamInterface } from "./ConParamInterface";

interface ClientInterface {
  connect(parameters: ConParamInterface): void;
  set(val: string, key: string): void;
  get(key: string): string;
}

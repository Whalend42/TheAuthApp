import { ClientInterface } from "ClientInterface.ts";
import { ConParamInterface } from "ConParamInterface.ts";

export class Client implements ClientInterface {
  
  const conParameter: ConParamInterface;

  constructor(conParameter: ConParamInterface) {
    this.conParameter = conParameter;
  }

  connect(parameters: ConParamInterface): void {
    console.log("connection");
  }

  setStr(val: string, key: string): void {
    console.log("set");
  }

  getStr(key: string): string {
    console.log("get");
    return "dummy";
  }

}

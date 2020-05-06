import { ConParamInterface } from "./ConParamInterface.ts";

export class ConParam implements ConParamInterface {
  private host: string;
  private port: string;

  constructor(host: string, port: string) {
    this.host = host;
    this.port = port;
  }

  host(): string {
    return this.host;
  }

  port(): string {
    return this.port;
  }

}

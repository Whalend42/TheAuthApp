import { ClientInterface } from "./ClientInterface";
import { ConParamInterface } from "./ConParamInterface";
import redis from "redis";

export class Client implements ClientInterface {
  
  private conParameter: ConParamInterface;
  private _client: any;

  constructor(conParameter: ConParamInterface) {
    this.conParameter = conParameter;
    this._client = null;
  }

  connect(): void {
    console.log("connection");
    if (this._client === null) {
      const options = {
        retry_strategy: function(options) {
          const timeoutInMs = 1000 * 60 * 5;
          if (options.total_retry_time > timeoutInMs) {
            return new Error("Retry time exhausted");
          }
          // if (options.attempt > 10) {
          // if (options.times_connected < 1 && options.attempt > 5) {
          // if (options.error && options.error.code === "ECONNREFUSED") {
          return Math.min(options.attempt * 100, 3000);
        },
      };
      this._client = redis.createClient(this.conParameter.port.value, this.conParameter.host.value, options);
    }
  }

  setStr(val: string, key: string): void {
    console.log("set");
  }

  getStr(key: string): string {
    console.log("get");
    return "dummy";
  }

}

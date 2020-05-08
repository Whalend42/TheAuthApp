import { ClientInterface } from "./ClientInterface";
import { ConParamInterface, ConfigTypes } from "./ConParamInterface";
import { TimeoutConStrat } from "./ConStrategies"
import redis from "redis";

export class Client implements ClientInterface {
  
  private conParameter: ConParamInterface;
  private _client: any;

  constructor(conParameter: ConParamInterface) {
    this.conParameter = conParameter;
    this._client = null;
  }

  connect(): Promise<void> {
    if (this._client === null) {
      const strat = new TimeoutConStrat(2);
      const options = {
        retry_strategy: strat.strategy()
      };
      
      if (this.conParameter.configType === ConfigTypes.ip_and_port) {
        this._client = redis.createClient(this.conParameter.port.value, this.conParameter.host.value, options);
      } else if (this.conParameter.configType === ConfigTypes.url) {
        this._client = redis.createClient(this.conParameter.url, options);
      } else {
        throw new Error("No valid connection parameter given");
      }

      return new Promise<void>((resolve, reject) => {
        this._client.on("ready", () => {
          resolve();
        });
        this._client.on("error", (error) => {
          reject(new Error(error));
        });
      });
    }
    return new Promise<void>(resolve => {
      resolve();
    });
  }

  quit(): Promise<void> {
    if (this._client !== null) {
      return new Promise<void>(resolve => {
        this._client.quit(() => {
          resolve();
        });
      });
    }
    return new Promise<void>(resolve => {
      resolve();
    });
  }

  async setStr(key: string, val: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._client.set(
        key,
        val,
        (err) => {
          if (err) {
            reject(new Error('failed to fetch key: '+key));
          } else {
            resolve();
          }
        });
    });
  }

  async getStr(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this._client.get(
        key,
        (err, reply) => {
          if (err) {
            reject(new Error('failed to fetch key: '+key));
          } else {
            resolve(reply);
          }
        });
    });
  }

}

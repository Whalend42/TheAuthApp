import { ConParamInterface, ConfigTypes } from "./ConParamInterface";
import { IpAddr } from "common/valueobjects/IpAddr";
import { Port } from "common/valueobjects/Port";

export class ConParam implements ConParamInterface {

  private static NullParam = class extends ConParam {
      constructor() {
          super();
      }
  }

  static readonly Null: ConParamInterface = new ConParam.NullParam();

  readonly host: IpAddr;
  readonly port: Port;
  readonly url: string;

  readonly configType: ConfigTypes;

  constructor(host: IpAddr, port: Port);
  constructor(url: string);
  constructor();
  constructor(...args: any) {
    if (args[0] instanceof IpAddr && args[1] instanceof Port) {
      this.host = args[0];
      this.port = args[1];
      this.url = "";
      this.configType = ConfigTypes.ip_and_port;
    } else if (typeof args[0] === "string") {
      this.host = IpAddr.Null;
      this.port = Port.Null;
      this.url = args[0];
      this.configType = ConfigTypes.url;
    } else {
      this.host = IpAddr.Null;
      this.port = Port.Null;
      this.url = "";
      this.configType = ConfigTypes.empty;
    }
  }

}

import { ConParamInterface } from "./ConParamInterface";
import { IpAddr } from "@app/common/valueobjects/IpAddr"
import { Port } from "@app/common/valueobjects/Port"

export class ConParam implements ConParamInterface {

  constructor(readonly host: IpAddr, readonly port: Port) {
  }

}

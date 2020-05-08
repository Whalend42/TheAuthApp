import { IpAddr } from "@app/common/valueobjects/IpAddr"
import { Port } from "@app/common/valueobjects/Port"

export interface ConParamInterface {
  readonly host: IpAddr;
  readonly port: Port;
  readonly url: string;
  readonly configType: ConfigTypes;
}

export enum ConfigTypes {
  ip_and_port,
  url,
  empty,
} 

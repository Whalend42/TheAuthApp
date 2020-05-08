import { IpAddr } from "common/valueobjects/IpAddr";
import { Port } from "common/valueobjects/Port";

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

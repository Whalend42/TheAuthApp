import { StringVo } from "./StringVo";

export class IpAddr implements StringVo {

    private static NullIpAddr = class extends IpAddr {
        constructor() {
            super("0.0.0.0");
        }
    }

    static readonly Null: StringVo = new IpAddr.NullIpAddr();

    value: string;
    constructor(value: string) {
        const regex = new RegExp(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
        if (!regex.test(value)) {
            throw new TypeError("Invalid IP address value of: "+value);
        }
        this.value = value;
    }
}

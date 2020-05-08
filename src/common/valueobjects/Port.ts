import { NumberVo } from "./NumberVo";

export class Port implements NumberVo {

    private static NullPort = class extends Port {
        constructor() {
            super(10);
        }
    }

    static readonly Null: NumberVo = new Port.NullPort();
    
    value: number;
    constructor(value: number) {
        if (value > 999999 || value < 10) {
            throw new TypeError("Invalid (too big or too small) port value of: "+value);
        }
        this.value = value;
    }
}

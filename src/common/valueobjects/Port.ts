import { NumberVo } from "./NumberVo";

export class Port implements NumberVo {
    value: number;
    constructor(value: number) {
        if (value > 999999 || value < 10) {
            throw new TypeError("Invalid (too big or too small) port value of: "+value);
        }
        this.value = value;
    }
}

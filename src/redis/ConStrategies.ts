import { ConStrategyInterface, StrategyOptionInterface } from "./ConStrategyInterface";

export class TimeoutConStrat implements ConStrategyInterface {

    //readonly timeout: number;
    readonly delay: number;

    static readonly defaultDelay = 1;

    constructor(readonly timeout: number, delay?: number) {
        this.delay = delay ?? TimeoutConStrat.defaultDelay;
    }

    strategy(): (options: StrategyOptionInterface) => number | Error {
        const timeoutInMs = this.timeout*1000;
        const delayInMs = this.delay*1000;

        return (options: StrategyOptionInterface) => {
            if (options.total_retry_time > timeoutInMs) {
                return new Error("Retry time ("+timeoutInMs+" [ms]) exhausted");
            }
            // if (options.attempt > 10) {
            // if (options.times_connected < 1 && options.attempt > 5) {
            // if (options.error && options.error.code === "ECONNREFUSED") {
            return delayInMs;
        }
    }

}

export class AttemptsConStrat implements ConStrategyInterface {
    readonly delay: number;

    static readonly defaultDelay = 1;

    constructor(readonly attempts: number, delay?: number) {
        this.delay = delay ?? TimeoutConStrat.defaultDelay;
    }

    strategy(): (options: StrategyOptionInterface) => number {
        const delayInMs = this.delay*1000;

        return (options: StrategyOptionInterface) => {
            if (options.attempt > this.attempts) {
                throw new Error("Retry attempts ("+this.attempts+") exhausted");
            }
            // if (options.attempt > 10) {
            // if (options.times_connected < 1 && options.attempt > 5) {
            // if (options.error && options.error.code === "ECONNREFUSED") {
            return delayInMs;
        }
    }

}
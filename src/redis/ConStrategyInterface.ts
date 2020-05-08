export interface ConStrategyInterface {
    strategy(): (options: StrategyOptionInterface) => number | Error;
}

export interface StrategyOptionInterface {
    total_retry_time: number;
    attempt: number;
    times_connected: number;
    error?: any;
}
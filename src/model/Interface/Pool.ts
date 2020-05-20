export interface Pool<T> {
    many(): Array<T>;
    one(id: string): T
    add(object: T): void;
    delete(arg: T|string): T;
}
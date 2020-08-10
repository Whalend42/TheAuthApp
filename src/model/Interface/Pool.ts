export interface Pool<T> {
    many(): Promise<Array<T>>;
    one(id: string): Promise<T>
    //add(object: T): Promise<T>;
    delete(arg: T|string): Promise<T>;
}
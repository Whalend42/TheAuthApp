import { User } from "./User";
import { Pool } from "./Pool";

export interface Users {
    many(): Promise<Array<User>>;
    one(user: string): Promise<User>
    add(user: User): void;
    delete(user: User|string): User;
}

export interface Users2 extends Pool<User> {
}
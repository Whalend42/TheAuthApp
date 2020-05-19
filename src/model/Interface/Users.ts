import { User } from "./User";
import { Pool } from "./Pool";

export interface Users {
    many(): Promise<Array<User>>;
    one(user: string): Promise<User>
    add(email: string, name: string, secret: string): Promise<User>;
    delete(user: User|string): Promise<User>;
}

export interface Users2 extends Pool<User> {
}
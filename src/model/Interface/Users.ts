import { User } from "./User";
import { Pool } from "./Pool";

export interface Users1 {
    many(): Promise<Array<User>>;
    one(user: string): Promise<User>
    add(email: string, name: string, secret: string): Promise<User>;
    delete(user: User|string): Promise<User>;
}

export interface Users extends Pool<User> {
    add(email: string, name: string, secret: string): Promise<User>;
    findFromEmail(email: string) : Promise<User>;
}
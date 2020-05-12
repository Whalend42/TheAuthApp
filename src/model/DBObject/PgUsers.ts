import { User } from "./../Interface/User";
import { Users } from "./../Interface/Users";
import { PgUser } from "./PgUser";
import { BufferedUser } from "./../BufferedObject/BufferedUser";
import { NullUser } from "./../NullObject/NullUser";

export class PgUsers implements Users {

    private _db: any;

    constructor(db) {
        this._db = db;
    }

    async many(): Promise<User[]> {
        try {
            const all = await this._db.any('SELECT id, email, name, secret FROM test_user');

            const result: Array<User> = [];
            for (const one of all) {
                const pgUser = new PgUser(this._db, one.id.toString());
                result.push(new BufferedUser(pgUser, one.email, one.name, one.secret));
            }
            return result;
          } catch (error) {
            throw new Error("?");
          }
    }

    async one(user: string): Promise<User> {
        try {
            let result = new NullUser();
            const one = await this._db.oneOrNone('SELECT * FROM test_user WHERE id = $1', user);
            if (one !== null) {
                const pgUser = new PgUser(this._db, one.id.toString());
                result = new BufferedUser(pgUser, one.email, one.name, one.secret);
                console.log(await result.email());
                console.log(await result.id());
            }
            return result;
        } catch (error) {
            throw new Error("?");
        }
    }

    add(user: User): void {
        throw new Error("Method not implemented.");
    }

    delete(user: string | User): User {
        throw new Error("Method not implemented.");
    }
}
  
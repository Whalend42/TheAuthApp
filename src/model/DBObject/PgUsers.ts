import { User } from "./../Interface/User";
import { Users } from "./../Interface/Users";
import { PgUser } from "./PgUser";
import { BufferedUser } from "./../BufferedObject/BufferedUser";
import { NullUser } from "./../NullObject/NullUser";
import { strict as assert } from 'assert';

export class PgUsers implements Users {

    private _db: any;
    private _table = "test_user";

    constructor(db) {
        this._db = db;
    }

    async findFromEmail(email: string): Promise<User> {
        let result = new NullUser();
        const one = await this._db.oneOrNone(`SELECT * FROM ${this._table} WHERE email = $1`, email);
        if (one !== null) {
            const pgUser = new PgUser(this._db, one.id.toString());
            result = new BufferedUser(pgUser, one.email, one.name, one.secret);
        }
        return result;
    }

    async many(): Promise<User[]> {
        const all = await this._db.any(`SELECT id, email, name, secret FROM ${this._table}`);

        const result: Array<User> = [];
        for (const one of all) {
            const pgUser = new PgUser(this._db, one.id.toString());
            result.push(new BufferedUser(pgUser, one.email, one.name, one.secret));
        }
        return result;
    }

    async one(user: string): Promise<User> {
        let result = new NullUser();
        const one = await this._db.oneOrNone(`SELECT * FROM ${this._table} WHERE id = $1`, user);
        if (one !== null) {
            const pgUser = new PgUser(this._db, one.id.toString());
            result = new BufferedUser(pgUser, one.email, one.name, one.secret);
        }
        return result;
    }

    async add(email: string, name: string, secret: string): Promise<User> {
        let result = new NullUser();
        const res = await this._db.result(`INSERT INTO ${this._table}(name, email, secret) VALUES($1, $2, $3) RETURNING id`, [name, email, secret]);
        assert(typeof res?.rows[0]?.id !== "undefined", "for some reason insertion failed");
        const pgUser = new PgUser(this._db, res.rows[0].id);
        result = new BufferedUser(pgUser, email, name, secret);
        return result;
    }

    async delete(arg: string | User): Promise<User> {
        let id: string;
        if (isUser(arg)) {
            id = await arg.id();
        } else {
            id = arg;
        }
        const user = await this.one(id);
        assert(!user.isNull(), `Invalid user recieved: ${arg}`);
        const res = await this._db.result(`DELETE FROM ${this._table} WHERE id = $1`, id);
        assert(res.rowCount === 1, `Something went wrong and ${res.rowCount} elements were deleted`);
        return user;
    }
}

function isUser(user: User | string): user is User {
    return (user as User).id !== undefined;
}

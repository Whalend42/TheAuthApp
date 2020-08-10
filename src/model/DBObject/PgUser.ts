import { User } from "./../Interface/User";

export class PgUser implements User {

    private _db: any;
    private _id: string;
    private _table = "test_user";

    constructor(db, id: string) {
        this._db = db;
        this._id = id;
    }

    id(): Promise<string> {
        return new Promise<string>((resolve) => resolve(this._id));
    }

    async email(): Promise<string> {
        let result = "";
        const one = await this._db.oneOrNone(`SELECT email FROM ${this._table} WHERE id = $1`, this._id);
        if (one !== null) {
            result = one.email;
        } else {
            throw new Error(`For some reason it was not possible to retrieve email from user: ${this._id}`);
        }
        return result;
    }

    async name(): Promise<string> {
        let result = "";
        const one = await this._db.oneOrNone(`SELECT name FROM ${this._table} WHERE id = $1`, this._id);
        if (one !== null) {
            result = one.name;
        } else {
            throw new Error(`For some reason it was not possible to retrieve name from user: ${this._id}`);
        }
        return result;
    }

    async secret(): Promise<string> {
        let result = "";
        const one = await this._db.oneOrNone(`SELECT secret FROM ${this._table} WHERE id = $1`, this._id);
        if (one !== null) {
            result = one.secret;
        } else {
            throw new Error(`For some reason it was not possible to retrieve secret from user: ${this._id}`);
        }
        return result;
    }

    async changeName(name: string): Promise<User> {
        const r = await this._db.result(`UPDATE name SET name = $1 FROM ${this._table} WHERE id = $2`, [name, this._id]);
        if (r.rowCount !== 1) {
            throw new Error(`For some reason it was not possible to change name of user: ${this._id}`);
        }
        return this;
    }

    async changeEmail(email: string): Promise<User> {
        const result = await this._db.result(`UPDATE email SET email = $1 FROM ${this._table} WHERE id = $2`, [email, this._id]);
        if (result.rowCount !== 1) {
            throw new Error(`For some reason it was not possible to change email of user: ${this._id}`);
        }
        return this;
    }

    async changeSecret(secret: string): Promise<User> {
        const result = await this._db.result(`UPDATE secret SET secret = $1 FROM ${this._table} WHERE id = $2`, [secret, this._id]);
        if (result.rowCount !== 1) {
            throw new Error(`For some reason it was not possible to change secret of user: ${this._id}`);
        }
        return this;
    }
    
    login(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    isNull(): boolean {
        return false;
    }
}
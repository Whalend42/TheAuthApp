import { User } from "./../Interface/User";

export class PgUser implements User {

    private _db: any;
    private _id: string;

    constructor(db, id: string) {
        this._db = db;
        this._id = id;
    }

    id(): Promise<string> {
        return new Promise<string>((resolve) => resolve(this._id));
    }

    async email(): Promise<string> {
        try {
            let result = "";
            const one = await this._db.oneOrNone('SELECT email FROM test_user WHERE id = $1', this._id);
            if (one !== null) {
                result = one.email;
            } else {
                throw new Error("?");
            }
            return result;
        } catch (error) {
            throw new Error("?");
        }
    }

    async name(): Promise<string> {
        try {
            let result = "";
            const one = await this._db.oneOrNone('SELECT name FROM test_user WHERE id = $1', this._id);
            if (one !== null) {
                result = one.name;
            } else {
                throw new Error("?");
            }
            return result;
        } catch (error) {
            throw new Error("?");
        }
    }

    async secret(): Promise<string> {
        try {
            let result = "";
            const one = await this._db.oneOrNone('SELECT secret FROM test_user WHERE id = $1', this._id);
            if (one !== null) {
                result = one.secret;
            } else {
                throw new Error("?");
            }
            return result;
        } catch (error) {
            throw new Error("?");
        }
    }

    async changeName(name: string): Promise<User> {
        try {
            let result = "";
            const r = await this._db.result('UPDATE name SET name = $1 FROM test_user WHERE id = $2', [name, this._id]);
            if (r.rowCount !== 1) {
                throw new Error("?");
            }
            return this;
        } catch (error) {
            throw new Error("?");
        }
    }
    async changeEmail(email: string): Promise<User> {
        try {
            let result = "";
            const r = await this._db.result('UPDATE email SET email = $1 FROM test_user WHERE id = $2', [email, this._id]);
            if (r.rowCount !== 1) {
                throw new Error("?");
            }
            return this;
        } catch (error) {
            throw new Error("?");
        }
    }
    async changeSecret(secret: string): Promise<User> {
        try {
            let result = "";
            const r = await this._db.result('UPDATE secret SET secret = $1 FROM test_user WHERE id = $2', [secret, this._id]);
            if (r.rowCount !== 1) {
                throw new Error("?");
            }
            return this;
        } catch (error) {
            throw new Error("?");
        }
    }
    isNull(): boolean {
        return false;
    }
}
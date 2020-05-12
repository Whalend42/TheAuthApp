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

    changeName(name: string): User {
        throw new Error("Method not implemented.");
    }
    changeEmail(email: string): User {
        throw new Error("Method not implemented.");
    }
    changeSecret(secret: string): User {
        throw new Error("Method not implemented.");
    }
    isNull(): boolean {
        return false;
    }
}
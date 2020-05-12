import { User } from "./../Interface/User";
import { NullUser } from "./../NullObject/NullUser";
import { PgUser } from "./../DBObject/PgUser";

export class BufferedUser implements User {

    private _origin: User;
    private _email: string;
    private _name: string;
    private _secret: string;

    constructor(user: User, email: string, name: string, secret: string) {
        this._origin = user;
        this._email = email;
        this._name = name;
        this._secret = secret;
    }

    id(): Promise<string> {
        return new Promise<string>((resolve) => resolve(this._origin.id()));
    }
    email(): Promise<string> {
        return new Promise<string>((resolve) => resolve(this._email));
    }
    name(): Promise<string> {
        return new Promise<string>((resolve) => resolve(this._name));
    }
    secret(): Promise<string> {
        return new Promise<string>((resolve) => resolve(this._secret));
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
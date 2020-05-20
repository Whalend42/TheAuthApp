import { User } from "./../Interface/User";

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
    async changeName(name: string): Promise<User> {
        await this._origin.changeName(name);
        return new BufferedUser(this._origin, this._email, name, this._secret)
    }
    async changeEmail(email: string): Promise<User> {
        await this._origin.changeEmail(email);
        return new BufferedUser(this._origin, email, this._name, this._secret)
    }
    async changeSecret(secret: string): Promise<User> {
        await this._origin.changeSecret(secret);
        return new BufferedUser(this._origin, this._email, this._name, secret)
    }
    isNull(): boolean {
        return false;
    }

}
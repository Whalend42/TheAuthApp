import { User } from "./../Interface/User";

export class NullUser implements User {
    login(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    id(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    email(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    name(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    secret(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    changeName(name: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    changeEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    changeSecret(secret: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    isNull(): boolean {
        return true;
    }
}
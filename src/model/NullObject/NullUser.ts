import { User } from "./../Interface/User";

export class NullUser implements User {
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
        return true;
    }
}
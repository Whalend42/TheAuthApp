export interface User {
    id(): Promise<string>;
    email(): Promise<string>;
    name(): Promise<string>;
    secret(): Promise<string>;
    
    changeName(name: string): User;
    changeEmail(email: string): User;
    changeSecret(secret: string): User;

    isNull(): boolean;
}
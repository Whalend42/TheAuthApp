export interface User {
    id(): Promise<string>;
    email(): Promise<string>;
    name(): Promise<string>;
    secret(): Promise<string>;
    
    changeName(name: string): Promise<User>;
    changeEmail(email: string): Promise<User>;
    changeSecret(secret: string): Promise<User>;

    isNull(): boolean;
}
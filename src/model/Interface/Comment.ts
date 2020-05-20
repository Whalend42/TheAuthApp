import { User } from "./User";

export interface Comment {
    readonly id: string;
    readonly user: User;
    readonly text: string;
    
    changeText(text: string): User;

    isNull(): boolean;
}
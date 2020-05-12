import { User } from "./User";
import { Comment } from "./Comment";


export interface Post {
    readonly id: string;
    readonly url: string;
    readonly descr: string;
    readonly user: User;
    readonly comments: Array<Comment>;
    
    changeDescr(descr: string): Post;
    addComment(comment: Comment): Post;

    isNull(): boolean;
}
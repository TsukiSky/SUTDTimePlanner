export interface Comment {
    id?: number;
    commenter: string;
    content: string;
    time: string;
    isAnonymous: boolean;
    likes: number[];
    dislikes: number[];
}
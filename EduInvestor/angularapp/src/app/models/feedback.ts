import { User } from "./user.model";
export class Feedback
{
    feedbackId? : number;
    userId? : string;
    user?:User;
    feedbackText : string;
    date ?: Date;
}

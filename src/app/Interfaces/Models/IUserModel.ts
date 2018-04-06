import {Document} from "mongoose";
import {IUser} from "../Entities/IUser";

export interface IUserModel extends IUser, Document {
    fullName(): string;
}
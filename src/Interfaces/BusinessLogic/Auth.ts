import {Document} from "mongoose";
import {IUser} from "../Entities/IUser";

export default interface IAuth {
    attempt(username: string, password: string): IUser;
}
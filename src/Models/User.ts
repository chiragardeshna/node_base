import {model} from "mongoose";
import {IUserModel} from "../Interfaces/Models/IUserModel";
import {userSchema} from "../Schemas/UserSchema";

export default model<IUserModel>("User", userSchema);
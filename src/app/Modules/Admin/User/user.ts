import {model} from "mongoose";
import {userSchema} from "./userSchema";

export default model("User", userSchema);
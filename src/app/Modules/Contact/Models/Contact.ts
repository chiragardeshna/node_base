import {model} from "mongoose";
import {contactSchema} from "../Schemas/ContactSchema";

export default model("User", contactSchema);
import {Schema} from "mongoose";
import {model} from "mongoose";

export let roleSchema: Schema = new Schema({
    name: String,
    description: String,
    createdAt: Date
});
roleSchema.pre("save", (next) => {
    if (!this.createdAt) this.createdAt = new Date();
    next();
});

export default model("Role", roleSchema);
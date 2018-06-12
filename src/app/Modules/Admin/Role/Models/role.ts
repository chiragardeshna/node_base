import {Schema} from "mongoose";
import {model} from "mongoose";
import {momentDate} from "../../helper";

export let roleSchema: Schema = new Schema({
    name: String,
    description: String,
    createdAt: {type: Date, get: momentDate}
});
roleSchema.pre("save", function (next) {
    this.createdAt = new Date();
    next();
});

export default model("Role", roleSchema);
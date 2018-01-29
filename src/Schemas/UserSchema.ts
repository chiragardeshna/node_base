import {Schema} from "mongoose";

export let userSchema: Schema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    createdAt: Date
});
userSchema.pre("save", (next) => {
    if (!this.createdAt) this.createdAt = new Date();
    next();
});
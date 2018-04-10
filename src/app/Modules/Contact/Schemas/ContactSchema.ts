import {Schema} from "mongoose";

export let contactSchema: Schema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    createdAt: Date
});
contactSchema.pre("save", (next) => {
    if (!this.createdAt) this.createdAt = new Date();
    next();
});
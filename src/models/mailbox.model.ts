import mongoose from "mongoose";

const mailBoxSchema = new mongoose.Schema({
    name: String,
    emails: [{ type: mongoose.Schema.Types.ObjectId, ref: "Email" }],
    createdAt: { type: Date, default: Date.now },
})

export const MailBox = mongoose.model("MailBox", mailBoxSchema);
import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    to: String,
    from: String,
    subject: String,
    text: String,
    html: String,
    createdAt: { type: Date, default: Date.now },
    mailbox: { type: mongoose.Schema.Types.ObjectId, ref: "MailBox" },
})

export const Email = mongoose.model("Email", emailSchema);  
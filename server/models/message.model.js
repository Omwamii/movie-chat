import mongoose from "mongoose";
import User from "./user.model.js";

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: false, // if message is a reply
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // track users who have read the message
        },
    ],
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
export default Message;


import mongoose from "mongoose"
const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference user 
        required: true,
    },
    // receiverId: if the message is a reply to another message
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: false,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Message = mongoose.model("Message", MessageSchema)
export default Message

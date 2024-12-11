import mongoose  from "mongoose";

const ChannelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        }
    ],
}, {timestamps: true})

const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
import mongoose  from "mongoose";

const ChannelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    filmId: {
        type: Number,
        unique: true,
        required: true,
    }, // the movie or series id as fetched from the API
    type: {
        type: String,
        enum: ['movie', 'series'], // Either a movie channel or series channel
        required: true,
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
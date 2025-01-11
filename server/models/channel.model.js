import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoose  from "mongoose";
import Message from "./message.model.js";

const ChannelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
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
    icon: {
        type: String,
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
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }
}, {timestamps: true})

  ChannelSchema.virtual('messagesCount').get(function() {
    return this.messages.length;
  });

  ChannelSchema.virtual('usersCount').get(function() {
    return this.users.length;
  });
  

ChannelSchema.plugin(mongooseLeanVirtuals);

const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
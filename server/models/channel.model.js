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
}, {timestamps: true})

ChannelSchema.virtual('lastTextTime').get(function() {
    if (this.messages && this.messages.length > 0) {
      const lastMessage = this.messages[this.messages.length - 1];
      return lastMessage.timestamp;
    }
    return null;
  });
  
  ChannelSchema.virtual('lastText').get(function() {
    if (this.messages && this.messages.length > 0) {
      const lastMessage = this.messages[this.messages.length - 1];
      return lastMessage.text;
    }
    return null;
  });

const Channel = mongoose.model("Channel", ChannelSchema);
export default Channel;
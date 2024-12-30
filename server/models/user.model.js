import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    joinedChannels: [
        {
            type: Number,
            ref: "Channel",
        }
    ],
    colour: String // each user gets a random colour for their name display
}, {timestamps: true});

const User = mongoose.model("User", UserSchema)
export default User;
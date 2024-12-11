import Channel from "../models/channel.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const { id: channelId } = req.params;  // movie channel id
        const senderId = req.user._id

        const channel = await Channel.findOne({
            _id: channelId,
        })

        if (!channel) {
            return res.status(404).json({error: "No such channel"});
        }

        const newMessage = await Message.create({
            senderId,
            channelId,
            message,
        })
        
        if (newMessage) {
            channel.messages.push(newMessage._id)
        }

        return res.status(201).json({newMessage});

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Something went wrong"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: channelId } = req.params;  // movie channel id
       
        const channel = await Channel.findOne({
            _id: channelId,
        }).populate("messages")

        if (!channel) {
            return res.status(404).json({error: "No such channel"});
        }

        const messages = channel.messages;

        return res.status(200).json(messages);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Something went wrong"})
    }

}
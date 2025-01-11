import Channel from "../models/channel.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, replyId } = req.body;
        const { id: channelId } = req.params;  // movie channel id
        const senderId = req.user._id

        const channel = await Channel.findOne({
            _id: channelId,
        })

        if (!channel) {
            return res.status(404).json({error: "No such channel"});
        }

        const newMessage = await Message.create({
            sender: senderId,
            channel: channelId,
            text: message,
            replyTo: replyId,
        })
        
        if (newMessage) {
            channel.messages.push(newMessage._id)
            channel.lastMessage = newMessage
            channel.save()
        }

        const updatedchannel = await channel.populate({
            path: "messages",
            populate: [
                { path: "sender", select: "username" },
                { path: "replyTo", populate: {
                    path: "sender",
                    select: "username, text"
                }},
            ],
        })

        // const sentMessage = await newMessage.populate({
        //     path: "sender",
        //     select: "username _id",
        // });

        return res.status(201).json(updatedchannel);

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
        })

        if (!channel) {
            return res.status(404).json({error: "No such channel"});
        }

        const messages = await Message.find({
            channelId,
        }).populate("replyTo")

        return res.status(200).json(messages);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Something went wrong"})
    }

}

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id)
        .then(deletedMessage => {
            if (deletedMessage) {
                return res.status(200).json(id) // returns the id of the message deleted (for state update)
            } else {
                return res.status(404).json({error: "Message does not exist"})
            }
        })
        .catch(error => {
            throw new Error(error)
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Couldn't delete message"})
    }
}

export const markAsRead = async (messageId, userId) => {
    await Message.findByIdAndUpdate(
        messageId,
        { $addToSet: { readBy: userId } }, // $addToSet avoids duplicates
        { new: true }
    );
};

const isUnread = async (messageId, userId) => {
    const message = await Message.findById(messageId);
    return !message.readBy.includes(userId);
};

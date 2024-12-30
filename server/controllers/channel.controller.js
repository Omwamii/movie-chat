import Channel from "../models/channel.model.js"
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const createChannel = async (req, res) => {
    const { title, filmId, type, creatorId } = req.body;

    try {
        const channel = await Channel.findOne({
            title,
            filmId
        })
        console.log(channel)
        if (channel) {
            return res.status(400).json({error: "This channel already exists"})
        }

        const newChannel = Channel({
            title,
            creatorId,
            filmId,
            type,
        })
        await newChannel.save()
        return res.status(201).json(newChannel)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: "An error occured creating the channel"})
    }
}

export const deleteChannel = async (req, res) => {
    const { id } = req.params;
    try {
        await Channel.findByIdAndDelete({
            _id: id,
        })
        return res.status(200).json({message: 'Channel deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: "An error occured deleting the channel"})
    }
}

export const getAllChannels = async (req, res) => {
    try {
        // Fetch all channels
        const channels = await Channel.find();

        return res.status(200).json(channels);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "An error occurred getting channels" });
    }
};

export const getMyChannels = async (req, res) => {
    const userId = req.user._id;

    try {
        // Fetch channels user has joined
        const myChannels = await Channel.find({ users: userId });

        return res.status(200).json(myChannels);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "An error occured getting user's channels "});
    }
};

export const joinChannel = async (req, res) => {
    try {
        const { userId, channelId } = req.body;

        const user = await User.findById(userId)
        const channel = await Channel.findOne({
            filmId: channelId,
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        // console.log(channel.users, userId)
        const channelUsers = channel.users.map(user => user.toString()) // convert objectIds to string
        console.log(channelUsers.includes(userId))

        if (channelUsers.includes(userId)) {
            return res.status(400).json({ error: "You already joined the channel" });
        }
        channel.users.push(userId);

        if (!user.joinedChannels.includes(channelId)) {
            user.joinedChannels.push(channelId);
        }

        await channel.save();
        await user.save();

        return res.status(200).json({ message: "You successfully joined the channel" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

export const getChannelIds = async(req, res) => {
    try {
        const { type } = req.params; // 'series' or 'movie'
        console.log(type)
        if (type !== 'movie' && type !== 'series') {
            return res.status(400).json({ message: "Invalid channel type" });
        }
        const channels = await Channel.find({
            type,
        }).select('filmId -_id')
        const channelIds = []
        channels.forEach((item) => channelIds.push(item.filmId))

        return res.status(200).json(channelIds)
    } catch (error) {
        return res.status(500).json({message: "An error occured"})
    }
}
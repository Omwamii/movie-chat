import Channel from "../models/channel.model.js"
import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const createChannel = async (req, res) => {
    const { title, filmId, type, creatorId, icon } = req.body;

    try {
        const channel = await Channel.findOne({
            title,
            filmId
        })
        // console.log(channel)
        if (channel) {
            return res.status(400).json({error: "This channel already exists"})
        }

        const newChannel = Channel({
            title,
            creator: creatorId,
            filmId,
            type,
            icon,
        })
        await newChannel.save()
        return res.status(201).json(newChannel)
    } catch (error) {
        console.log(error)
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
        console.log(error)
        res.status(500).json({error: "An error occured deleting the channel"})
    }
}

export const getAllChannels = async (req, res) => {
    // console.log('get all');
    try {
        // Fetch all channels
        const channels = await Channel.find().select("-messages")

        // console.log('all chanels', channels)

        return res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred getting channels" });
    }
};

export const getMyChannels = async (req, res) => {
    const userId = req.user._id;

    try {
        const channels = await Channel.find({
            users: { $in: [userId] },
        })
        .lean({ virtuals: true })
        .populate({ path: "lastMessage" , select: "createdAt text" })

        // console.log(channels)

        return res.status(200).json(channels);
    } catch (error) {
        console.error(error);
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
        // console.log(channelUsers.includes(userId))

        if (channelUsers.includes(userId)) {
            return res.status(400).json({ error: "You already joined the channel" });
        }
        channel.users.push(userId);

        if (!user.joinedChannels.includes(channelId)) {
            user.joinedChannels.push(channelId);
        }

        await channel.save();
        await user.save();

        return res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
};

export const getChannelIds = async(req, res) => {
    try {
        const { type } = req.params; // 'series' or 'movie'
        // console.log(type)
        if (type !== 'movie' && type !== 'series') {
            return res.status(400).json({ error: "Invalid channel type" });
        }

        const channelIds = []
        const channels = await Channel.find({
            type,
        }).select('filmId -_id')
        channels.forEach((channel) => channelIds.push(channel.filmId))

        return res.status(200).json(channelIds)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "An error occured"})
    }
}

export const getUserJoinedChannelsIds = async(req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({
            _id: userId
        })
        return res.status(200).json(user.joinedChannels)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "An error occured"})
    }
}

export const getCreatedChannelsIds = async(req, res) => {
    try {
        const channelIds = []
        const channels = await Channel.find().select("filmId -_id")

        channels.forEach((channel) => channelIds.push(channel.filmId))

        return res.status(200).json(channelIds)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "An error occured fetching all channels"})
    }
}

export const searchChannels = async (req, res) => {
    try {
        const { query, flag, userId } = req.body;
        console.log(req.body)

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        let channels = [];

        if (flag === "all") {
            channels = await Channel.find({
                title: { $regex: query, $options: "i" },
            })

        } else if (flag === "joined") {
            const user = await User.findById(userId)

            // console.log(user)
            // console.log(user.joinedChannels)

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const joinedChannels = []
            for (const channelFilmId of user.joinedChannels){
                const joinedChannel = await Channel.findOne({
                    filmId: channelFilmId
                })
                // .lean({ virtuals: true })
                // .populate({
                //         path: "messages",
                //         populate: [
                //             { path: "sender", select: "username" },
                //             { path: "replyTo", populate: {
                //                 path: "sender",
                //                 select: "username _id"
                //             }},
                //         ],
                //     })

                if (joinedChannel && joinedChannel.title.toLowerCase().includes(query.toLowerCase())) {
                    const unreadCount = await Message.countDocuments({
                        channel: joinedChannel._id,
                        readBy: { $ne: userId },
                    });

                    joinedChannel.unreadCount = unreadCount;
        
                    if (joinedChannel.messages && joinedChannel.messages.length > 0) {
                        const lastMessage = joinedChannel.messages[joinedChannel.messages.length - 1];
                        joinedChannel.lastMessage = lastMessage;
                    }

                    console.log(joinedChannel.unreadCount)

                    joinedChannels.push(joinedChannel)
                }
            }

            channels = joinedChannels
            console.log(channels)

        } else {
            return res.status(400).json({ error: "Invalid channel type" });
        }

        return res.status(200).json(channels);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "A search error occurred" });
    }
};

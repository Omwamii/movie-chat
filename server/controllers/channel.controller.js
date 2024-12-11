import Channel from "../models/channel.model.js"

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
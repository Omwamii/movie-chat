import useChannels from "../z-store/useChannels"
import { React } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import useJoinedChannels from "../z-store/useJoinedChannels";

export default function ChannelDisplay ({ channel }) {
    const { authUser } = useAuthContext();
    const { joinedChannels } = useJoinedChannels();
    // const { selectedChannel, setSelectedChannel } = useChannels();

    //  const isSelected = selectedChannel?._id === channel._id // channel is prop
     const handleJoinChannel = async () => {
        console.log('join channel');
        try {
            const body = {
                channelId: channel.filmId,
                userId: authUser._id
            }

            const response = await fetch('api/channels/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const data = await response.json();
            // console.log(data);
    
            if (data.error) {
                throw new Error(data.error);
            } else {
                toast.success(`You joined ${channel.title} channel`)
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
     }

    return (
        <div className="channel-display">
            <div className="channel-display-header">
                <img src={channel.icon} className="channel-display-cover"/>
            </div>
            <div className="channel-display-info">
                <div className="channel-display-title">{channel.title}</div>
                <button onClick={handleJoinChannel} className="channel-display-btn">
                    {joinedChannels.includes(channel.filmId) ? 'View' : 'Join'}
                </button>
            </div>
        </div>
    )
}
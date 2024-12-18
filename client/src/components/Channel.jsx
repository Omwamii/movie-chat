import useChannels from "../z-store/useChannels"
import { React } from "react";

export default function Channel ({ channel }) {
    const { selectedChannel, setSelectedChannel } = useChannels();

    //  const isSelected = selectedChannel?._id === channel._id // channel is prop
    const isSelected = true;

    return (
        <div className={`list-channel ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedChannel(channel)} >
            <div className="list-channel-image">
                <img src={channel.icon} className="channel-movie-cover"/>
            </div>
            <div className="list-channel-text-info">
            <div className="channel-header">
                <div className="list-channel-title">{channel.title}</div>
                <div className="list-channel-last-time">{channel.lastTextTime}</div>
            </div>
            <div className="channel-body">
                <div className="list-channel-last-text">{channel.lastText}</div>
                <div className="list-channel-num-chats">{channel.numberOfNewTexts}</div>
            </div>
            </div>
        </div>
    )
}
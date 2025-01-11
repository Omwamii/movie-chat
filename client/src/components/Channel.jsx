import useChannels from "../z-store/useChannels"
import { React } from "react";
import { format } from 'date-fns';


export default function Channel ({ channel }) {
    const { selectedChannel, setSelectedChannel } = useChannels();

     const isSelected = selectedChannel?._id === channel._id // channel is prop
     // const formattedTime = format(new Date(channel.lastMessage.createdAt), 'hh:mm a');

    return (
        <div className={`list-channel ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedChannel(channel)} >
            <div className="list-channel-image">
                <img src={channel.icon} className="channel-movie-cover" loading="lazy"/>
            </div>
            <div className="list-channel-text-info">
            <div className="channel-header">
                <div className="list-channel-title">{channel.title}</div>
                <div className="list-channel-last-time">{channel.lastMessage ? format(new Date(channel.lastMessage.createdAt), 'hh:mm a') : 
                    format(new Date(channel.createdAt), 'hh:mm a')
                }</div>
            </div>
            <div className="channel-body">
                <div className="list-channel-last-text">{channel.lastMessage ? channel.lastMessage.text : 'Be the first one to chat'}</div>
                <div className="list-channel-num-chats">{channel.messagesCount}</div>
            </div>
            </div>
        </div>
    )
}
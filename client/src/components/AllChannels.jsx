// Component holding channels list
import React, { useState, useEffect } from "react";
import useGetAllChannels from "../hooks/useGetAllChannels";
import LoadingSpinner from "./LoadingSpinner";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import useJoinedChannels from "../z-store/useJoinedChannels";

function AllChannels({ channels, loading }) {
  const { authUser } = useAuthContext();

  const { addJoinedChannel } = useJoinedChannels();
  const joinedChannels = useJoinedChannels((state) => state.joinedChannels);
  const [localJoinedChannels, setLocalJoinedChannels] = useState([]);

  useEffect(() => {
      // Sync local state with global state
      setLocalJoinedChannels(joinedChannels);
  }, [joinedChannels]);

   const handleJoinChannel = async (channel) => {
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
  
          if (data.error) {
              throw new Error(data.error);
          } else {
            addJoinedChannel(data.filmId)
            toast.success(`You joined ${channel.title} channel`)
          }
      } catch (error) {
          toast.error(error.message)
          console.error(error)
      }
   }

   const handleViewChannel = (channel) => {
      console.log('view channel')
   }

  return (
    <div className="list-channels">
    {loading ? (<LoadingSpinner />) : channels.map((channel) => (
        <div className="channel-display" id={channel.filmId} key={channel._id}>
            <div className="channel-display-header">
                <img src={channel.icon} className="channel-display-cover" loading="lazy"/>
            </div>
            <div className="channel-display-info">
                <div className="channel-display-title">{channel.title}</div>
                {localJoinedChannels.includes(channel.filmId) ? (
                    <button onClick={() => handleViewChannel(channel)} className="channel-display-btn">View</button>
                ): (
                    <button onClick={() => handleJoinChannel(channel)} className="channel-display-btn">Join</button>
                )}
            </div>
        </div>
    ))}
    </div>
  );
}

export default AllChannels;

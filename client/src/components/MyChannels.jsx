// Component holding channels list
import React, { useState } from "react";
import movieIcon from '../assets/images/from-cover.jpg'
import useChannels from "../z-store/useChannels";
import Channel from "./Channel";
import useGetUserChannels from "../hooks/useGetUserChannels";
import LoadingSpinner from "./LoadingSpinner";

function MyChannels() {
  // const [value, setValue] = useState("");
  // const { selectedChannel, setSelectedChannel } = useChannels();
  const { loading, channels } = useGetUserChannels();

  // const channel = {
  //   _id: 1,
  //   title: 'From',
  //   icon: movieIcon,
  //   lastTextTime: '7:36 am',
  //   lastText: 'Guys season 2 is out...',
  //   unreadCount: 36,
  // }
  // const isSelected = selectedChannel?._id === channel._id // channel is prop
  // console.log('my channels', channels)

  return (
    <div className="list-channels">
      {loading ? (<LoadingSpinner />) : channels.map((channel) => (
        <Channel channel={channel} key={channel._id}/>
      ))}
    </div>
  );
}

export default MyChannels;

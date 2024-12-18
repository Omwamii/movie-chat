// Component holding channels list
import React, { useState } from "react";
import movieIcon from '../assets/images/from-cover.jpg'
import useChannels from "../z-store/useChannels";
import Channel from "./Channel";

function MyChannels() {
  const [value, setValue] = useState("");
  const { selectedChannel, setSelectedChannel } = useChannels();
  const channel = {
    _id: 1,
    title: 'From',
    icon: movieIcon,
    lastTextTime: '7:36 am',
    lastText: 'Guys season 2 is out...',
    numberOfNewTexts: 36,
  }
  // const isSelected = selectedChannel?._id === channel._id // channel is prop

  return (
    <div className="list-channels">
      <Channel channel={channel}/>
    </div>
  );
}

export default MyChannels;

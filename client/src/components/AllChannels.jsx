// Component holding channels list
import React, { useState } from "react";
import movieIcon from '../assets/images/from-cover.jpg'
import NopeMovieIcon from '../assets/images/Nope 2022 Movie Poster 4k UHD.jpeg'
import Channel from "./Channel";

function AllChannels() {
  // const [value, setValue] = useState("");
  const channel = {
    _id: 1,
    title: 'From',
    icon: movieIcon,
    lastTextTime: '7:36 am',
    lastText: 'Guys season 2 is out...',
    numberOfNewTexts: 36,
  }

  console.log('All channels', channel);

  return (
    <div className="list-channels">
       <Channel channel={channel}/>
    </div>
  );
}

export default AllChannels;

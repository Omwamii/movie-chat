// Component holding channels list
import React, { useState } from "react";
import movieIcon from '../assets/images/from-cover.jpg'
import NopeMovieIcon from '../assets/images/Nope 2022 Movie Poster 4k UHD.jpeg'
import Channel from "./Channel";
import useGetAllChannels from "../hooks/useGetAllChannels";
import LoadingSpinner from "./LoadingSpinner";
import ChannelDisplay from "./ChannelDisplay";

function AllChannels() {
  const { loading, channels } = useGetAllChannels();

  return (
    <div className="list-channels">
    {loading ? (<LoadingSpinner />) : channels.map((channel) => (
        <ChannelDisplay channel={channel}/>
      ))}
    </div>
  );
}

export default AllChannels;

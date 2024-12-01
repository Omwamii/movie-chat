// Component holding channels list
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import movieIcon from '../assets/images/from-cover.jpg'

function MyChannels() {
  const [value, setValue] = useState("");

  return (
    <div className="list-channels">
      {/* add for loop rendering channels */}
      <div className="list-channel">
        <div className="list-channel-image">
          <img src={movieIcon} className="channel-movie-cover"/>
        </div>
        <div className="list-channel-text-info">
          <div className="channel-header">
            <div className="list-channel-title">From</div>
            <div className="list-channel-last-time">7:36pm</div>
          </div>
          <div className="channel-body">
            <div className="list-channel-last-text">Guys season 2 is out...</div>
            <div className="list-channel-num-chats">35</div>
          </div>
        </div>
      </div>

      <div className="list-channel">
        <div className="list-channel-image">
          <img src={movieIcon} className="channel-movie-cover"/>
        </div>
        <div className="list-channel-text-info">
          <div className="channel-header">
            <div className="list-channel-title">From</div>
            <div className="list-channel-last-time">7:36pm</div>
          </div>
          <div className="channel-body">
            <div className="list-channel-last-text">Guys season 2 is out...</div>
            <div className="list-channel-num-chats">35</div>
          </div>
        </div>
      </div>

      <div className="list-channel">
        <div className="list-channel-image">
          <img src={movieIcon} className="channel-movie-cover"/> 
        </div>
        <div className="list-channel-text-info">
          <div className="channel-header">
            <div className="list-channel-title">From</div>
            <div className="list-channel-last-time">7:36pm</div>
          </div>
          <div className="channel-body">
            <div className="list-channel-last-text">Guys season 2 is out...</div>
            <div className="list-channel-num-chats">35</div>
          </div>
        </div>
      </div>

      <div className="list-channel">
        <div className="list-channel-image">
          <img src={movieIcon} className="channel-movie-cover"/>
        </div>
        <div className="list-channel-text-info">
          <div className="channel-header">
            <div className="list-channel-title">From</div>
            <div className="list-channel-last-time">7:36pm</div>
          </div>
          <div className="channel-body">
            <div className="list-channel-last-text">Guys season 2 is out...</div>
            <div className="list-channel-num-chats">35</div>
          </div>
        </div>
      </div>

      <div className="list-channel">
        <div className="list-channel-image">
          <img src={movieIcon} className="channel-movie-cover"/>
        </div>
        <div className="list-channel-text-info">
          <div className="channel-header">
            <div className="list-channel-title">From</div>
            <div className="list-channel-last-time">7:36pm</div>
          </div>
          <div className="channel-body">
            <div className="list-channel-last-text">Guys season 2 is out...</div>
            <div className="list-channel-num-chats">35</div>
          </div>
        </div>
      </div>

      <div className="list-channel">
        <div className="list-channel-image">
          <img src={movieIcon} className="channel-movie-cover"/>
        </div>
        <div className="list-channel-text-info">
          <div className="channel-header">
            <div className="list-channel-title">From</div>
            <div className="list-channel-last-time">7:36pm</div>
          </div>
          <div className="channel-body">
            <div className="list-channel-last-text">Guys season 2 is out...</div>
            <div className="list-channel-num-chats">
                <p>35</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MyChannels;

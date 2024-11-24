// Component holding messages content
import React, { useState } from "react";
import dropDownIconDark from '../assets/images/down-arrow-dark.png';
import dropDownIconBlue from '../assets/images/down-arrow.png';

function MyMessage() {
  return (
    <div className="message my-message"> {/* Toggle btwn my text */}
      <div className="message-header">
        <div className="message-owner">John Doe</div>
        <div className="message-actions">
          <img src={dropDownIconBlue} alt="reply" className="message-reply-action"/> {/* Toggle with blue */}
        </div>
      </div>
      <div className="message-text">
        Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis.
        Praesent mollis congue libero. Vestibulum pulvinar
      </div>
      <div className="message-time">
        <p>7:31 pm</p>
      </div>
    </div>
  );
}

export default MyMessage;

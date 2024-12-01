// Component holding messages content
import React, { useState } from "react";
import dropDownIconDark from '../assets/images/down-arrow-dark.png';
import dropDownIconBlue from '../assets/images/down-arrow.png';

function Message() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="message not-my-message"> {/* Toggle btwn my text */}
      <div className="message-header">
        <div className="message-owner">John Doe</div>
        <div className="message-actions">
          <img src={dropDownIconDark} alt="reply" className="message-reply-action" onClick={toggleMenu}/> {/* Toggle with blue */}
          {menuVisible && (
            <div className="dropdown-menu" onMouseLeave={closeMenu}>
              <ul>
                <li onClick={() => console.log('Reply clicked')}>Reply</li>
                <li onClick={() => console.log('Delete clicked')}>Delete</li>
              </ul>
            </div>
          )}
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

export default Message;

// Textbox for message 
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import emoji from '../assets/images/smile.png';
import sendIcon from '../assets/images/send.png';

function MessageInput() {
    const [value, setValue] = useState('');

    return (
        <div className="message-input-section">
            <div className="emoji-select">
                <img src={emoji} alt="Emojis" className="emoji-face"/>
            </div>
             <div className="chat-input-container">
                <input  className="chat-input" placeholder="What's up?" />
            </div>
            <div className="send-section">
                <img src={sendIcon} alt="Send" className="send-icon" />
            </div>
        </div>
    )
}

export default MessageInput;
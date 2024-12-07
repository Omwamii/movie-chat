// Textbox for message 
import React, { useState } from "react";
import emoji from '../assets/images/smile.png';
import sendIcon from '../assets/images/send.png';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

function MessageInput() {
    const [inputValue, setInputValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    // Function to handle emoji selection
    const handleEmojiSelect = (emoji) => {
        setInputValue((prev) => prev + emoji.native); // Append emoji to input value
    };

    return (
        <div className="emoji-input-section">
            <div className="emoji-picker-div">
                {showPicker && (
                        <Picker
                            data={data}
                            onEmojiSelect={handleEmojiSelect}
                            theme="dark"
                            className="emoji-picker"
                        />
                    )}
            </div>
            <div className="message-input-section">
                <div className="emoji-select">
                    <img src={emoji} alt="Emojis" className="emoji-face" onClick={() => setShowPicker(!showPicker)} />
                </div>
                <div className="chat-input-container">
                    <input  className="chat-input" placeholder="what's up?" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                </div>
                <div className="send-section">
                    <img src={sendIcon} alt="Send" className="send-icon" />
                </div>
            </div>
        </div>
    )
}

export default MessageInput;
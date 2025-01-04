// -- obsolete
// Textbox for message 
import React, { useEffect, useState } from "react";
import emoji from '../assets/images/smile.png';
import sendIcon from '../assets/images/send.png';
import cancelIcon from '../assets/images/close.png';
import useEmojiPicker from "../z-store/useEmojiPicker";
import useChatInput from "../z-store/useChatInput";
import useSendMessage from "../hooks/useSendMessage";

function MessageInput() {
    const { inputValue, setInputValue }= useChatInput();
    const { showEmojiPicker, setShowEmojiPicker } = useEmojiPicker();
    const { sendMessage } = useSendMessage();

    // Function to handle emoji selection
    function handleSendClicked() {
        sendMessage(inputValue);
        setInputValue("");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            sendMessage(inputValue);
            setInputValue("");
        }
    }

    return (
        <div className="emoji-input-section">
            <div className="message-input-section">
                {showEmojiPicker && (
                    <div className="drop-emoji-picker">
                        <img src={cancelIcon} alt="cancel" className="picker-cancel-icon" onClick={() => setShowEmojiPicker(false)}/>
                    </div>
                )}
                <div className="emoji-select">
                    <img src={emoji} alt="Emojis" className="emoji-face" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                </div>

                <div className="chat-input-container">
                    <input  className="chat-input" placeholder="what's up?" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress}/>
                </div>

                <div className="send-section">
                    <img src={sendIcon} alt="Send" className="send-icon" onClick={handleSendClicked}/>
                </div>
            </div>
        </div>
    )
}

export default MessageInput;
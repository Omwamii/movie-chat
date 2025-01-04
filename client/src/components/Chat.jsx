// Displays the group chat messages
import ChatHeader from "./ChatHeader";
import { React, useState } from "react";
import useEmojiPicker from '../z-store/useEmojiPicker';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useChatInput from "../z-store/useChatInput";
import dropDownIconDark from "../assets/images/down-arrow-dark.png";
import dropDownIconBlue from "../assets/images/down-arrow.png";
import { useAuthContext } from "../context/AuthContext";
import { format } from 'date-fns';
import cancelIcon from '../assets/images/close.png';
import emoji from '../assets/images/smile.png';
import sendIcon from '../assets/images/send.png';
import useSendMessage from "../hooks/useSendMessage";

function Chat({ chat }) {
    const { showEmojiPicker,  setShowEmojiPicker } = useEmojiPicker();
    const { sendMessage } = useSendMessage();
    const { setInputValue, inputValue } = useChatInput();
    const { authUser }  = useAuthContext();
    const [messageReplyingTo, setMessageReplyingTo] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [showReplyPreview, setShowReplyPreview]  = useState(false);
    const [activeMessageId, setActiveMessageId] = useState(null); // to toggle menu for current message clicked on

    const handleEmojiSelect = (emoji) => {
        const updatedInput = inputValue + emoji.native;
        setInputValue(updatedInput);
    };

    const handleClickedOutside = (event) => {
        console.log('clicked outside the picker');
    }
  
    const handleReplyClicked = (message) => {
      setMessageReplyingTo(message);
      setShowReplyPreview(true);
    }
  
    const toggleMenu = (messageId) => {
      setActiveMessageId(messageId);
    };
  
    const closeMenu = () => {
      setActiveMessageId(null);
    };

    const handleCancelReplyPreview = () => {
        setShowReplyPreview(false)
    }

    function handleSendClicked() {
        sendMessage(inputValue, messageReplyingTo);
        setInputValue("");
        setShowReplyPreview(false)
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            sendMessage(inputValue, messageReplyingTo);
            setInputValue("");
            setShowReplyPreview(false);
        }
    }

    chat.messages.forEach(message => {
        console.log(message);
    });

    return (
        <div className="chat">
            <ChatHeader chat={chat}/>
            <div className="chat-canvas">
            {chat.messages.map((message) => (
                <div className={`message ${message.sender._id === authUser._id ? "my-message" : "not-my-message"}`} id={message._id} key={message._id}>
                    <div className="message-header">
                        <div className="message-owner">{message.sender.username}</div>
                        <div className="message-actions">
                        
                        <img alt="reply" className="message-reply-action" onClick={() => toggleMenu(message._id)}
                            src={
                            message.sender._id === authUser._id
                                ? dropDownIconBlue
                                : dropDownIconDark
                            }
                        />

                        {activeMessageId ? (activeMessageId === message._id) && (
                            <div className="dropdown-menu" onMouseLeave={closeMenu}>
                            <ul>
                                <li onClick={() => handleReplyClicked(message)} id={`reply-${message._id}`}>
                                Reply
                                </li>
                                {/* <li onClick={handleDeleteClicked} id={`delete-${message._id}`}>
                                Delete
                                </li> */}
                            </ul>
                            </div>
                        ) : <></>}
                        </div>
                    </div>
                    
                    {message.replyTo && (
                        <div className="message-reply-body">
                        <div className="reply-header">
                            <span className="reply-username">{message.replyTo.sender._id === authUser._id ? 'You' : message.replyTo.username}</span>
                        </div>
                        <div className="reply-body">
                            <div className="reply-preview-text">{message.replyTo.text}</div>
                        </div>
                        </div>
                    )}
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                        <p>{format(new Date(message.createdAt), 'hh:mm a')}</p>
                    </div>
                    </div>
            ))}

            </div>

            <div className="chat-input">
                    {/* <EmojiPicker /> */}
                    <div className="emoji-picker-div">
                        {showEmojiPicker && (
                            <Picker
                                perLine={20}
                                data={data}
                                onEmojiSelect={handleEmojiSelect}
                                onClickOutside={handleClickedOutside}
                                theme="dark"
                                style={{
                                    width: "500px",
                                    border: "3px solid red"
                                }}
                            />
                        )}
                    </div>

                    {showReplyPreview && (
                        <div className='reply-preview-section'>
                            <div className="reply-preview">
                                <div className="reply-header">
                                    <span className="reply-username">{messageReplyingTo.sender.username}</span>
                                    <span className="cancel-reply" onClick={handleCancelReplyPreview}>
                                        <img src={cancelIcon} alt="cancel" className='cancel-icon' />
                                    </span>
                                </div>
                                <div className="reply-body">
                                    <div className='reply-preview-text'>{messageReplyingTo.text}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <MessageInput /> */}
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
        </div>
    )
}

export default Chat;
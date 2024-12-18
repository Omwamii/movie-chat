// Displays the group chat messages
import React, { useState, useEffect } from "react";
import menuIcon from '../assets/images/menu.png';
import MessageInput from './MessageInput';
import Message  from './Message';
import MyMessage from './Message';
import Reply from './Reply';
import dropDownIconDark from '../assets/images/down-arrow-dark.png';
import cancelIcon from '../assets/images/close.png';
import dropDownIconBlue from '../assets/images/down-arrow.png';
import emoji from '../assets/images/smile.png';
import sendIcon from '../assets/images/send.png';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

function Chat({chat}) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [messageReplyingTo, setMessageReplyingTo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const message = {
        _id: '991',
        username: 'John Doe',
        text: `Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis.
        Praesent mollis congue libero. Vestibulum pulvinar`,
        time: '7:31 pm',
        user_id: '1234',
        reply: {
            _id: '983',
            username: 'Jane doe',
            text: 'JLDSJDW DPWIPEW D[OW sdpekdpwe pksw',
            time: '7:20 pm',
            user_id: '2040',
            reply: {}
        }
    }

    const toggleMenu = () => {
      setMenuVisible((prev) => !prev);
    };
  
    const closeMenu = () => {
      setMenuVisible(false);
    };
  
    const getMessageDetails = (messageId) => {
      const messageElement = document.getElementById(messageId);
      const name = messageElement.querySelector('.message-owner').textContent;
      const text = messageElement.querySelector('.message-text').textContent;
      return {name, text};
    }


    const showReplyPreview = () => {
        if (!messageReplyingTo) return;
        // console.log('Showing preview');
        const previewElement = document.getElementsByClassName('reply-preview')[0];
        const replyUser = previewElement.getElementsByClassName('reply-username')[0];
        const replyText = previewElement.getElementsByClassName('reply-preview-text')[0];
        const replyDetails = getMessageDetails(messageReplyingTo);
        replyUser.textContent = replyDetails.name;
        replyText.textContent = replyDetails.text;
        // display the preview section
        // previewElement.style.display = 'block';
        previewElement.classList.add('show-reply-preview');
        console.log(`${replyUser} -> ${replyText}`);
    }

    const handleCancelReplyPreview = () => {
        const previewElement = document.getElementsByClassName('reply-preview')[0];
        previewElement.classList.remove('show-reply-preview');
        // previewElement.style.display = 'none';
    }

    const handleReplyClicked = (event) => {
      const replyId = event.target.id;
      const messageId = replyId.split("-")[1];
        //   console.log(`Replying to message id: ${messageId}`);
        //   console.log(getMessageDetails(messageId));
      setMessageReplyingTo(messageId);
      showReplyPreview();
    }
  
    const handleDeleteClicked = (event) => {
      const replyId = event.target.id;
      const messageId = replyId.split("-")[1];
      console.log(`Deleting message id: ${messageId}`);
    }

    // Function to handle emoji selection
    const handleEmojiSelect = (emoji) => {
        setInputValue((prev) => prev + emoji.native); // Append emoji to input value
    };

    // const handleDropPicker = () => {
    //     setShowPicker(false);
    // }

    const dropEmojiPicker = () => {
        setShowPicker(false);
    }

    return (
        <div className="chat">
            <div className="chat-group-info">
                <div className="group-members-number">
                    42 chat buddies, 4 online
                </div>
                <div className="group-name">
                    From
                </div>
                <div className='group-menu'>
                    <img src={menuIcon} alt="menu" className='group-menu-icon'/>
                </div>
            </div>
            <div className="chat-canvas">
                {/* Chat messages*/}
                <div className="message not-my-message" id="123"> {/* Toggle btwn my text */}
                    <div className="message-header">
                        <div className="message-owner">John Doe</div>
                        <div className="message-actions">
                        <img src={dropDownIconDark} alt="reply" className="message-reply-action" onClick={toggleMenu}/> {/* Toggle with blue */}
                        {menuVisible && (
                            <div className="dropdown-menu" onMouseLeave={closeMenu}>
                            <ul>
                                <li onClick={handleReplyClicked} id="reply-123">Reply</li>
                                <li onClick={handleDeleteClicked} id='delete-123'>Delete</li>
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

                <div className="message not-my-message" id="123"> {/* Toggle btwn my text */}
                    <div className="message-header">
                        <div className="message-owner">John Does</div>
                        <div className="message-actions">
                        <img src={dropDownIconDark} alt="reply" className="message-reply-action" onClick={toggleMenu}/> {/* Toggle with blue */}
                        {menuVisible && (
                            <div className="dropdown-menu" onMouseLeave={closeMenu}>
                            <ul>
                                <li onClick={handleReplyClicked} id="reply-123">Reply</li>
                                <li onClick={handleDeleteClicked} id='delete-123'>Delete</li>
                            </ul>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="message-reply-body">
                        <div className="reply-header">
                            <span className="reply-username">Name</span>
                        </div>
                        <div className="reply-body">
                            <div className='reply-preview-text'>Text being replied to</div>
                        </div>
                    </div>
                    <div className="message-text">
                        Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis
                        Praesent mollis congue libero. Vestibulum pulvinar
                    </div>
                    <div className="message-time">
                        <p>7:31 pm</p>
                    </div>
                </div>

                <div className="message not-my-message" id="123"> {/* Toggle btwn my text */}
                    <div className="message-header">
                        <div className="message-owner">John Does</div>
                        <div className="message-actions">
                        <img src={dropDownIconDark} alt="reply" className="message-reply-action" onClick={toggleMenu}/> {/* Toggle with blue */}
                        {menuVisible && (
                            <div className="dropdown-menu" onMouseLeave={closeMenu}>
                            <ul>
                                <li onClick={handleReplyClicked} id="reply-123">Reply</li>
                                <li onClick={handleDeleteClicked} id='delete-123'>Delete</li>
                            </ul>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="message-reply-body">
                        <div className="reply-header">
                            <span className="reply-username">Name</span>
                        </div>
                        <div className="reply-body">
                            <div className='reply-preview-text'>Text being replied to</div>
                        </div>
                    </div>
                    <div className="message-text">
                        Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis
                        Praesent mollis congue libero. Vestibulum pulvinar
                    </div>
                    <div className="message-time">
                        <p>7:31 pm</p>
                    </div>
                </div>

                <div className="message not-my-message" id="123"> {/* Toggle btwn my text */}
                    <div className="message-header">
                        <div className="message-owner">John Does</div>
                        <div className="message-actions">
                        <img src={dropDownIconDark} alt="reply" className="message-reply-action" onClick={toggleMenu}/> {/* Toggle with blue */}
                        {menuVisible && (
                            <div className="dropdown-menu" onMouseLeave={closeMenu}>
                            <ul>
                                <li onClick={handleReplyClicked} id="reply-123">Reply</li>
                                <li onClick={handleDeleteClicked} id='delete-123'>Delete</li>
                            </ul>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="message-reply-body">
                        <div className="reply-header">
                            <span className="reply-username">Name</span>
                        </div>
                        <div className="reply-body">
                            <div className='reply-preview-text'>Text being replied to</div>
                        </div>
                    </div>
                    <div className="message-text">
                        Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis
                        Praesent mollis congue libero. Vestibulum pulvinar
                    </div>
                    <div className="message-time">
                        <p>7:31 pm</p>
                    </div>
                </div>

                <div className="message not-my-message" id="123"> {/* Toggle btwn my text */}
                    <div className="message-header">
                        <div className="message-owner">John Does</div>
                        <div className="message-actions">
                        <img src={dropDownIconDark} alt="reply" className="message-reply-action" onClick={toggleMenu}/> {/* Toggle with blue */}
                        {menuVisible && (
                            <div className="dropdown-menu" onMouseLeave={closeMenu}>
                            <ul>
                                <li onClick={handleReplyClicked} id="reply-123">Reply</li>
                                <li onClick={handleDeleteClicked} id='delete-123'>Delete</li>
                            </ul>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="message-reply-body">
                        <div className="reply-header">
                            <span className="reply-username">Name</span>
                        </div>
                        <div className="reply-body">
                            <div className='reply-preview-text'>Text being replied to</div>
                        </div>
                    </div>
                    <div className="message-text">
                        Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis
                        Praesent mollis congue libero. Vestibulum pulvinar
                    </div>
                    <div className="message-time">
                        <p>7:31 pm</p>
                    </div>
                </div>


                {/* My message */}
                <div className="message my-message"> {/* Toggle btwn my text */}
                    <div className="message-header">
                        <div className="message-owner">John Doe</div>
                        <div className="message-actions">
                        <img src={dropDownIconBlue} alt="reply" className="message-reply-action"/> {/* Toggle with blue */}
                        </div>
                    </div>
                    <div className="message-reply-body">
                        <div className="reply-header">
                            <span className="reply-username">Name</span>
                        </div>
                        <div className="reply-body">
                            <div className='reply-preview-text'>Text being replied to</div>
                        </div>
                    </div>
                    <div className="message-text">
                        Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis.
                        Praesent mollis congue libero. Vestibulum pulvinar
                    </div>
                    <div className="message-time">
                        <p className="message-time-text">7:31 pm</p>
                    </div>
                </div>

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
                {/* <MyMessage /> */}

            </div>

            <div className="chat-input">
                <div className="emoji-input-section">
                    <div className="emoji-picker-div">
                        {showPicker && (
                                <Picker
                                    perLine={20}
                                    data={data}
                                    onEmojiSelect={handleEmojiSelect}
                                    // onClickOutside={handleClickOutside}
                                    theme="dark"
                                    style={{
                                        width: "500px",
                                        border: "3px solid red"
                                    }}
                                />
                            )}
                    </div>

                    <div className='reply-preview-section'>
                        {/* Show text being replied to in the chat in this section */}
                        {/* <Reply /> */}
                        <div className="reply-preview">
                            <div className="reply-header">
                                <span className="reply-username">Name</span>
                                <span className="cancel-reply" onClick={handleCancelReplyPreview}>
                                    <img src={cancelIcon} alt="cancel" className='cancel-icon' />
                                </span>
                            </div>
                            <div className="reply-body">
                                <div className='reply-preview-text'>Text being replied to</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="message-input-section">
                        {showPicker && (
                            <div className="drop-emoji-picker">
                                <img src={cancelIcon} alt="cancel" className="picker-cancel-icon" onClick={dropEmojiPicker}/>
                            </div>
                        )}

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
                {/* <MessageInput /> */}
            </div>
        </div>
    )
    // setShowPicker(!showPicker)
}

export default Chat;
// -- obsolete
// Component holding messages content
import React, { useState } from "react";
import dropDownIconDark from "../assets/images/down-arrow-dark.png";
import dropDownIconBlue from "../assets/images/down-arrow.png";
import { useAuthContext } from "../context/AuthContext";
import useReplyPreview from "../z-store/useReplyPreview";
import { format } from 'date-fns';

function Message({ message }) {
  const { authUser }  = useAuthContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const [messageReplyingTo, setMessageReplyingTo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { setShowReplyPreview } = useReplyPreview();
  const { deleteMessage } = useDeleteMessage();

  // authUser = {
  //   _id: "123",
  // };

  const handleReplyClicked = (message) => {
      //   console.log(`Replying to message id: ${messageId}`);
    console.log(message);
    setMessageReplyingTo(message._id);
    setShowReplyPreview(true);
  }

  // const handleDeleteClicked = (event) => {
  //   const replyId = event.target.id;
  //   const messageId = replyId.split("-")[1];
  //   console.log(`Deleting message id: ${messageId}`);

  //   // Handle deleting message
  //   deleteMessage(messageId)
  // }

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

  return (
    <div className={`message ${message.sender._id === authUser._id ? "my-message" : "not-my-message"}`} id={message._id}>
      <div className="message-header">
        <div className="message-owner">{message.sender.username}</div>
        <div className="message-actions">
          
          <img alt="reply" className="message-reply-action" onClick={toggleMenu}
            src={
              message.sender._id === authUser._id
                ? dropDownIconBlue
                : dropDownIconDark
            }
          />

          {menuVisible && (
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
          )}
        </div>
      </div>

      {message.reply && (
        <div className="message-reply-body">
          <div className="reply-header">
            <span className="reply-username">{message.reply ? message.reply.username : 'reply username'}</span>
          </div>
          <div className="reply-body">
            <div className="reply-preview-text">{message.reply ? message.reply.text : 'reply text'}</div>
          </div>
        </div>
      )}
      <div className="message-text">{message.text}</div>
      <div className="message-time">
        <p>{format(new Date(message.createdAt), 'hh:mm a')}</p>
      </div>
    </div>
  );
}

export default Message;
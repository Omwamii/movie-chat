// reply preview component
import cancelIcon from '../assets/images/close.png';
import { React } from "react";

export default function ReplyPreview({ reply }) {
    const handleCancelReplyPreview = () => {
        const previewElement = document.getElementsByClassName('reply-preview')[0];
        previewElement.classList.remove('show-reply-preview');
        // previewElement.style.display = 'none';
    }

    return (
        <div className='reply-preview-section'>
            {/* Show text being replied to in the chat in this section */}
            {/* <Reply /> */}
            <div className="reply-preview">
                <div className="reply-header">
                    <span className="reply-username">{reply.username}</span>
                    <span className="cancel-reply" onClick={handleCancelReplyPreview}>
                        <img src={cancelIcon} alt="cancel" className='cancel-icon' />
                     </span>
                </div>
                <div className="reply-body">
                    <div className='reply-preview-text'>{reply.text}</div>
                </div>
            </div>
        </div>
    )
}
// Preview component to a message reply (what you see before pressing send on the chat)
import cancelIcon from '../assets/images/close.png';

function Reply() {
    return (
        <div className="reply-preview">
            <div className="reply-header">
                <span className="reply-username">Name</span>
                <span className="cancel-reply">
                    <img src={cancelIcon} alt="cancel" className='cancel-icon' />
                </span>
            </div>
            <div>
                <p>Text being replied to</p>
            </div>
        </div>
    )
}

export default Reply;
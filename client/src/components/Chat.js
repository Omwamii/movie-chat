// Displays the group chat messages
import menuIcon from '../assets/images/menu.png';
import MessageInput from './MessageInput';
import Message  from './Message';
import MyMessage from './MyMessage';

function Chat() {

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
                {/* Messages go here */}
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <MyMessage />

            </div>
            <div className="chat-input">
                <MessageInput />
            </div>
        </div>
    )
}

export default Chat;
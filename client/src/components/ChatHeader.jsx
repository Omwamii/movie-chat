// Header section for group movie chat
import menuIcon from "../assets/images/menu.png";
import { React } from "react";

export default function ChatHeader({ chat }) {
    return (
        <div className="chat-group-info">
            <div className="group-members-number">
                {chat.total_users} chat buddies, {chat.online_users} online
            </div>
            <div className="group-name">
                {chat.title}
            </div>
            <div className='group-menu'>
                <img src={menuIcon} alt="menu" className='group-menu-icon'/>
            </div>
        </div>
    )
}
// Header section for group movie chat
import menuIcon from "../assets/images/menu.png";
import { React } from "react";
import backArrow from "../assets/images/back-arrow.png";


export default function ChatHeader({ chat }) {
    const navElement = document.getElementsByClassName('nav')[0];
    const contentElement = document.getElementsByClassName('content')[0];

    const goBack = () => {
        if (contentElement.classList.contains('active')) {
            contentElement.classList.remove('active');
        }
        if (!navElement.classList.contains('active')) {
            navElement.classList.add('active');
        }
        // console.log(contentElement);
        //console.log(navElement);
    }

    return (
        <div className="chat-group-info">
            <div className="back-arrow-chat">
                <img src={backArrow} alt="back" className="back-arrow-icon" onClick={goBack}/>
            </div>
            <div className="group-members-number">
                {chat ? chat.users.length : '44'} chat buddies, {chat.online_users ? chat.online_users : '4'} online
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
import { useAuthContext } from "../context/AuthContext";
import chatIcon from "../assets/images/chat.png"

export default function NoChatSelected() {
    const { authUser } = useAuthContext();
    return (
        <div className="no-chat-selected">
            <div className="text">
                <h3>Hey { authUser ? authUser.username : ''} 👋</h3>
                <h4 style={{ marginTop: '10px'}}>Select a chat and get chatting 💬</h4>
            </div>
        </div>
    )
}
import { useAuthContext } from "../context/AuthContext";

export default function JoinChannelDefaultScreen() {
    const { authUser } = useAuthContext();

    return (
        <div className="no-chat-selected content">
            <div className="text">
                <h3>Hey { authUser ? authUser.username : ''} 👋</h3>
                <h4>Join a channel and start chatting 🫰</h4>
            </div>
        </div>
    )
}
import useChannels from "../z-store/useChannels";
import { toast } from "react-hot-toast";

export default function useSendMessage() {
    const { selectedChannel, setSelectedChannel } = useChannels();

    const sendMessage = async (message, replyingTo) => {
        try {
            console.log('sending message', message, replyingTo)
            const res = await fetch(`/api/messages/send/${selectedChannel._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    message,
                    replyId: replyingTo?._id,
                })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            setSelectedChannel(data)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return { sendMessage };
}
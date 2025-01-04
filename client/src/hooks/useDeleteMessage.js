import useChannels from "../z-store/useChannels";
import { toast } from "react-hot-toast";

export default function useDeleteMessage() {
    const { selectedChannel, deleteMessage: diliti } = useChannels();

    const deleteMessage = async (messageId) => {
        try {
            const res = await fetch(`/api/messages/delete/${messageId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
            })

            const deletedMessageId = await res.json();
            if (deletedMessageId.error) {
                throw new Error(deletedMessageId.error)
            }
            //setMessages(...messages, data)
            // setMessages(...messages, data)

            // selectedChannel.messages.push(data)
            // console.log(selectedChannel.messages.length)
            // const filteredChannel =  selectedChannel.messages.filter(message => message._id !== deletedMessageId)
            // selectedChannel.messages = filteredChannel
            // selectedChannel.messages = selectedChannel.messages.filter(message => message._id !== deletedMessageId)
            // selectedChannel.messages.pop();
            // Assuming selectedChannel is part of the state
            
            diliti(deletedMessageId)

            console.log(selectedChannel.messages.length)
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return { deleteMessage };
}
// get all movie channels that have been created
import { useState } from "react"
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);

    const getMessages = async (channelId, setMessages) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/messages/${channelId}`);
            const data = await response.json();
            // console.log('fetched all channels : ', data);
            if (data.error) {        
                throw new Error(data.error);
            }
            
            setMessages(data);
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, getMessages };
}

export default useGetMessages;
// get all movie channels that have been created
import { useState } from "react"
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSearchChannels = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();

    const search = async (query, flag, setChannels) => {
        setLoading(true);
        try {
            const response = await fetch('/api/channels/search', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query,
                    flag,
                    userId: authUser._id
                })
            });
            console.log(response)
            const data = await response.json();
            // console.log('fetched all channels : ', data);
            if (data.error) {        
                throw new Error(data.error);
            }

            console.log(`Searched channels ${flag}`, data)
            
            setChannels(data);
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, search };
}

export default useSearchChannels
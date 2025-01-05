import { useEffect } from "react"
import { toast } from "react-hot-toast";
import useCreatedChannels from "../z-store/useCreatedChannels";

const useGetCreatedChannels = () => {
    const { createdChannels, setCreatedChannels } = useCreatedChannels();

    useEffect(() => {
        const getCreatedChannels = async () => {
            try {
                const response = await fetch(`/api/channels/created`);
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                // console.log('created channels ids', data)
                setCreatedChannels(data)
                
              } catch (error) {
                toast.error(error.message)
                console.error('Failed to fetch created channels:', error);
            }
        }

        getCreatedChannels();
    }, [])

    return { createdChannels };
}

export default useGetCreatedChannels;
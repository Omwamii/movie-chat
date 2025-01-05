// get all movie channels that have been created
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

const useGetAllChannels = () => {
    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const getAllChannels = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/channels/all');

                const data = await response.json();
                // console.log('fetched all channels : ', data);

                if (data.error) {
                    throw new Error(data.error);
                }

                setChannels(data);

            } catch (error) {
                toast.error(error.message)
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getAllChannels();
    }, [])

    return { loading, channels };
}

export default useGetAllChannels
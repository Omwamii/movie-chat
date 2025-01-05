// get channels that user has joined

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

const useGetUserChannels = () => {
    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const getUserChannels = async () => {
            setLoading(true);
            try {
                // const userId = JSON.parse(localStorage.getItem('user'))._id
                // if (!userId) {
                //     throw new Error('Invalid User id');
                // }
                const response = await fetch('/api/channels/mine');

                const data = await response.json();
                // console.log('fetched user\'s channels : ', data);
                if (data.error) {
                    throw new Error(data.error);
                }

                setChannels(data);

            } catch (error) {
                // toast the error
                toast.error(error.message)
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getUserChannels();
    }, [])

    return { loading, channels }
}

export default useGetUserChannels;
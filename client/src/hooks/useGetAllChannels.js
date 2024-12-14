// get all movie channels that have been created
import { useEffect, useState } from "react"

export default useGetAllChannels = () => {
    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const getAllChannels = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:5000/api/channels/all');

                const data = await response.json();
                console.log('fetched channels : ', data);
                if (data.error) {
                    throw new Error(data.error);
                }

                setChannels(data);

            } catch (error) {
                // toast the error
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getAllChannels();
    }, [])

    return { loading, channels };
}
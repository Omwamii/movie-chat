import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import useJoinedChannels from "../z-store/useJoinedChannels";
import { useAuthContext } from "../context/AuthContext";

const useGetJoinedChannels = () => {
    const { authUser: user } = useAuthContext(); // Assuming `user` contains authenticated user info
    const { joinedChannels, setjoinedChannels } = useJoinedChannels();

    useEffect(() => {
        const getJoinedChannels = async () => {
            try {
                const response = await fetch(`/api/channels/joined`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({userId: user._id})
                    
                });
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setjoinedChannels(data)
                
              } catch (error) {
                toast.error(error.message)
                console.error('Failed to fetch joined channels:', error);
            }
        }

        getJoinedChannels();
    }, [])

    return { joinedChannels };
}

export default useGetJoinedChannels;
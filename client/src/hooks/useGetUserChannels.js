// get channels that user has joined

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetUserChannels = () => {
  const [loading, setLoading] = useState(false);

  const getUserChannels = async (setChannels) => {
    console.log('Getting user channels')
    setLoading(true);
    try {
      const response = await fetch("/api/channels/mine");

      const data = await response.json();
      // console.log('fetched user\'s channels : ', data);
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("GOT", data);

      setChannels(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUserChannels };
};

export default useGetUserChannels;

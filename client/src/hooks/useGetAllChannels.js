// get all movie channels that have been created
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetAllChannels = () => {
  const [loading, setLoading] = useState(false);

  const getAllChannels = async (setChannels) => {
    console.log('getting all channels')
    setLoading(true);
    try {
      const response = await fetch("/api/channels/all");

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("all channels get", data);
      setChannels(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getAllChannels };
};

export default useGetAllChannels;

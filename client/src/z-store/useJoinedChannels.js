import { create } from 'zustand';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const useJoinedChannels = create((set) => ({
    joinedChannels: [],
    setjoinedChannels: (joinedChannels) => set({joinedChannels}),
    addJoinedChannel: (newChannel) => {
        const prevChannels = get().joinedChannels;
        set({ joinedChannels: [...prevChannels, newChannel] });
      },
}))  

export default useJoinedChannels;
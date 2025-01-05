import { create } from 'zustand';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const useCreatedChannels = create((set, get) => ({
    createdChannels: [],
    setCreatedChannels: (createdChannels) => set({createdChannels}),
    addCreatedChannel: (newChannel) => {
        const prevChannels = get().createdChannels;
        set({ createdChannels: [...prevChannels, newChannel] });
      },
}))  

export default useCreatedChannels;
import { create } from 'zustand';

const useChannels = create((set) => ({
    selectedChannel: null,
    setSelectedChannel: (selectedChannel) => set({selectedChannel}),
    messages:[],
    setMessages: (messages) => set({messages}),
}))

export default useChannels;
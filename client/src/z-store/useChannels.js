import { create } from 'zustand';

const useChannels = create((set) => ({
    selectedChannel: null,
    setSelectedChannel: (selectedChannel) => set({selectedChannel}),

    // messages:[],
    // setMessages: (messages) => set({messages}),

    deleteMessage: (deletedMessageId) => set((state) => ({
        messages: state.selectedChannel.messages.filter((message) => message._id !== deletedMessageId),
    })),

}))

export default useChannels;
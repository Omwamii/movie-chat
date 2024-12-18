import { create } from 'zustand';

const useReplyPreview = create((set) => ({
    showReplyPreview: false,
    setShowReplyPreview: (showReplyPreview) => set({showReplyPreview}),
    reply: null,
    setReply: (reply) => set({reply}),
}))

export default useReplyPreview;
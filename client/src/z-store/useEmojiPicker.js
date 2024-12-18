import { create } from 'zustand';

const useEmojiPicker = create((set) => ({
    showEmojiPicker: false,
    setShowEmojiPicker: (showEmojiPicker) => set({showEmojiPicker}),
}))

export default useEmojiPicker;
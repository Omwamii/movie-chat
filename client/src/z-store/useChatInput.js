import { create } from 'zustand';

const useChatInput = create((set) => ({
    inputValue: "",
    setInputValue: (inputValue) => set({inputValue}),
}))

export default useChatInput
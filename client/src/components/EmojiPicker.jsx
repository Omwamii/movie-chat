// emoji picker component (for input)
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useChatInput from "../z-store/useChatInput";
import useEmojiPicker from "../z-store/useEmojiPicker";

export default function EmojiPicker () {
    const { setInputValue } = useChatInput();
    const { showEmojiPicker } = useEmojiPicker();

    const handleEmojiSelect = (emoji) => {
        setInputValue((prev) => prev + emoji.native); // Append emoji to input value
    };

    const handleClickedOutside = () => {
        // hide the picker on clicking outside
        console.log('clicked outside the picker');
    }

    return (
        <div className="emoji-picker-div">
            {showEmojiPicker && (
                <Picker
                    perLine={20}
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    onClickOutside={handleClickedOutside}
                    theme="dark"
                    style={{
                        width: "500px",
                        border: "3px solid red"
                    }}
                />
            )}
        </div>
    )
}
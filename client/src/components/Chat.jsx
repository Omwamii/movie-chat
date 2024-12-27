// Displays the group chat messages
import MessageInput from './MessageInput';
import Message  from './Message';
import ReplyPreview from "./ReplyPreview";
import EmojiPicker from "@emoji-mart/react";
import ChatHeader from "./ChatHeader";
import useReplyPreview from "../z-store/useReplyPreview";
import { React } from "react";
import useEmojiPicker from '../z-store/useEmojiPicker';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useChatInput from "../z-store/useChatInput";

function Chat({ chat }) {
    // const { reply } = useReplyPreview();
    const { showEmojiPicker } = useEmojiPicker();
    const { setInputValue, inputValue } = useChatInput();

    const reply = {
        username: 'Iano',
        text: 'Hi hi, reply to this'
    }

    const handleEmojiSelect = (emoji) => {
        const updatedInput = inputValue + emoji.native;
        setInputValue(updatedInput);
    };

    const handleClickedOutside = (event) => {
        console.log(event);
        // hide the picker on clicking outside
        console.log('clicked outside the picker');
    }

    const myMessage = {
        _id: '991',
        username: 'John Doe',
        text: `Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis.
        Praesent mollis congue libero. Vestibulum pulvinar`,
        time: '7:31 pm',
        user_id: '1234',
        reply: {
            _id: '983',
            username: 'Jane doe',
            text: 'JLDSJDW DPWIPEW D[OW sdpekdpwe pksw',
            time: '7:20 pm',
            user_id: '2040',
            reply: {}
        }
    }

    const message = {
        _id: '998',
        username: 'Ian Alpha',
        text: `Fusce a mattis metus. Aenean rhoncus nunc vitae imperdiet mollis.
        Praesent mollis congue libero. Vestibulum pulvinar`,
        time: '7:39 pm',
        user_id: '1111',
        reply: {}
    }

    return (
        <div className="chat">
            <ChatHeader chat={chat}/>
            <div className="chat-canvas">
                <Message message={message} />
                <Message message={myMessage} />
            </div>
            <div className="chat-input">
                <div className="emoji-input-section">
                    {/* <EmojiPicker /> */}
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

                    <ReplyPreview reply={reply} />
                    <MessageInput />
                </div>
            </div>
        </div>
    )
}

export default Chat;
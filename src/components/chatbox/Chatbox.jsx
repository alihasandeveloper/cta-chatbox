import {useState} from 'react';
import {FiMessageCircle} from 'react-icons/fi';
import ChatWindow from './ChatWindow.jsx';
import {MdOutlineClose} from "react-icons/md";

const Chatbox = () => {
    const [showChat, setShowChat] = useState(false);

    const showChatWindow  = () => {
        setShowChat(value => !value);
    };

    return (
        <div>
            <div className={showChat ? 'block' : 'hidden'}>
                <ChatWindow/>
            </div>
            <button
                className="h-12 w-12 bg-black flex items-center justify-center rounded-full cursor-pointer fixed bottom-4 right-4 text-[20px] text-white"
                onClick={showChatWindow}
            >
                {
                    showChat ? <MdOutlineClose />
                        : <FiMessageCircle />
                }
            </button>
        </div>
    );
};

export default Chatbox;

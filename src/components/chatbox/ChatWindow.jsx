import React, {useEffect, useState} from 'react';
import ChatHistory from './ChatHistory.jsx';
import { IoIosSend } from 'react-icons/io';

const ChatWindow = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');

    useEffect(() => {
        fetch('http://development.local/wp-json/wai/v2/agent-chat')
            .then(res => res.json())
            .then(json => setReply(json))
            .catch(err => console.error("Error fetching data:", err));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, {
            text: input,
            type: 'user',
            time: new Date()
        }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        setTimeout(() => {
            setMessages([...newMessages, {
                text: reply,
                type: 'admin',
                time: new Date()
            }]);
            setLoading(false);
        }, 2000);
    };


    return (
        <div>
            <div className="rounded-lg h-[500px] w-[350px] shadow-xl border border-gray-100 fixed bottom-20 right-4 overflow-hidden flex flex-col justify-between">
                <div>
                    <h1 className="text-white bg-black py-2 text-xl text-center border-b border-gray-400">
                        Live Chat
                    </h1>
                </div>
                <div className="flex-1 overflow-y-auto message-body">
                    <ChatHistory messages={messages} loading={loading} />
                </div>
                <div className="flex p-4 border-t border-gray-200">
                    <form
                        className="flex w-full gap-2 h-full max-h-[50px]"
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            className="border border-black w-3/4 p-2 rounded resize-none"
                            placeholder="Type your message..."
                            required
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-1/4 cursor-pointer bg-black text-white rounded flex items-center justify-center"
                        >
                            <IoIosSend size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;

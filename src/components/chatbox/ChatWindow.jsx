import React, {useEffect, useState, useRef} from 'react';
import ChatHistory from './ChatHistory.jsx';
import ChatboxForm from "./ChatboxForm.jsx";

const ChatWindow = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    // Fetch the initial reply from the backend
    useEffect(() => {
        fetch('http://development.local/wp-json/wai/v2/agent-chat')
            .then(res => res.json())
            .then(json => setReply(json))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    // Set the initial message only once
    useEffect(() => {
        const firstMessage = {
            text: 'I am an AI agent. I am specialized in "bla bla". How can I help you?',
            type: 'admin',
            time: new Date(),
            file: '',
        };
        setMessages([firstMessage]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, {
            text: input,
            type: 'user',
            time: new Date(),
            file: image
        }];
        setMessages(newMessages);
        setInput('');
        setImage(null);
        setLoading(true);

        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }

        setTimeout(() => {
            setMessages([...newMessages, {
                text: reply,
                type: 'admin',
                time: new Date(),
                file: ''
            }]);
            setLoading(false);
        }, 2000);

    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!allowedTypes.includes(file.type)) {
            alert("Only JPG, JPEG, PNG, and WEBP files are allowed.");
            return;
        }

        if (file.size > maxSize) {
            alert("File size must be 2MB or less.");
            return;
        }

        setImage(file);
    };


    console.log(image)

    return (
        <div>
            <div
                className="rounded-3xl h-[500px] w-[350px] shadow-xl border border-gray-100 fixed bottom-20 right-4 overflow-hidden flex flex-col justify-between">
                <div>
                    <h1 className="text-white bg-black py-2 text-xl text-center border-b border-gray-400">
                        Live Chat
                    </h1>
                </div>
                <div className="flex-1 overflow-y-auto message-body">
                    <ChatHistory messages={messages} loading={loading}/>
                </div>
                <div>
                    <ChatboxForm input={input} setInput={setInput} handleSubmit={handleSubmit} handleImage={handleImage}
                                 image={image} fileInputRef={fileInputRef}/>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;

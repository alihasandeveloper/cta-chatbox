import {useEffect, useRef} from 'react';

const ChatHistory = ({messages, loading}) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages, loading]);

    return (
        <div className="p-4 space-y-3 h-full overflow-y-auto bg-white">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`relative px-4 py-3 rounded-2xl text-sm max-w-[80%] transition-all duration-200 break-words whitespace-pre-wrap ${
                            msg.type === 'user' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white'
                        }`}
                    >
                        <p>{msg.text}</p>

                        {msg.file && (
                            <img
                                src={URL.createObjectURL(msg.file)}
                                alt={msg.text}
                                className="mt-2 w-32 h-24 object-cover rounded-xl"
                            />
                        )}

                        <span
                            className={`block mt-1 text-xs text-gray-400 ${
                                msg.type === 'user' ? 'text-right' : 'text-left'
                            }`}
                        >
                {new Date(msg.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    date: '2-digit',
                })}
            </span>
                    </div>
                </div>
            ))}


            {loading && (
                <div className="flex justify-start">
                    <div
                        className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-500 italic animate-pulse shadow-sm max-w-[60%]">
                        Typing...
                    </div>
                </div>
            )}

            <div ref={bottomRef}/>
        </div>
    );
};

export default ChatHistory;
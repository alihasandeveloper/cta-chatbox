import { useEffect, useRef } from 'react';

const ChatHistory = ({ messages, loading }) => {
    const bottomRef = useRef(null);
    console.log(messages);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, loading]);

    return (
        <div className="max-w-md mx-auto p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
                <div>
                    {messages.length <= 0 && (
                        <p className="text-gray-700 font-bold text-[24px] leading-[28px] bg-gray-200 rounded-lg p-4">
                            I am an AI agent, I am specialized in <span className="italic text-black">"bla bla"</span>. How can I help you?
                        </p>
                    )}
                </div>
                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`p-2 rounded-md max-w-xs ${
                            msg.type === 'user'
                                ? 'text-right'
                                : 'text-left ml-auto'
                        }`}
                    >
                        <p
                            className={`inline-block px-4 py-2 rounded-xl text-sm ${
                                msg.type === 'user'
                                    ? 'bg-gray-200'
                                    : 'bg-black text-white '
                            }`}
                        >
                            {msg.text }
                        </p>
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(msg.time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="text-left ml-auto max-w-xs">
                        <p className="inline-block px-4 py-2 rounded-xl bg-gray-200 text-gray-500 italic animate-pulse">
                            Waiting...
                        </p>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default ChatHistory;

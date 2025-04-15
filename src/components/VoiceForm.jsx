import React, { useState, useEffect } from "react";

const VoiceForm = () => {
    const [inputText, setInputText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (!recognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText((prev) => prev + " " + transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }, [recognition]);

    const handleVoiceInput = () => {
        if (isListening) {
            recognition.stop();
        } else {
            setIsListening(true);
            recognition.start();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", inputText);
        alert("Form submitted with: " + inputText);
        setInputText("");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="text-lg font-medium">Say something or type:</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 border px-3 py-2 rounded"
                        placeholder="Type or speak here..."
                    />
                    <button
                        type="button"
                        onClick={handleVoiceInput}
                        className={`p-2 rounded-full ${
                            isListening ? "bg-red-400" : "bg-green-400"
                        }`}
                    >
                        🎤
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default VoiceForm;

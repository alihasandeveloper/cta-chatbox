import React from 'react'
import Chatbox from "./components/chatbox/Chatbox.jsx";
import VoiceForm from "./components/VoiceForm.jsx";
const App = () => {
    return (
        <div className="relative">
            <div className="">
                <Chatbox />
                <VoiceForm />
            </div>
        </div>
    );
};

export default App;

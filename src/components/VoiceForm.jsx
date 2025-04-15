import React, { useState, useRef } from "react";

const VoiceForm = () => {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    console.log(audioURL);

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-center">🎤 Voice Recorder Form</h2>

            <div className="text-center">
                {!recording ? (
                    <button
                        onClick={startRecording}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Start Recording
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Stop Recording
                    </button>
                )}
            </div>

            {audioURL && (
                <div className="mt-4">
                    <h4 className="text-md font-medium">Playback:</h4>
                    <audio controls src={audioURL} className="w-full mt-2" />
                </div>
            )}
        </div>
    );
};

export default VoiceForm;

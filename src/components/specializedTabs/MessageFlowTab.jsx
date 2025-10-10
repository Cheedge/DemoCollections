import React, { useState, useEffect } from 'react';

const MessageFlowTab = () => {
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        setMessages([
            ...messages,
            { id: Date.now(), text: `Message ${messages.length + 1}` },
        ]);
    };

    return (
        <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Message Flow Simulation
            </h3>
            <button
                onClick={sendMessage}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded mb-4"
            >
                Send Message
            </button>
            <div className="space-y-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-orange-50 rounded p-3 border border-orange-300 animate-pulse"
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageFlowTab;

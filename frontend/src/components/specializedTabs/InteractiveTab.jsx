import React, { useState, useEffect } from 'react';
import LoginInteractiveDemo from './InteractiveDemos/LoginInteractiveDemo';
import GenericInteractiveDemo from './InteractiveDemos/GenericInteractiveDemo';
import EventSourcingDemo from './InteractiveDemos/EventSourcingDemo';
// import MessageFlowTab from './InteractiveDemos/MessageFlowTab';

const InteractiveTab = ({ demoId, demoPath }) => {
    if (demoId === 'oauth' || demoId === 'jwt' || demoId === 'sso') {
        return <LoginInteractiveDemo demoId={demoId} demoPath={demoPath} />;
    }
    if (demoId === 'event-sourcing') {
        return <EventSourcingDemo />;
    }
    if (demoId === 'kafka' || demoId === 'rabbitmq') {
        return <MessageQueueDemo type={demoId} />;
    }
    return <GenericInteractiveDemo />;
};

// Message Queue Demo Tab
const MessageQueueDemo = ({ type }) => {
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        setMessages([
            ...messages,
            { id: Date.now(), text: 'New message', status: 'sent' },
        ]);
    };

    return (
        <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {type === 'kafka' ? 'Kafka' : 'RabbitMQ'} Message Flow
            </h3>
            <button
                onClick={sendMessage}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition mb-4"
            >
                Send Message
            </button>
            <div className="space-y-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-orange-50 rounded p-3 border border-orange-300"
                    >
                        <span className="text-gray-700">{msg.text}</span>
                        <span className="text-green-700 text-sm ml-4">
                            ✓ {msg.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteractiveTab;

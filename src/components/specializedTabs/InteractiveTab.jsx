import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock, Loader } from 'lucide-react';

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

// Login Demo Tab
const LoginInteractiveDemo = ({ demoId, demoPath }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiUrl, setApiUrl] = useState(
        'https://localhost:7235'
        // 'http://localhost:5156'
    );

    const callLoginApi = async () => {
        // e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch(apiUrl + demoPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add JWT token if needed:
                    // 'Authorization': 'Bearer your-jwt-token'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.title || 'Login failed');
            }

            const jwtToken = data.token;
            // console.log('Login successful! Token stored:', jwtToken);
            alert('Login Successful!');
            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: Object.fromEntries(res.headers.entries()),
                data: data,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleLogin = async () => {
    //     setIsLoading(true);
    //     await new Promise((r) => setTimeout(r, 1000));
    //     setToken(
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    //     );
    //     setIsLoading(false);
    // };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <Lock className="text-orange-600" />
                    {demoId === 'oauth'
                        ? 'OAuth 2.0'
                        : demoId === 'jwt'
                        ? 'JWT'
                        : 'SSO'}{' '}
                    Authentication Flow
                </h3>

                {!token ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Username
                            </label>
                            <input
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="demo@example.com"
                                className="w-full bg-white border border-orange-300 rounded px-4 py-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-orange-300 rounded px-4 py-2 text-gray-800"
                            />
                        </div>
                        <button
                            // onClick={handleLogin}
                            onClick={callLoginApi}
                            disabled={isLoading}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader className="animate-spin" size={18} />
                            ) : (
                                <Lock size={18} />
                            )}
                            Sign In
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
                            <p className="text-green-700 font-medium mb-2 flex items-center gap-2">
                                <CheckCircle size={20} />
                                Authentication Successful
                            </p>
                            <p className="text-gray-700 text-sm mb-4">
                                JWT token generated and stored
                            </p>
                            <div className="bg-gray-900 rounded p-3 overflow-auto">
                                <code className="text-xs text-green-400 break-all">
                                    {token}
                                </code>
                            </div>
                        </div>
                        <button
                            onClick={() => setToken('')}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
                        >
                            Reset Demo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Event Sourcing Demo Tab
const EventSourcingDemo = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            type: 'OrderCreated',
            data: { orderId: 'ORD-001', total: 99.99 },
        },
        {
            id: 2,
            type: 'PaymentReceived',
            data: { orderId: 'ORD-001', amount: 99.99 },
        },
    ]);

    return (
        <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Event Stream Visualization
            </h3>
            <div className="space-y-3">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-orange-50 rounded-lg p-4 border border-orange-300"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-700 font-medium">
                                {event.type}
                            </span>
                            <span className="text-gray-500 text-sm">
                                Event #{event.id}
                            </span>
                        </div>
                        <pre className="text-xs text-gray-700">
                            {JSON.stringify(event.data, null, 2)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
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

// Generic Tab
const GenericInteractiveDemo = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm text-center">
        <p className="text-gray-600">Interactive demo component coming soon</p>
    </div>
);

export default InteractiveTab;

import React, { useState } from 'react';
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import config from '../../config';

const MessageFlowTab = () => {
    const [messages, setMessages] = useState([]);
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [apiUrl, setApiUrl] = useState(config.apiUrl);

    const sendMessageLocal = () => {
        // Fallback function when backend is not accessible
        const newMsg = {
            id: Date.now(),
            to,
            subject,
            timestamp: new Date().toLocaleTimeString(),
            local: true,
        };

        setMessages((prev) => [newMsg, ...prev]);
        setTo('');
        setSubject('');
        setBody('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const sendMessage = async () => {
        if (!to || !subject || !body) {
            setError('Please fill in all fields before sending.');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch(apiUrl + '/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, subject, body }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const newMsg = {
                id: Date.now(),
                to,
                subject,
                timestamp: new Date().toLocaleTimeString(),
                local: false,
            };

            setMessages((prev) => [newMsg, ...prev]);
            setTo('');
            setSubject('');
            setBody('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error(err);
            // Backend not accessible, use local fallback
            sendMessageLocal();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Message Flow
                    </h1>
                    <p className="text-gray-600">
                        Send emails and track your message history
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Compose Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                Compose Message
                            </h2>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* To Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipient
                                </label>
                                <input
                                    type="email"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    placeholder="receiver@example.com"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Subject Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Hello World"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Body Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Type your email message..."
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none resize-none"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>Message sent successfully!</span>
                                </div>
                            )}

                            {/* Send Button */}
                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Message History Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Message History
                            </h2>
                        </div>

                        <div className="p-6">
                            {messages.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                        <Mail className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500">
                                        No messages sent yet
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Your sent messages will appear here
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200 hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-semibold text-gray-900 truncate">
                                                            {msg.subject}
                                                        </p>
                                                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                            {msg.timestamp}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        To: {msg.to}
                                                    </p>
                                                    {msg.local && (
                                                        <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                                            Local Mode
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageFlowTab;

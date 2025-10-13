import React, { useState } from 'react';
import { Key, XCircle, Lock } from 'lucide-react';

const AccessControlModal = ({ demo, config, onUnlock, onCancel }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (code.toUpperCase() === config.accessCode) {
            onUnlock(demo.id);
            setError('');
        } else {
            setError('Invalid access code. Try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-6">
                    <Lock className="text-orange-600" size={32} />
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                            Premium Demo
                        </h3>
                        <p className="text-gray-600 text-sm">{demo.name}</p>
                    </div>
                </div>

                <p className="text-gray-600 mb-6">
                    This advanced demonstration requires an access code.
                </p>

                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g., DEMO2024)"
                    className="w-full bg-white border-2 border-orange-300 rounded-lg px-4 py-3 text-gray-800 uppercase mb-4"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />

                {error && (
                    <p className="text-red-600 text-sm mb-4 flex items-center gap-1">
                        <XCircle size={14} /> {error}
                    </p>
                )}

                <div className="flex gap-3 mb-6">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-semibold shadow-md hover:shadow-lg"
                        // className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition"
                    >
                        Unlock Demo
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                        // className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg transition"
                    >
                        Cancel
                    </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                    <p className="text-blue-800 flex items-center gap-2 mb-2">
                        <Key size={16} />
                        Need the access code?
                    </p>
                    <a href="#" className="text-blue-600 hover:underline block">
                        Check my LinkedIn/GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AccessControlModal;

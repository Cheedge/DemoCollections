import React, { useState, useEffect } from 'react';
import { Code, Briefcase, Lock } from 'lucide-react';

const Case01 = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
        <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-orange-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-800">Case Study 01</h3>
        </div>
        <p className="text-gray-600 mb-4">
            This is a detailed case study showcasing a real-world
            implementation. Explore the architecture, challenges, and solutions.
        </p>
        <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Premium
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Backend
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Scalable
            </span>
        </div>
    </div>
);

const CasesAccessModal = ({ onUnlock, onCancel }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (code === 'DEMO2024') {
            onUnlock();
        } else {
            setError('Invalid access code');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-6">
                    <Lock className="text-orange-600" size={32} />
                    <h3 className="text-2xl font-bold text-gray-800">
                        Access Required
                    </h3>
                </div>
                <p className="text-gray-600 mb-6">
                    Enter the temporary access code to view case studies
                </p>
                <div>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            setError('');
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter access code"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-2 focus:border-orange-500 focus:outline-none transition"
                    />
                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-semibold shadow-md hover:shadow-lg"
                        >
                            Unlock
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                    Hint: Try "DEMO2024"
                </p>
            </div>
        </div>
    );
};

const CasesSection = () => {
    const [isUnlocked, setIsUnlocked] = useState(() => {
        const saved = sessionStorage.getItem('casesUnlocked');
        return saved === 'true';
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('casesUnlocked', isUnlocked);
    }, [isUnlocked]);

    const handleUnlock = () => {
        setIsUnlocked(true);
        setShowModal(false);
    };

    if (!isUnlocked) {
        return (
            <>
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-orange-200">
                            <Lock
                                className="text-orange-600 mx-auto mb-6"
                                size={64}
                            />
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                Case Studies Locked
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                This section contains premium case studies.
                                Enter the access code to view.
                            </p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-semibold shadow-md hover:shadow-lg"
                            >
                                Enter Access Code
                            </button>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <CasesAccessModal
                        onUnlock={handleUnlock}
                        onCancel={() => setShowModal(false)}
                    />
                )}
            </>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                    Case Studies
                </h1>
                <p className="text-xl text-gray-600">
                    Real-world implementations and success stories
                </p>
            </div>

            <div className="grid gap-8 max-w-4xl mx-auto">
                <Case01 />
            </div>
        </div>
    );
};

export default CasesSection;

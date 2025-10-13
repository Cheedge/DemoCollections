import React, { useState, useEffect } from 'react';
import { Code, Briefcase, SquareCode } from 'lucide-react';
import demoConfig from './components/DemoConfig';
import LandingPage from './components/LandingPage';
import DemoDetailPage from './components/DemoDetailPage';
import AccessControlModal from './components/AccessControlModal';
import CasesSection from './components/CaseSections/CaseSection';

// const App = () => {
//     const [currentView, setCurrentView] = useState('home');
//     const [selectedDemo, setSelectedDemo] = useState(null);
//     const [showAccessModal, setShowAccessModal] = useState(false);
//     const [unlockedDemos, setUnlockedDemos] = useState(() => {
//         const saved = localStorage.getItem('unlockedDemos');
//         return saved ? new Set(JSON.parse(saved)) : new Set();
//     });

//     useEffect(() => {
//         localStorage.setItem(
//             'unlockedDemos',
//             JSON.stringify([...unlockedDemos])
//         );
//     }, [unlockedDemos]);

//     const getDemoConfig = (demoId) => demoConfig[demoId] || demoConfig.default;

//     const handleDemoSelect = (demo) => {
//         const config = getDemoConfig(demo.id);
//         if (config.access === 'premium' && !unlockedDemos.has(demo.id)) {
//             setSelectedDemo(demo);
//             setShowAccessModal(true);
//         } else {
//             setSelectedDemo(demo);
//             setCurrentView('demo');
//         }
//     };

//     const handleUnlock = (demoId) => {
//         setUnlockedDemos((prev) => new Set([...prev, demoId]));
//         setShowAccessModal(false);
//         setCurrentView('demo');
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
//             <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50 shadow-sm">
//                 <div className="container mx-auto px-6 py-4">
//                     <div
//                         className="flex items-center gap-3 cursor-pointer"
//                         onClick={() => setCurrentView('home')}
//                     >
//                         <Code className="text-orange-600" size={28} />
//                         <span className="text-xl font-bold text-gray-800">
//                             Backend Portfolio
//                         </span>
//                     </div>
//                 </div>
//             </nav>

//             {currentView === 'home' && (
//                 <LandingPage
//                     onSelectDemo={handleDemoSelect}
//                     getDemoConfig={getDemoConfig}
//                     unlockedDemos={unlockedDemos}
//                 />
//             )}

//             {currentView === 'demo' && selectedDemo && (
//                 <DemoDetailPage
//                     demo={selectedDemo}
//                     onBack={() => setCurrentView('home')}
//                     getDemoConfig={getDemoConfig}
//                 />
//             )}

//             {showAccessModal && selectedDemo && (
//                 <AccessControlModal
//                     demo={selectedDemo}
//                     config={getDemoConfig(selectedDemo.id)}
//                     onUnlock={handleUnlock}
//                     onCancel={() => setShowAccessModal(false)}
//                 />
//             )}
//         </div>
//     );
// };

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [selectedDemo, setSelectedDemo] = useState(null);
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [unlockedDemos, setUnlockedDemos] = useState(() => {
        const saved = sessionStorage.getItem('unlockedDemos');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    useEffect(() => {
        sessionStorage.setItem(
            'unlockedDemos',
            JSON.stringify([...unlockedDemos])
        );
    }, [unlockedDemos]);

    const getDemoConfig = (demoId) => demoConfig[demoId] || demoConfig.default;

    const handleDemoSelect = (demo) => {
        const config = getDemoConfig(demo.id);
        if (config.access === 'premium' && !unlockedDemos.has(demo.id)) {
            setSelectedDemo(demo);
            setShowAccessModal(true);
        } else {
            setSelectedDemo(demo);
            setCurrentView('demo');
        }
    };

    const handleUnlock = (demoId) => {
        setUnlockedDemos((prev) => new Set([...prev, demoId]));
        setShowAccessModal(false);
        setCurrentView('demo');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <nav className="bg-white/90 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                            onClick={() => setCurrentView('home')}
                        >
                            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-2 rounded-lg shadow-md">
                                <SquareCode className="text-white" size={28} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                Backend Portfolio
                            </span>
                        </div>

                        <button
                            onClick={() => setCurrentView('cases')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <Briefcase size={20} />
                            Freelancer Cases
                        </button>
                    </div>
                </div>
            </nav>

            {currentView === 'home' && (
                <LandingPage
                    onSelectDemo={handleDemoSelect}
                    getDemoConfig={getDemoConfig}
                    unlockedDemos={unlockedDemos}
                />
            )}

            {currentView === 'demo' && selectedDemo && (
                <DemoDetailPage
                    demo={selectedDemo}
                    onBack={() => setCurrentView('home')}
                    getDemoConfig={getDemoConfig}
                />
            )}

            {currentView === 'cases' && <CasesSection />}

            {showAccessModal && selectedDemo && (
                <AccessControlModal
                    demo={selectedDemo}
                    config={getDemoConfig(selectedDemo.id)}
                    onUnlock={handleUnlock}
                    onCancel={() => setShowAccessModal(false)}
                />
            )}
        </div>
    );
};

export default App;

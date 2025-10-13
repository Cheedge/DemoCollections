import {
    Play,
    BookOpen,
    Terminal,
    MessageSquare,
    Shield,
    Activity,
    SquarePlay,
} from 'lucide-react';

const getTabDefinitions = () => ({
    playground: { id: 'playground', label: 'API Playground', icon: Play },
    architecture: { id: 'architecture', label: 'Architecture', icon: BookOpen },
    code: { id: 'code', label: 'Code', icon: Terminal },
    interactive: {
        id: 'interactive',
        label: 'Interactive Demo',
        icon: SquarePlay,
    },
    visualization: {
        id: 'visualization',
        label: 'Live Visualization',
        icon: Activity,
    },
    comparison: {
        id: 'comparison',
        label: 'Security Comparison',
        icon: Shield,
    },
    flow: { id: 'flow', label: 'Message Flow', icon: MessageSquare },
    performance: { id: 'performance', label: 'Performance', icon: Activity },
    pattern: { id: 'pattern', label: 'Pattern', icon: Activity },
});

export default getTabDefinitions;

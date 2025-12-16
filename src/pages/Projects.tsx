import { ProjectGrid } from '../components/ProjectGrid';
import { Terminal } from 'lucide-react';

export const Projects = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <Terminal className="w-8 h-8 text-neon-cyan" />
                <h1 className="text-3xl font-orbitron font-bold text-white tracking-wider">
                    SYSTEM_ARCHIVES <span className="text-neon-cyan text-sm align-top">_ALL</span>
                </h1>
            </div>

            <ProjectGrid />
        </div>
    );
};

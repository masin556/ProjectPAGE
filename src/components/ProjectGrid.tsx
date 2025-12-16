import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../utils/projectLoader';
import type { Project } from '../utils/projectLoader';
import { ProjectModal } from './ProjectModal';
import clsx from 'clsx';
import { resolvePath } from '../utils/imagePath';

interface ProjectGridProps {
    projects?: Project[]; // Optional: if not provided, uses all from json
    viewMode?: 'modal' | 'navigation'; // Default to 'modal'
}

export const ProjectGrid = ({ projects: initialProjects, viewMode = 'modal' }: ProjectGridProps) => {
    const navigate = useNavigate();
    const projectsData = getProjects();
    const sourceData = initialProjects || projectsData;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Get unique years from the *current* data source
    const years = Array.from(new Set(sourceData.map(p => p.date.split('.')[0]))).sort().reverse();
    const [activeYear, setActiveYear] = useState<string>('ALL');

    const filteredProjects = activeYear === 'ALL'
        ? sourceData
        : sourceData.filter(p => p.date.startsWith(activeYear));

    const handleProjectClick = (project: Project) => {
        if (viewMode === 'navigation') {
            navigate(`/project/${project.id}`);
        } else {
            setSelectedProject(project);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h3 className="text-neon-cyan font-mono text-sm tracking-widest flex items-center gap-2">
                    <Filter className="w-4 h-4" /> QUERY_FILTER
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveYear('ALL')}
                        className={clsx(
                            "px-3 py-1 text-xs font-mono rounded transition-all",
                            activeYear === 'ALL'
                                ? "bg-neon-cyan text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                : "text-gray-400 hover:text-white bg-white/5"
                        )}
                    >
                        ALL
                    </button>
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={clsx(
                                "px-3 py-1 text-xs font-mono rounded transition-all",
                                activeYear === year
                                    ? "bg-neon-cyan text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                    : "text-gray-400 hover:text-white bg-white/5"
                            )}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                            className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-white/10 hover:border-neon-cyan/50 cursor-pointer transition-colors"
                        >
                            {/* Thumbnail Image */}
                            <img
                                src={resolvePath(project.thumbnail)}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-neon-cyan font-mono text-xs">{project.category}</span>
                                    <span className="text-gray-400 font-mono text-[10px]">{project.date}</span>
                                </div>
                                <h4 className="text-white font-bold font-orbitron text-lg group-hover:text-neon-cyan transition-colors truncate">{project.title}</h4>

                                {/* Company Tag */}
                                {project.company && (
                                    <p className="text-gray-400 text-xs mt-1 truncate">{project.company}</p>
                                )}

                                {/* Tags */}
                                {(() => {
                                    if (project.tags) {
                                        console.log(`Project ${project.id} tags:`, project.tags, typeof project.tags, Array.isArray(project.tags));
                                    }
                                    return project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                })()}

                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all">
                                    <p className="text-gray-300 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        {project.summary}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

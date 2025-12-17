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
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                            className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-neon-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] bg-black/40 backdrop-blur-sm"
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Image/Video Background */}
                            <div className="absolute inset-0">
                                {project.preview && hoveredProject === project.id ? (
                                    (() => {
                                        const normalizePath = (p: string) => p.replace(/\\/g, '/');
                                        const previewPath = normalizePath(project.preview);
                                        const isYoutube = previewPath.includes('youtube.com') || previewPath.includes('youtu.be');

                                        if (isYoutube) {
                                            let videoId = '';
                                            if (previewPath.includes('youtu.be')) {
                                                videoId = previewPath.split('/').pop()?.split('?')[0] || '';
                                            } else if (previewPath.includes('v=')) {
                                                videoId = previewPath.split('v=')[1]?.split('&')[0] || '';
                                            }

                                            return videoId ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
                                                    title={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                />
                                            ) : null;
                                        } else {
                                            return (
                                                <video
                                                    src={resolvePath(previewPath)}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            );
                                        }
                                    })()
                                ) : (
                                    <img
                                        src={resolvePath(project.thumbnail)}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-neon-cyan font-mono text-xs">{project.category}</span>
                                    <span className="text-gray-400 font-mono text-[10px]">{project.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-white font-bold font-orbitron text-lg group-hover:text-neon-cyan transition-colors truncate">
                                        {project.title.split('(').map((part, index) => (
                                            index === 0 ? part : <span key={index} className="text-sm text-gray-400 font-normal">({part}</span>
                                        ))}
                                    </h4>
                                    {project.status === 'Done' && (
                                        <span className="bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 text-[9px] px-1.5 py-0.5 rounded font-bold font-orbitron animate-pulse flex-shrink-0">
                                            DONE
                                        </span>
                                    )}
                                </div>

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

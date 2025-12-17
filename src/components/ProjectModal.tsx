import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Code, Building2 } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { resolvePath } from '../utils/imagePath';

interface Project {
    id: string;
    title: string;
    date: string;
    category: string;
    thumbnail: string;
    summary: string;
    tags?: string[];
    company?: string;
    links?: { label: string; url: string }[];
    content: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Content Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-neon-surface w-full max-w-4xl max-h-[90vh] rounded-2xl border border-neon-cyan/30 overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(0,243,255,0.1)]"
                        >
                            {/* Header Image */}
                            <div className="h-48 md:h-64 relative bg-gray-900 flex-shrink-0">
                                <img src={resolvePath(project.thumbnail)} alt={project.title} className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-surface to-transparent" />

                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-neon-cyan hover:text-black transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="absolute bottom-6 left-6 md:left-10">
                                    <span className="text-neon-cyan font-mono text-xs border border-neon-cyan/30 px-2 py-1 rounded mb-2 inline-block bg-black/50 backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white">
                                        {project.title.split('(').map((part, index) => (
                                            index === 0 ? part : <span key={index} className="text-xl md:text-2xl text-gray-400 font-normal ml-1">({part}</span>
                                        ))}
                                    </h2>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1">
                                        <MarkdownRenderer content={project.content} />
                                    </div>
                                    <div className="w-full md:w-64 space-y-6 flex-shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">

                                        {project.company && (
                                            <div>
                                                <h4 className="text-gray-500 text-sm font-mono mb-2 flex items-center gap-2">
                                                    <Building2 className="w-4 h-4" /> AFFILIATION
                                                </h4>
                                                <p className="text-white font-rajdhani text-lg">{project.company}</p>
                                            </div>
                                        )}

                                        <div>
                                            <h4 className="text-gray-500 text-sm font-mono mb-2 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> TIMELINE
                                            </h4>
                                            <p className="text-white font-rajdhani text-lg">{project.date}</p>
                                        </div>

                                        {project.links && (
                                            <div>
                                                <h4 className="text-gray-500 text-sm font-mono mb-3 flex items-center gap-2">
                                                    <ExternalLink className="w-4 h-4" /> LINKS
                                                </h4>
                                                <div className="flex flex-col gap-2">
                                                    {project.links.map((link, i) => (
                                                        <a
                                                            key={i}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-neon-cyan/10 border border-white/10 hover:border-neon-cyan/50 rounded transition-colors text-sm text-gray-300 hover:text-neon-cyan group"
                                                        >
                                                            {link.label}
                                                            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {project.tags && project.tags.length > 0 && (
                                            <div>
                                                <h4 className="text-gray-500 text-sm font-mono mb-3 flex items-center gap-2">
                                                    <Code className="w-4 h-4" /> TECH STACK
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs bg-neon-purple/10 text-neon-purple border border-neon-purple/20 px-2 py-1 rounded font-mono"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-4 rounded bg-neon-cyan/5 border border-neon-cyan/20">
                                            <Code className="w-5 h-5 text-neon-cyan mb-2" />
                                            <p className="text-xs text-gray-400">
                                                System Architecture detailed in main documentation. Contact for full repo access.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjects } from '../utils/projectLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { resolvePath } from '../utils/imagePath';

export const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const projectsData = getProjects();
    const project = projectsData.find(p => p.id === id);

    console.log("Looking for project ID:", id);
    console.log("Found:", project);

    if (!project) return <div className="text-white p-20">Project not found (ID: {id})</div>;

    return (
        <div className="min-h-screen text-white relative">
            {/* "Door" Opening Animation - simulating entry into the project world */}
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                className="fixed inset-0 z-50 bg-neon-dark origin-left pointer-events-none"
            />
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                className="fixed inset-0 z-50 bg-neon-dark origin-right pointer-events-none"
            />

            <button
                onClick={() => navigate(-1)}
                className="fixed top-24 left-6 z-40 flex items-center gap-2 text-neon-cyan hover:text-white transition-colors bg-black/50 p-2 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft className="w-6 h-6" /> <span className="hidden md:inline font-mono text-sm">RETURN</span>
            </button>

            {/* Hero Section */}
            <header className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img src={resolvePath(project.thumbnail)} alt={project.title} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <span className="text-neon-cyan font-mono text-sm tracking-widest bg-neon-cyan/10 px-3 py-1 rounded mb-4 inline-block">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            {project.title.toUpperCase()}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl font-rajdhani">{project.summary}</p>
                    </motion.div>
                </div>
            </header>

            {/* Content Section */}
            <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="prose prose-invert prose-lg max-w-none"
                    >
                        <MarkdownRenderer content={project.content} />
                    </motion.div>
                </div>

                <aside className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                    >
                        <h3 className="text-neon-cyan font-bold font-mono mb-4 text-sm tracking-wider">PROJECT_METADATA</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-gray-500 text-xs font-mono block">TIMELINE</span>
                                <span className="text-white font-rajdhani">{project.date}</span>
                            </div>
                            {project.company && (
                                <div>
                                    <span className="text-gray-500 text-xs font-mono block">AFFILIATION</span>
                                    <span className="text-white font-rajdhani">{project.company}</span>
                                </div>
                            )}
                            {project.tags && (
                                <div>
                                    <span className="text-gray-500 text-xs font-mono block">TAGS</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {project.links && (
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h3 className="text-neon-cyan font-bold font-mono mb-4 text-sm tracking-wider">ACCESS_POINTS</h3>
                                <div className="space-y-3">
                                    {project.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 bg-neon-cyan/5 border border-neon-cyan/20 rounded hover:bg-neon-cyan/20 transition-all group"
                                        >
                                            <span className="text-sm text-gray-300 group-hover:text-white">{link.label}</span>
                                            <ExternalLink className="w-4 h-4 text-neon-cyan" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </aside>
            </main>
        </div>
    );
};

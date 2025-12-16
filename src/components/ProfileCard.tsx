import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, GraduationCap, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import profileData from '../data/profile.json';

const SkillBadge = ({ skill }: { skill: string }) => (
    <span className="px-3 py-1 text-xs font-mono text-neon-cyan border border-neon-cyan/30 rounded bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-colors cursor-default">
        {skill}
    </span>
);

export const ProfileCard = () => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Identity Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative p-6 rounded-2xl bg-black/40 border border-neon-cyan/30 overflow-hidden group h-fit"
            >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Fingerprint className="w-48 h-48 text-neon-cyan animate-pulse duration-[4000ms]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-32 h-32 rounded-lg border-2 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.3)] flex-shrink-0 overflow-hidden bg-black">
                        <img src="/images/ProfilePic.png" alt="Profile" className="w-full h-full object-cover object-top" />
                    </div>

                    <div className="w-full">
                        <h3 className="text-neon-cyan font-mono text-sm tracking-widest mb-1">IDENTIFICATION</h3>
                        <h1 className="text-3xl font-orbitron font-bold text-white mb-2">{profileData.basics.name}</h1>
                        <p className="text-gray-400 font-rajdhani text-lg mb-4">{profileData.basics.heading}</p>

                        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                            <div className="flex flex-col gap-2 text-sm text-gray-300">
                                <a href={`mailto:${profileData.basics.email}`} className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
                                    <Mail className="w-4 h-4 text-neon-cyan" /> {profileData.basics.email}
                                </a>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-neon-cyan" /> {profileData.basics.phone}
                                </div>
                            </div>

                            <div className="h-[1px] bg-white/10 w-full" />

                            <div>
                                <h4 className="flex items-center gap-2 text-sm text-neon-purple font-bold mb-2">
                                    <Fingerprint className="w-4 h-4" /> SKILL MATRIX
                                </h4>
                                <div className="space-y-3">
                                    {Object.entries(profileData.skills).map(([category, skills]) => (
                                        <div key={category}>
                                            <span className="text-xs text-gray-500 uppercase font-mono mb-1 block">{category}</span>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map(s => <SkillBadge key={s} skill={s} />)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="flex items-center gap-2 text-sm text-neon-purple font-bold mb-2">
                                    <GraduationCap className="w-4 h-4" /> EDUCATION
                                </h4>
                                {profileData.education.map((edu, idx) => (
                                    <div key={idx} className="bg-white/5 p-3 rounded border-l-2 border-neon-purple">
                                        <p className="text-white font-bold text-sm">{edu.area}</p>
                                        <p className="text-gray-400 text-xs">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="lg:hidden w-full flex items-center justify-center gap-2 py-2 rounded border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                        >
                            {showHistory ? 'HIDE HISTORY' : 'VIEW CAREER HISTORY'}
                            {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Right: Career History */}
            <AnimatePresence>
                {(showHistory || window.innerWidth >= 1024) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, x: 20 }}
                        animate={{ opacity: 1, height: 'auto', x: 0 }}
                        exit={{ opacity: 0, height: 0, x: 20 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6 lg:block overflow-hidden"
                    >
                        <h3 className="font-orbitron text-xl flex items-center gap-3">
                            <span className="text-neon-purple">➜</span> CAREER HISTORY
                        </h3>

                        <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 py-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                            {profileData.career.map((job, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Timeline Node */}
                                    <span className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-neon-dark border-2 border-neon-cyan group-hover:bg-neon-cyan transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)]" />

                                    <div className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-cyan/30 transition-all hover:bg-white/10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-lg font-bold text-neon-cyan">{job.position}</h4>
                                                <p className="text-gray-400 text-sm">{job.company}</p>
                                            </div>
                                            <span className="text-xs font-mono bg-neon-purple/20 text-neon-purple px-2 py-1 rounded whitespace-nowrap ml-2">
                                                {job.startDate} - {job.endDate}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{job.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

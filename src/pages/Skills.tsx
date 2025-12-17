import { motion } from 'framer-motion';
import { Cpu, Code, Shield, Database } from 'lucide-react';
import { getParsedSkills, calculateMainLevel, getDeveloperTitle } from '../utils/skillUtils';
import type { Skill } from '../utils/skillUtils';
import { getProjects } from '../utils/projectLoader';

const SkillBar = ({ skill, level, rank }: { skill: string, level: number, rank: string }) => (
    <div className="mb-4">
        <div className="flex justify-between items-end mb-1">
            <div className="flex items-center gap-2">
                <span className={`font-mono text-xs px-1.5 rounded ${(rank || 'E').startsWith('S') ? 'bg-neon-purple text-white' :
                    rank === 'A' ? 'bg-neon-cyan/20 text-neon-cyan' :
                        'bg-gray-800 text-gray-400'
                    }`}>
                    {rank || 'E'}
                </span>
                <span className="text-neon-cyan font-mono text-sm">{skill}</span>
            </div>
            <span className="text-gray-500 font-mono text-xs">{level}%</span>
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]"
            />
        </div>
    </div>
);

export const Skills = () => {
    const skillsData = getParsedSkills();
    const projects = getProjects();
    const completedProjectsCount = projects.filter(p => p.status === 'Done').length;
    const mainLevel = calculateMainLevel(skillsData, completedProjectsCount);

    return (
        <div className="space-y-8 md:space-y-12">
            <div className="flex items-start md:items-center gap-3">
                <Cpu className="w-8 h-8 text-neon-purple flex-shrink-0 mt-1 md:mt-0" />
                <h1 className="text-xl md:text-3xl font-orbitron font-bold text-white tracking-wider flex flex-col md:block">
                    <span>OPERATIONAL_</span>
                    <span>CAPABILITIES</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Visual Radar / Hex Grid Placeholder */}
                <div className="relative aspect-square max-w-[300px] md:max-w-md mx-auto group perspective-1000 w-full my-4 md:my-0">
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center transform-style-3d group-hover:scale-105 transition-transform duration-500"
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-full h-full border border-neon-cyan/20 rounded-full animate-spin-slow pb-4">
                            <div className="w-2 h-2 bg-neon-cyan absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#00f3ff]" />
                            <div className="w-2 h-2 bg-neon-cyan absolute bottom-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#00f3ff]" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute w-[70%] h-[70%] top-[15%] left-[15%] border border-neon-purple/20 rounded-full"
                        animate={{ rotateZ: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-2 h-2 bg-neon-purple absolute left-0 top-1/2 -translate-y-1/2 shadow-[0_0_10px_#bd00ff]" />
                    </motion.div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 backdrop-blur-sm bg-black/30 rounded-full m-8 border border-white/5 group-hover:border-neon-cyan/30 transition-colors">
                        <Cpu className="w-10 h-10 md:w-16 md:h-16 text-neon-cyan mb-2 group-hover:scale-110 transition-transform group-hover:text-white" />
                        <h3 className="text-xl md:text-2xl font-bold text-white font-orbitron tracking-widest">LV. {Math.floor(mainLevel)}</h3>
                        <div className="mt-2 w-16 md:w-24 h-1 bg-gray-800 rounded-full overflow-hidden relative group/bar">
                            <div
                                className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-1000"
                                style={{ width: `${(mainLevel % 1) * 100}%` }}
                            />
                            {/* Hover tooltip for exact % */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-1 rounded text-[10px] text-neon-cyan opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                {((mainLevel % 1) * 100).toFixed(1)}% EXP
                            </div>
                        </div>
                        <p className="text-neon-cyan font-mono text-[10px] md:text-xs mt-2 group-hover:text-neon-purple transition-colors">DEV_SENIORITY</p>
                        <div className="mt-1 px-2 py-0.5 bg-white/10 rounded text-[9px] md:text-[10px] font-orbitron text-white tracking-widest border border-white/10 uppercase">
                            {getDeveloperTitle(mainLevel)}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Dynamic Skill Categories */}
                    {Object.entries(skillsData).map(([category, skills]: [string, Skill[]]) => (
                        <div key={category} className="bg-black/40 border border-white/10 p-6 rounded-xl">
                            <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6 uppercase">
                                {category === 'FRONTEND' ? <Code className="text-neon-cyan" /> :
                                    category === 'BACKEND' ? <Database className="text-green-500" /> :
                                        <Shield className="text-neon-purple" />}
                                {category} OPERATIONS
                            </h3>
                            {skills.sort((a, b) => b.level - a.level).map(skill => (
                                <SkillBar key={skill.name} skill={skill.name} level={skill.level} rank={skill.rank} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

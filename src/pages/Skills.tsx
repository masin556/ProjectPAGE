import { motion } from 'framer-motion';
import { Cpu, Code, Shield, Database } from 'lucide-react';
import profileData from '../data/profile.json';

const SkillBar = ({ skill, level }: { skill: string, level: number }) => (
    <div className="mb-4">
        <div className="flex justify-between items-end mb-1">
            <span className="text-neon-cyan font-mono text-sm">{skill}</span>
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
    return (
        <div className="space-y-12">
            <div className="flex items-center gap-3">
                <Cpu className="w-8 h-8 text-neon-purple" />
                <h1 className="text-3xl font-orbitron font-bold text-white tracking-wider">
                    OPERATIONAL_CAPABILITIES
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Visual Radar / Hex Grid Placeholder */}
                <div className="relative aspect-square max-w-md mx-auto group perspective-1000">
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

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 backdrop-blur-sm bg-black/30 rounded-full m-12 border border-white/5 group-hover:border-neon-cyan/30 transition-colors">
                        <Cpu className="w-16 h-16 text-neon-cyan mb-2 group-hover:scale-110 transition-transform group-hover:text-white" />
                        <h3 className="text-2xl font-bold text-white font-orbitron tracking-widest">LV. 24</h3>
                        <div className="mt-2 w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan w-[75%]" />
                        </div>
                        <p className="text-neon-cyan font-mono text-xs mt-2 group-hover:text-neon-purple transition-colors">SYSTEM_OPTIMIZED</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Dynamic Skill Categories */}
                    {Object.entries(profileData.skills).map(([category, skills]) => (
                        <div key={category} className="bg-black/40 border border-white/10 p-6 rounded-xl">
                            <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6 uppercase">
                                {category === 'frontend' ? <Code className="text-neon-cyan" /> :
                                    category === 'backend' ? <Database className="text-green-500" /> :
                                        <Shield className="text-neon-purple" />}
                                {category} OPERATIONS
                            </h3>
                            {skills.map(skill => (
                                <SkillBar key={skill} skill={skill} level={Math.floor(Math.random() * 20 + 80)} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, User, FolderGit2, Cpu, Github, Mail, Linkedin, Menu, X, Youtube, Book, FileText, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gibeonLogo from '../assets/Pictures/GIBEONLOGO.png';
import clsx from 'clsx';
import profileData from '../data/profile.json';

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: LucideIcon, label: string }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx(
            "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group",
            isActive
                ? "bg-neon-cyan/10 text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)] border-r-2 border-neon-cyan"
                : "text-gray-400 hover:text-white hover:bg-white/5"
        )}
    >
        <Icon className="w-5 h-5 group-hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" />
        <span className="font-orbitron tracking-wide text-sm">{label}</span>
    </NavLink>
);

const SocialLink = ({ href, icon: Icon }: { href: string, icon: LucideIcon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-neon-cyan transition-colors duration-300"
    >
        <Icon className="w-5 h-5" />
    </a>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
    // Extract unique companies from career history, excluding 'Education'
    const companies = Array.from(new Set(profileData.career.map(c => c.company)))
        .filter(c => c !== 'Education');

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen relative text-gray-200 font-sans selection:bg-neon-cyan/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple z-50 shadow-[0_0_20px_rgba(0,243,255,0.5)]" />

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 lg:w-72 fixed h-screen bg-neon-surface/80 backdrop-blur-md border-r border-white/5 z-40">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center relative overflow-hidden group">
                            {/* <Zap className="w-6 h-6 text-neon-cyan relative z-10 group-hover:scale-110 transition-transform" /> */}
                            <img src={gibeonLogo} alt="Gibeon Logo" className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-neon-cyan/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                            <h1 className="font-orbitron font-bold text-xl tracking-wider text-white">SHIN PORTFOLIO</h1>
                            <span className="text-xs text-neon-cyan font-mono relative top-[-2px]">JesusLoveYou</span>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <SidebarItem to="/" icon={User} label="HOME / MAIN" />
                    <SidebarItem to="/projects" icon={FolderGit2} label="ALL PROJECTS" />
                    <SidebarItem to="/skills" icon={Cpu} label="CAPABILITIES" />

                    <div className="pt-4 mt-4 border-t border-white/10">
                        <p className="px-4 text-xs font-mono text-gray-500 mb-2">CORPORATE_LOGS</p>
                        {companies.map(company => (
                            <SidebarItem
                                key={company}
                                to={`/company/${encodeURIComponent(company)}`}
                                icon={Building2}
                                label={company.toUpperCase()}
                            />
                        ))}
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10">
                        <p className="px-4 text-xs font-mono text-gray-500 mb-2">ACADEMIC_LOGS</p>
                        <SidebarItem
                            to="/company/Education"
                            icon={Book}
                            label="EDUCATION"
                        />
                    </div>
                </nav>

                <div className="p-6">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-500 font-mono">STATUS</span>
                            <span className="text-[10px] text-green-400 font-mono animate-pulse">● ACTIVE</span>
                        </div>
                        <div className="flex gap-3 justify-center mt-3 border-t border-white/5 pt-3 flex-wrap">
                            <SocialLink href="https://github.com/masin556" icon={Github} />
                            <SocialLink href="https://www.linkedin.com/in/johsep-shin-728985269/" icon={Linkedin} />
                            <SocialLink href="https://www.youtube.com/@devppatabox" icon={Youtube} />
                            <SocialLink href="https://ppatabox.tistory.com/" icon={Book} />
                            <SocialLink href="https://gibeonsoftwork.notion.site/PPATABOX-NOTION-164955678a7d409584c02c2d03b914b9" icon={FileText} />
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-gray-600 font-mono">© 2025 DEV_PPATABOX</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-neon-surface/90 backdrop-blur-md z-50 p-4 border-b border-white/10 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <Terminal className="text-neon-cyan w-5 h-5" />
                    <span className="font-orbitron font-bold tracking-wider">PORTFOLIO</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-neon-cyan active:bg-neon-cyan/20 rounded"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden fixed top-[69px] left-0 w-full bg-neon-surface border-b border-white/10 z-40 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-2">
                            <SidebarItem to="/" icon={User} label="HOME / MAIN" />
                            <SidebarItem to="/projects" icon={FolderGit2} label="ALL PROJECTS" />
                            <SidebarItem to="/skills" icon={Cpu} label="CAPABILITIES" />

                            <div className="pt-4 mt-4 border-t border-white/10">
                                <p className="px-4 text-xs font-mono text-gray-500 mb-2">CORPORATE_LOGS</p>
                                {companies.map(company => (
                                    <SidebarItem
                                        key={company}
                                        to={`/company/${encodeURIComponent(company)}`}
                                        icon={Building2}
                                        label={company.toUpperCase()}
                                    />
                                ))}
                            </div>

                            <div className="border-t border-white/10 mt-4 pt-4 flex gap-4 justify-center">
                                <SocialLink href="https://github.com/masin556" icon={Github} />
                                <SocialLink href="https://www.linkedin.com/in/johsep-shin-728985269/" icon={Linkedin} />
                                <SocialLink href="mailto:masin556@gmail.com" icon={Mail} />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 lg:ml-72 relative z-10 p-6 md:p-12 pb-24 overflow-x-hidden pt-24 md:pt-12">
                {children}
            </main>
        </div>
    );
};

import { useParams } from 'react-router-dom';
import { ProjectGrid } from '../components/ProjectGrid';
import { getProjects } from '../utils/projectLoader';
import { resolvePath } from '../utils/imagePath';
import { Building2, ArrowRight } from 'lucide-react';
import profileData from '../data/profile.json';

export const CompanyProjects = () => {
    const { companyName } = useParams();
    // Decode the URL parameter to handle spaces/special characters
    const decodedCompany = decodeURIComponent(companyName || '');

    const projectsData = getProjects();
    // Filter projects by exact company name match
    const companyProjects = projectsData.filter(p => p.company === decodedCompany);

    // Find company info from profile.json
    const companyInfo = profileData.career.find(c => c.company === decodedCompany);

    // Helper to resolve paths (reusing the logic from imagePath.ts effectively, or simplified here)
    // defined in utils/imagePath, but let's just use the string for now or import it if needed.
    // simpler to just use it directly if it starts with / or http. 
    // Actually, let's copy the header style from ProjectDetail but adapted.

    return (
        <div className="space-y-8">
            {companyInfo?.image ? (
                /* Hero Section with Image */
                <header className="relative h-[40vh] overflow-hidden rounded-2xl mb-12 border border-white/10 group">
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-8">
                        <img
                            src={resolvePath(companyInfo.image)}
                            alt={decodedCompany}
                            className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <h2 className="text-neon-cyan font-mono text-sm tracking-widest mb-2 bg-black/50 inline-block px-2 py-1 rounded backdrop-blur-sm">COMPANY ARCHIVES</h2>
                        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white uppercase mb-4 drop-shadow-lg">
                            {decodedCompany}
                        </h1>

                        {/* Metadata in Hero */}
                        <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-200 bg-black/30 inline-flex p-3 rounded-xl backdrop-blur-sm border border-white/10">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan"></span>
                                {companyInfo.startDate} — {companyInfo.endDate}
                                {(companyInfo.endDate === 'On duty' || companyInfo.endDate === 'Active') && (
                                    <span className="relative flex h-2 w-2 ml-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                                    </span>
                                )}
                            </span>
                            <span className="w-[1px] h-4 bg-white/20"></span>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-purple"></span>
                                {companyInfo.position}
                            </span>
                        </div>
                    </div>

                    {/* Description and Link Overlay/Sidebar check implementation details later if needed, 
                        but for now let's keep the description below the banner or inside it? 
                        User asked for "image change", so let's put the description below as before but styled nicely.
                    */}
                </header>
            ) : (
                /* Default Header */
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12 border-b border-white/10 pb-12">
                    <div className="p-6 bg-neon-purple/10 rounded-2xl border border-neon-purple/30 shrink-0">
                        <Building2 className="w-16 h-16 text-neon-purple" />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-neon-cyan font-mono text-sm tracking-widest mb-2">COMPANY ARCHIVES</h2>
                            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white uppercase mb-2">
                                {decodedCompany}
                            </h1>
                            {companyInfo && (
                                <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-neon-cyan/50"></span>
                                        {companyInfo.startDate} — {companyInfo.endDate}
                                        {(companyInfo.endDate === 'On duty' || companyInfo.endDate === 'Active') && (
                                            <span className="relative flex h-2 w-2 ml-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                                            </span>
                                        )}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-neon-purple/50"></span>
                                        {companyInfo.position}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Shared Description Section (if it exists) */}
            {companyInfo && (companyInfo.description || companyInfo.url) && (
                <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                    {companyInfo.description && (
                        <p className="text-gray-300 text-lg font-rajdhani max-w-3xl leading-relaxed mb-6">
                            {companyInfo.description}
                        </p>
                    )}

                    {companyInfo.url && (
                        <a
                            href={companyInfo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-all font-mono text-sm group"
                        >
                            VISIT WEBSITE
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    )}
                </div>
            )}

            <div className="space-y-6">
                <h3 className="text-xl font-orbitron text-white flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-neon-cyan"></span>
                    PROJECTS LOG
                </h3>

                {companyProjects.length > 0 ? (
                    <ProjectGrid projects={companyProjects} viewMode="navigation" />
                ) : (
                    <div className="text-center py-20 border border-white/5 rounded-2xl bg-black/40">
                        <p className="text-gray-400 font-rajdhani text-xl">No projects access granted for this entity.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

import { useParams } from 'react-router-dom';
import { ProjectGrid } from '../components/ProjectGrid';
import { getProjects } from '../utils/projectLoader';
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

    return (
        <div className="space-y-8">
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
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-neon-purple/50"></span>
                                    {companyInfo.position}
                                </span>
                            </div>
                        )}
                    </div>

                    {companyInfo?.description && (
                        <p className="text-gray-300 text-lg font-rajdhani max-w-3xl leading-relaxed">
                            {companyInfo.description}
                        </p>
                    )}

                    {companyInfo?.url && (
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
            </div>

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

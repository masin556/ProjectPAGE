import { motion } from 'framer-motion';
import { ProfileCard } from '../components/ProfileCard';
import { ProjectGrid } from '../components/ProjectGrid';
import { getProjects } from '../utils/projectLoader';

export const Home = () => {
    // Only show projects tagged with #MAIN
    const projectsData = getProjects();
    const mainProjects = projectsData.filter(p => p.tags && p.tags.includes('#MAIN'));

    return (
        <div className="max-w-7xl mx-auto space-y-20">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ProfileCard />
            </motion.section>

            {/* Main Projects Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
                    <h2 className="font-orbitron font-bold text-2xl text-white tracking-widest">MAIN OPERATIONS</h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
                </div>

                <ProjectGrid projects={mainProjects} />
            </motion.section>
        </div>
    );
};

export default Home;

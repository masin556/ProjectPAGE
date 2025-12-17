import { SKILL_DATA_RAW, SKILL_CONFIG } from '../data/skills';

export interface Skill {
    name: string;
    category: string;
    level: number;
    baseLevel: number;
    rank: string;
}

export interface SkillCategory {
    [category: string]: Skill[];
}

// Rank system based on level
const getRank = (level: number): string => {
    if (level >= 100) return 'SSS';
    if (level >= 95) return 'SS';
    if (level >= 90) return 'S';
    if (level >= 60) return 'A';
    if (level >= 50) return 'B';
    if (level >= 40) return 'C';
    if (level >= 20) return 'D';
    return 'E';
};

// Calculate individual skill level with time growth
const calculateSkillLevel = (baseLevel: number): number => {
    const startDate = new Date(SKILL_CONFIG.START_DATE);
    const now = new Date();

    const ONE_DAY = 1000 * 60 * 60 * 24;
    const devTimeMs = Math.max(0, now.getTime() - startDate.getTime());
    const devDays = devTimeMs / ONE_DAY;

    // Standard growth: Base + (Days * Rate)
    const rawLevel = baseLevel + (devDays * (SKILL_CONFIG as any).GROWTH_RATE || 0);
    return Math.min(100, Number(rawLevel.toFixed(2)));
};

// Calculate MAIN "Developer Level"
// Formula: 
// 1. Study Years (from Start to Career Start) * Low Multiplier
// 2. Career Years (from Career Start to Now) * High Multiplier (Real Exp)
// 3. Additive Skill Score
export const calculateMainLevel = (skills: SkillCategory, completedProjects: number = 0): number => {
    const studyStartDate = new Date(SKILL_CONFIG.START_DATE);
    const careerStartRaw = (SKILL_CONFIG as any).CAREER_START_DATE;
    const careerStartDate = careerStartRaw ? new Date(careerStartRaw) : new Date();
    const now = new Date();
    const ONE_YEAR = 1000 * 60 * 60 * 24 * 365.25;

    // Safety check for dates
    if (isNaN(studyStartDate.getTime()) || isNaN(careerStartDate.getTime())) {
        console.error("Invalid Date in SKILL_CONFIG");
        return 0;
    }

    // Ensure accurate ranges
    // Range 1: Study (Study Start -> Career Start)
    const studyTimeMs = Math.max(0, careerStartDate.getTime() - studyStartDate.getTime());
    const studyYears = studyTimeMs / ONE_YEAR;

    // Range 2: Career (Career Start -> Now)
    const careerTimeMs = Math.max(0, now.getTime() - careerStartDate.getTime());
    const careerYears = careerTimeMs / ONE_YEAR;

    // Multipliers
    // Study is "Pre-game", worth less (e.g. 1 Year = 2 Levels)
    // Career is "Real-game", worth much more (e.g. 1 Year = 20 Levels)
    const studyScore = studyYears * 2;
    const careerScore = careerYears * 20;

    // 3. Project Bonus (Done projects)
    // Each completed project adds significant XP (e.g. 1 Project = 3 Levels)
    const projectScore = completedProjects * 3;

    // 2. Additive Skill Score
    let totalAdditiveScore = 0;

    Object.values(skills).flat().forEach(skill => {
        // Default weight 0.5 if not found
        const weight = (SKILL_CONFIG as any).CATEGORY_WEIGHTS?.[skill.category] || 0.5;

        // Additive impact: Level * Weight * Multiplier
        // Low multiplier to encourage focus on Years
        const score = skill.level * weight * 0.05;
        if (!isNaN(score)) {
            totalAdditiveScore += score;
        }
    });

    const totalLevel = studyScore + careerScore + projectScore + totalAdditiveScore;
    return isNaN(totalLevel) ? 0 : totalLevel;
};

export const getDeveloperTitle = (level: number): string => {
    if (level >= 90) return 'ARCHITECT';
    if (level >= 70) return 'LEAD DEV';
    if (level >= 50) return 'SENIOR DEV';
    if (level >= 30) return 'MID-LEVEL DEV';
    if (level >= 10) return 'JUNIOR DEV';
    return 'INTERN';
};

export const getParsedSkills = (): SkillCategory => {
    const lines = SKILL_DATA_RAW.trim().split('\n');
    const skills: SkillCategory = {};

    lines.forEach(line => {
        if (!line.trim() || line.startsWith('//')) return;

        const [namePart, rest] = line.split(':').map(s => s.trim());
        if (!namePart || !rest) return;

        const match = rest.match(/\[\s*([a-zA-Z0-9_]+)\s*,\s*(\d+)\s*\]/);
        if (match) {
            const category = match[1].toUpperCase();
            const baseLevel = parseInt(match[2], 10);
            const currentLevel = calculateSkillLevel(baseLevel);

            if (!skills[category]) {
                skills[category] = [];
            }

            skills[category].push({
                name: namePart,
                category,
                baseLevel,
                level: currentLevel,
                rank: getRank(currentLevel)
            });
        }
    });

    return skills;
};

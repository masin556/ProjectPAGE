export const SKILL_CONFIG = {
    // The date when the "leveling up" started (Study Start). 
    // Format: YYYY-MM-DD
    START_DATE: "2021-10-23",

    // The date when professional career started.
    // Professional experience counts for much more.
    CAREER_START_DATE: "2024-11-14",

    // Growth multiplier. 
    // The calculation is: Base + (TimeFactor * GrowthRate)
    // Adjust this to control overall speed.
    GROWTH_RATE: 0.000000001,

    // Difficulty factor (higher = harder to level up)
    // 1.0 = Linear
    // > 1.0 = Exponential decay (harder as time goes on, or standard RPG curve)
    DIFFICULTY: 15.0,

    // Weights for different categories. 
    // "Development" skills should have more impact on the main level than "Others".
    CATEGORY_WEIGHTS: {
        "FRONTEND": 0.05,
        "BACKEND": 0.10,
        "EMBEDDED": 0.15,
        "OTHERS": 0.0005
    }
};

// Format: SkillName : [ Category, BaseLevel ]
// Categories should be consistent: FRONTEND, BACKEND, OTHERS, etc.
// BaseLevel is the starting level (0-100).
export const SKILL_DATA_RAW = `
Unreal Engine : [ FRONTEND, 50 ]
C/C++ : [ FRONTEND, 50 ]
Python : [ FRONTEND, 20 ]
ChatGPT : [ OTHERS, 30 ]
Gemini : [ OTHERS, 20 ]
Claude : [ OTHERS, 5 ]
Drone pilot : [ OTHERS, 60 ]
`;


export interface Project {
    id: string;
    title: string;
    date: string;
    category: string;
    company?: string;
    tags?: string[];
    thumbnail: string;
    summary: string;
    links?: { label: string; url: string }[];
    content: string;
    status?: 'Done' | 'In Progress';
    preview?: string;
}

const parseFrontmatter = (fileContent: string): { metadata: any, content: string } => {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);

    if (!match) {
        return { metadata: {}, content: fileContent };
    }

    const frontmatterBlock = match[1];
    const content = fileContent.replace(match[0], '').trim();

    const metadata: any = {};
    const lines = frontmatterBlock.split('\n');



    for (const line of lines) {
        if (!line.trim() || line.trim().startsWith('#')) continue;

        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Handle arrays (simple comma separated or YAML style lists not fully supported in this simple parser, 
            // but we can support simple string brackets like "[#MAIN]" or just use a helper)
            // For now, let's assume standard YAML-like key: value. 
            // We will manually handle complex standard YAML if needed, but for this project simple parsing is enough.
            // Let's support JSON-like arrays if written as string "[...]" or handle plain values.

            // Special handling for tags and links which might be arrays
            if (key === 'tags' || key === 'links') {
                try {
                    // If it looks like JSON, parse it
                    if (value.startsWith('[') && value.endsWith(']')) {
                        // Replace single quotes with double for JSON parsing if needed, mostly user might write YAML list.
                        // Actually, let's keep it simple: users should write valid JSON value for arrays in this simple parser 
                        // OR we parse a simple list.
                        // Let's iterate: easiest is to parse standard YAML fields. 
                        // Since we want "easy editing", maybe line-based array items?
                        // For robustness without a library, let's parse standard lines.

                        // A real YAML parser is heavy. Let's do a trick: 
                        // We will stick to simple string values for most, and for arrays we can assume JSON syntax for now 
                        // OR we keep it very simple: comma separated.
                        if (value.startsWith('[')) {
                            metadata[key] = JSON.parse(value);
                        } else {
                            metadata[key] = value;
                        }
                    } else {
                        metadata[key] = value;
                    }
                } catch (e) {
                    // Fallback: parse as comma-separated list
                    if (value.startsWith('[') && value.endsWith(']')) {
                        const content = value.slice(1, -1);
                        metadata[key] = content.split(',').map(item => {
                            let s = item.trim();
                            if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
                                s = s.slice(1, -1);
                            }
                            return s;
                        });
                    } else {
                        metadata[key] = value;
                    }
                }
            } else {
                // Remove quotes if present
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                metadata[key] = value;
            }
            // currentKey = key;
        }
    }

    return { metadata, content };
};

export const getProjects = (): Project[] => {
    const modules = import.meta.glob('../data/projects/*.md', { eager: true, query: '?raw', import: 'default' });

    return Object.entries(modules).map(([path, fileContent]) => {
        const { metadata, content } = parseFrontmatter(fileContent as string);

        // Infer ID from filename if not provided
        const filename = path.split('/').pop()?.replace('.md', '') || '';

        return {
            id: metadata.id || filename,
            ...metadata,
            content
        } as Project;
    });
};

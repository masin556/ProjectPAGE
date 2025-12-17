/**
 * Resolves an image path by prepending the base URL if the path is absolute (starts with /).
 * This handles deployment to subdirectories (e.g., GitHub Pages).
 * 
 * @param path - The image path (e.g., "/images/foo.png" or "https://...")
 * @returns The resolved path (e.g., "/ProjectPAGE/images/foo.png")
 */
export const resolvePath = (path: string | undefined): string => {
    if (!path) return '';

    // Normalize backslashes to forward slashes
    path = path.replace(/\\/g, '/');

    if (path.startsWith('http')) return path; // External URL

    const base = import.meta.env.BASE_URL;

    // If path starts with /, prepend base
    if (path.startsWith('/')) {
        // base usually ends with a slash (e.g., "/ProjectPAGE/")
        // so we remove the leading slash from path to avoid double slash if needed,
        // but browsers handle double slash fine. To be clean:
        const cleanBase = base.endsWith('/') ? base : base + '/';
        const cleanPath = path.substring(1);
        return `${cleanBase}${cleanPath}`;
    }

    return path; // Relative path, leave as is (though usually not used for assets from public)
};

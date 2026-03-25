export const getSanitizedSlug = (slug?: string) => slug?.replace(/[^a-zA-Z0-9-_]/g, '-') ?? 'page';

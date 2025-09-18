import { contentConfig } from '@/config/content';

// Shared in-memory content store (in production, use a database)
export const contentStore = { ...contentConfig };

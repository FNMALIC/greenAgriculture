// Configuration for pages under construction
// Set any page to true to show construction message, false to show actual content

export const CONSTRUCTION_CONFIG = {
  marketplace: true,
  gallery: false,
  blog: false,
  // Add more pages as needed
} as const

export type ConstructionPage = keyof typeof CONSTRUCTION_CONFIG

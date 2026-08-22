// Main assets module - consolidates commonly used assets
const profile1 = '';
const profile2 = '';
const profile3 = '';
import comingSoon from './coming_soon.png';

// Re-export all asset modules
export * from './stars';
export * from './stickers';
export * from './project_icons';
export * from './techstack';

// Export main assets
export const mainAssets = {
  profile1,
  profile2,
  profile3,
  comingSoon,
};

export {
  profile1,
  profile2,
  profile3,
  comingSoon,
};

export default {
  mainAssets,
};

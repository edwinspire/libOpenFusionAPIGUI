

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.gkWUIfzU.js","_app/immutable/chunks/scheduler.459z-Jdj.js","_app/immutable/chunks/index.HubrCk06.js"];
export const stylesheets = [];
export const fonts = [];

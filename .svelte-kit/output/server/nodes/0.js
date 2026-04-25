

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.2VU8tgCZ.js","_app/immutable/chunks/NIOxQASV.js","_app/immutable/chunks/DqasLd8s.js","_app/immutable/chunks/Cl8YW2ku.js","_app/immutable/chunks/MNt8RLBV.js"];
export const stylesheets = [];
export const fonts = [];

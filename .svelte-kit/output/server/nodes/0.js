

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DB5jjJ3i.js","_app/immutable/chunks/40b9zCOW.js","_app/immutable/chunks/DBEW1uPQ.js","_app/immutable/chunks/BDp96q33.js"];
export const stylesheets = [];
export const fonts = [];

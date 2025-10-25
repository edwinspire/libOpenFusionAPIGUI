

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CgdRltQU.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DbPKIP5_.js"];
export const stylesheets = [];
export const fonts = [];

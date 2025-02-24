

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BlHQCr-L.js","_app/immutable/chunks/afbdB6zX.js","_app/immutable/chunks/B2YNGnnl.js","_app/immutable/chunks/CAaYeiuC.js"];
export const stylesheets = [];
export const fonts = [];

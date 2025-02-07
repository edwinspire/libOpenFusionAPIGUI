

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DXWypIk3.js","_app/immutable/chunks/CdxaFCRb.js","_app/immutable/chunks/C6hcYJ3M.js","_app/immutable/chunks/DT1aixuo.js"];
export const stylesheets = [];
export const fonts = [];



export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Bm3vQly2.js","_app/immutable/chunks/scheduler.C8CX-c83.js","_app/immutable/chunks/index.CqMK5122.js","_app/immutable/chunks/entry.qGGNkQdU.js"];
export const stylesheets = [];
export const fonts = [];

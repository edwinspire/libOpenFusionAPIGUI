

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.D4vdZ6z1.js","_app/immutable/chunks/scheduler.DlgdoLeO.js","_app/immutable/chunks/index.DPSTnP1S.js","_app/immutable/chunks/entry.B6I95VvW.js"];
export const stylesheets = [];
export const fonts = [];

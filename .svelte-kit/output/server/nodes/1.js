

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.UYhZRv3B.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/chunks/index.W8cwxZNY.js","_app/immutable/chunks/entry.pP5mZS-c.js"];
export const stylesheets = [];
export const fonts = [];

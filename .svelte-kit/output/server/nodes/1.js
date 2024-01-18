

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3pC8sGIv.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/chunks/index.W8cwxZNY.js","_app/immutable/chunks/entry.lh8kumJP.js"];
export const stylesheets = [];
export const fonts = [];

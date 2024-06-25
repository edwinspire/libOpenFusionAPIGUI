

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.W24Ft_TF.js","_app/immutable/chunks/scheduler.CIA8Xbvb.js","_app/immutable/chunks/index.C07emJmb.js"];
export const stylesheets = [];
export const fonts = [];

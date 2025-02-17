

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.m1KTAwZ2.js","_app/immutable/chunks/CdEWHPW_.js","_app/immutable/chunks/Fbh92LXt.js","_app/immutable/chunks/CpoI_K8m.js"];
export const stylesheets = [];
export const fonts = [];



export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B1uez9nq.js","_app/immutable/chunks/CLB3svca.js","_app/immutable/chunks/BeqhlmK-.js","_app/immutable/chunks/BaG6fetd.js"];
export const stylesheets = [];
export const fonts = [];

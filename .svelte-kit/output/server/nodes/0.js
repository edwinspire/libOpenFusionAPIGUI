

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.-GNkXalu.js","_app/immutable/chunks/scheduler.cRwEnXvX.js","_app/immutable/chunks/index.AMgw-iC-.js"];
export const stylesheets = [];
export const fonts = [];

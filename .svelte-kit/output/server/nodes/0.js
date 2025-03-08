

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.D0hU5LGr.js","_app/immutable/chunks/CwmPSybS.js","_app/immutable/chunks/Ct-zR_n4.js","_app/immutable/chunks/BscayNX8.js"];
export const stylesheets = [];
export const fonts = [];

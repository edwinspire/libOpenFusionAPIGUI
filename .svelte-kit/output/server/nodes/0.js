

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.3WuKJpaP.js","_app/immutable/chunks/scheduler.DlgdoLeO.js","_app/immutable/chunks/index.DPSTnP1S.js"];
export const stylesheets = [];
export const fonts = [];

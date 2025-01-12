

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.NnpMckvB.js","_app/immutable/chunks/disclose-version.CCK4YMqw.js","_app/immutable/chunks/runtime.CAnBjqOD.js","_app/immutable/chunks/snippet.DhvjfNi-.js"];
export const stylesheets = [];
export const fonts = [];

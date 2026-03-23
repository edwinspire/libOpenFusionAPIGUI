export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DdqLKjr3.js",app:"_app/immutable/entry/app.BPIaNyG-.js",imports:["_app/immutable/entry/start.DdqLKjr3.js","_app/immutable/chunks/C_MF12B-.js","_app/immutable/chunks/DvRm8DoA.js","_app/immutable/chunks/Bh7toGOJ.js","_app/immutable/entry/app.BPIaNyG-.js","_app/immutable/chunks/DvRm8DoA.js","_app/immutable/chunks/CicRjkbT.js","_app/immutable/chunks/DY3L4J7E.js","_app/immutable/chunks/Bh7toGOJ.js","_app/immutable/chunks/qhCgZ6fF.js","_app/immutable/chunks/B79NcQYN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

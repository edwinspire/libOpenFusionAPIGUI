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
		client: {start:"_app/immutable/entry/start.DY_8s1Zi.js",app:"_app/immutable/entry/app.B4hxK8hr.js",imports:["_app/immutable/entry/start.DY_8s1Zi.js","_app/immutable/chunks/Dmx5zJAM.js","_app/immutable/chunks/DAG6MmbM.js","_app/immutable/chunks/DM3asQhX.js","_app/immutable/entry/app.B4hxK8hr.js","_app/immutable/chunks/DAG6MmbM.js","_app/immutable/chunks/CkOcOS8O.js","_app/immutable/chunks/1m0BGpad.js","_app/immutable/chunks/DM3asQhX.js","_app/immutable/chunks/CUahwxVg.js","_app/immutable/chunks/BOJcCKTy.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

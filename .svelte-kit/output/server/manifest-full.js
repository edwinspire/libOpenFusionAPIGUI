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
		client: {start:"_app/immutable/entry/start.Ds-wrR-y.js",app:"_app/immutable/entry/app.DASYM4bc.js",imports:["_app/immutable/entry/start.Ds-wrR-y.js","_app/immutable/chunks/CGaaVkgs.js","_app/immutable/chunks/DqasLd8s.js","_app/immutable/chunks/BfOQTNel.js","_app/immutable/entry/app.DASYM4bc.js","_app/immutable/chunks/DqasLd8s.js","_app/immutable/chunks/CQVSmpyi.js","_app/immutable/chunks/NIOxQASV.js","_app/immutable/chunks/BfOQTNel.js","_app/immutable/chunks/k_614q5B.js","_app/immutable/chunks/MNt8RLBV.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

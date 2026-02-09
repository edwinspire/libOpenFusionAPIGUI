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
		client: {start:"_app/immutable/entry/start.Bv7K1AzB.js",app:"_app/immutable/entry/app.wqjCXRj0.js",imports:["_app/immutable/entry/start.Bv7K1AzB.js","_app/immutable/chunks/DJqFRYq0.js","_app/immutable/chunks/a73i_69B.js","_app/immutable/chunks/BG6BHAjb.js","_app/immutable/entry/app.wqjCXRj0.js","_app/immutable/chunks/a73i_69B.js","_app/immutable/chunks/DuOB8au-.js","_app/immutable/chunks/CaB8ce7M.js","_app/immutable/chunks/BG6BHAjb.js","_app/immutable/chunks/pTAcEr5o.js","_app/immutable/chunks/DiM4pO_L.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

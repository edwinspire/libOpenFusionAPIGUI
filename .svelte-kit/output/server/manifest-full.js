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
		client: {start:"_app/immutable/entry/start.c_V7Nur_.js",app:"_app/immutable/entry/app.aRsIUZX3.js",imports:["_app/immutable/entry/start.c_V7Nur_.js","_app/immutable/chunks/CkZvfrLH.js","_app/immutable/chunks/DtRNhmbT.js","_app/immutable/chunks/B2Z4njnf.js","_app/immutable/entry/app.aRsIUZX3.js","_app/immutable/chunks/DtRNhmbT.js","_app/immutable/chunks/BQuG-Ybi.js","_app/immutable/chunks/DZBZZMq_.js","_app/immutable/chunks/B2Z4njnf.js","_app/immutable/chunks/Bttk7tKm.js","_app/immutable/chunks/D_7nmGHu.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

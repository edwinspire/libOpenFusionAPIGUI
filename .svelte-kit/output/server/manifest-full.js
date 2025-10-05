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
		client: {start:"_app/immutable/entry/start.D_bnyA_X.js",app:"_app/immutable/entry/app.Bc8OzZNv.js",imports:["_app/immutable/entry/start.D_bnyA_X.js","_app/immutable/chunks/FP1lzf1O.js","_app/immutable/chunks/Npaweace.js","_app/immutable/chunks/Ck0gu9yH.js","_app/immutable/entry/app.Bc8OzZNv.js","_app/immutable/chunks/Ck0gu9yH.js","_app/immutable/chunks/Npaweace.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CgxI9AB6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

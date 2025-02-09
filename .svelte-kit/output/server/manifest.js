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
		client: {start:"_app/immutable/entry/start.Czms5tpV.js",app:"_app/immutable/entry/app.C3SB_WOb.js",imports:["_app/immutable/entry/start.Czms5tpV.js","_app/immutable/chunks/BThvxQhl.js","_app/immutable/chunks/C6hcYJ3M.js","_app/immutable/chunks/CiKuGMlB.js","_app/immutable/entry/app.C3SB_WOb.js","_app/immutable/chunks/C6hcYJ3M.js","_app/immutable/chunks/Mwwt3995.js","_app/immutable/chunks/CdxaFCRb.js","_app/immutable/chunks/ZCbBkbPR.js","_app/immutable/chunks/CiKuGMlB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
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

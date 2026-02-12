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
		client: {start:"_app/immutable/entry/start.BKgAxjgg.js",app:"_app/immutable/entry/app.Bjlf9U8w.js",imports:["_app/immutable/entry/start.BKgAxjgg.js","_app/immutable/chunks/COaLJwTA.js","_app/immutable/chunks/dZaw53cw.js","_app/immutable/chunks/DJEKH_DV.js","_app/immutable/entry/app.Bjlf9U8w.js","_app/immutable/chunks/dZaw53cw.js","_app/immutable/chunks/D5NNzzky.js","_app/immutable/chunks/CoXxxFKb.js","_app/immutable/chunks/DJEKH_DV.js","_app/immutable/chunks/B1rBUSi1.js","_app/immutable/chunks/B3cJKUFo.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

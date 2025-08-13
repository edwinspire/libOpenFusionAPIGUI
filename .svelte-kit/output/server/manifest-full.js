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
		client: {start:"_app/immutable/entry/start.CbDoI4Qb.js",app:"_app/immutable/entry/app.CKPTX_zB.js",imports:["_app/immutable/entry/start.CbDoI4Qb.js","_app/immutable/chunks/DKJixYs4.js","_app/immutable/chunks/CPW6iHC3.js","_app/immutable/chunks/CSQnliPs.js","_app/immutable/entry/app.CKPTX_zB.js","_app/immutable/chunks/CSQnliPs.js","_app/immutable/chunks/CPW6iHC3.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BKWXfHYB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

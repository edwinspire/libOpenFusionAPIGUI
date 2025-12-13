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
		client: {start:"_app/immutable/entry/start.BVgo82Ll.js",app:"_app/immutable/entry/app.FTuKKIxJ.js",imports:["_app/immutable/entry/start.BVgo82Ll.js","_app/immutable/chunks/Di3yJPAt.js","_app/immutable/chunks/CrFpc7hO.js","_app/immutable/chunks/eCp6w6zV.js","_app/immutable/entry/app.FTuKKIxJ.js","_app/immutable/chunks/CrFpc7hO.js","_app/immutable/chunks/bAyETv53.js","_app/immutable/chunks/C83t8Xmx.js","_app/immutable/chunks/eCp6w6zV.js","_app/immutable/chunks/kz1267ej.js","_app/immutable/chunks/Bpi600ZC.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

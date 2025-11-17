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
		client: {start:"_app/immutable/entry/start.CCIhcnZj.js",app:"_app/immutable/entry/app.CjyTNZAK.js",imports:["_app/immutable/entry/start.CCIhcnZj.js","_app/immutable/chunks/DA2SfnQc.js","_app/immutable/chunks/h2-YK8Ot.js","_app/immutable/chunks/CLyLVRPI.js","_app/immutable/entry/app.CjyTNZAK.js","_app/immutable/chunks/h2-YK8Ot.js","_app/immutable/chunks/CaKLpL2A.js","_app/immutable/chunks/CWXX70iC.js","_app/immutable/chunks/CLyLVRPI.js","_app/immutable/chunks/BXewNoXV.js","_app/immutable/chunks/CwZy7oiY.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

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
		client: {start:"_app/immutable/entry/start.DiprFWqI.js",app:"_app/immutable/entry/app.6yhyO34H.js",imports:["_app/immutable/entry/start.DiprFWqI.js","_app/immutable/chunks/D3zKHQ8-.js","_app/immutable/chunks/Cs2tu466.js","_app/immutable/chunks/1BAom04Q.js","_app/immutable/entry/app.6yhyO34H.js","_app/immutable/chunks/Cs2tu466.js","_app/immutable/chunks/C3ZLOXwa.js","_app/immutable/chunks/CmAeRQz1.js","_app/immutable/chunks/1BAom04Q.js","_app/immutable/chunks/Ca3tuz9X.js","_app/immutable/chunks/CXYRqgyl.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

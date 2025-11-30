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
		client: {start:"_app/immutable/entry/start.DRgarh4s.js",app:"_app/immutable/entry/app.CEFs61No.js",imports:["_app/immutable/entry/start.DRgarh4s.js","_app/immutable/chunks/DiGkU-Ac.js","_app/immutable/chunks/BWj0F8q0.js","_app/immutable/chunks/0M8qLioX.js","_app/immutable/entry/app.CEFs61No.js","_app/immutable/chunks/BWj0F8q0.js","_app/immutable/chunks/QUMwoIaF.js","_app/immutable/chunks/BAuNqhjz.js","_app/immutable/chunks/0M8qLioX.js","_app/immutable/chunks/Fomxm8hU.js","_app/immutable/chunks/9cYV9aAH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

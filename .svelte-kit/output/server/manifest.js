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
		client: {start:"_app/immutable/entry/start.DBrGJKQk.js",app:"_app/immutable/entry/app.D8drDq8k.js",imports:["_app/immutable/entry/start.DBrGJKQk.js","_app/immutable/chunks/9rH2Rckl.js","_app/immutable/chunks/BQFHlkjn.js","_app/immutable/chunks/Cz6fGOtX.js","_app/immutable/entry/app.D8drDq8k.js","_app/immutable/chunks/BQFHlkjn.js","_app/immutable/chunks/9nppH66W.js","_app/immutable/chunks/DcX3utU7.js","_app/immutable/chunks/Cz6fGOtX.js","_app/immutable/chunks/CPEvlM7W.js","_app/immutable/chunks/B3jaYCf1.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

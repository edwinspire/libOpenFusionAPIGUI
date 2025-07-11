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
		client: {start:"_app/immutable/entry/start.BSxt6IYU.js",app:"_app/immutable/entry/app.DhCmpued.js",imports:["_app/immutable/entry/start.BSxt6IYU.js","_app/immutable/chunks/D5wA3mQ9.js","_app/immutable/chunks/Dke2JZ1E.js","_app/immutable/chunks/DuAv5wJN.js","_app/immutable/entry/app.DhCmpued.js","_app/immutable/chunks/DuAv5wJN.js","_app/immutable/chunks/Dke2JZ1E.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/jtQnpVVs.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

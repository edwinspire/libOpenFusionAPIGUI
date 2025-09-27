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
		client: {start:"_app/immutable/entry/start.Bcn1Tfka.js",app:"_app/immutable/entry/app.CWwbX4RC.js",imports:["_app/immutable/entry/start.Bcn1Tfka.js","_app/immutable/chunks/CP0UaS66.js","_app/immutable/chunks/C8PF7lLc.js","_app/immutable/chunks/Bd-ZMRms.js","_app/immutable/entry/app.CWwbX4RC.js","_app/immutable/chunks/Bd-ZMRms.js","_app/immutable/chunks/C8PF7lLc.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CvPmuMER.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

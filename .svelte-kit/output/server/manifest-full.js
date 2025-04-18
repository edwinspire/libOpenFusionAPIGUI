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
		client: {start:"_app/immutable/entry/start.Ct7sdWCk.js",app:"_app/immutable/entry/app.BZTj089A.js",imports:["_app/immutable/entry/start.Ct7sdWCk.js","_app/immutable/chunks/DV058yz7.js","_app/immutable/chunks/BeqhlmK-.js","_app/immutable/chunks/jXYkakx0.js","_app/immutable/entry/app.BZTj089A.js","_app/immutable/chunks/BeqhlmK-.js","_app/immutable/chunks/BECihzLy.js","_app/immutable/chunks/CLB3svca.js","_app/immutable/chunks/CGSBWN3_.js","_app/immutable/chunks/jXYkakx0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

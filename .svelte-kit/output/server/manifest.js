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
		client: {start:"_app/immutable/entry/start.BcDrWGpW.js",app:"_app/immutable/entry/app.DrLUkCHC.js",imports:["_app/immutable/entry/start.BcDrWGpW.js","_app/immutable/chunks/C-EKu81-.js","_app/immutable/chunks/hGJrTc5C.js","_app/immutable/chunks/BRv5hH9J.js","_app/immutable/entry/app.DrLUkCHC.js","_app/immutable/chunks/hGJrTc5C.js","_app/immutable/chunks/C88KsTse.js","_app/immutable/chunks/BKabA3PD.js","_app/immutable/chunks/DHaNrL4O.js","_app/immutable/chunks/BRv5hH9J.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

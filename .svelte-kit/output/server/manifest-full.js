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
		client: {start:"_app/immutable/entry/start.CL0fyoam.js",app:"_app/immutable/entry/app.CKU88iMJ.js",imports:["_app/immutable/entry/start.CL0fyoam.js","_app/immutable/chunks/COCPCnOO.js","_app/immutable/chunks/BExKJUNd.js","_app/immutable/chunks/CGhL8n1s.js","_app/immutable/entry/app.CKU88iMJ.js","_app/immutable/chunks/BExKJUNd.js","_app/immutable/chunks/UIJEJTrx.js","_app/immutable/chunks/CgncrALY.js","_app/immutable/chunks/BcIYKwCp.js","_app/immutable/chunks/CGhL8n1s.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

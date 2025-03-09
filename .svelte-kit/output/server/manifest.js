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
		client: {start:"_app/immutable/entry/start.B6LSEtEh.js",app:"_app/immutable/entry/app.C428k3fY.js",imports:["_app/immutable/entry/start.B6LSEtEh.js","_app/immutable/chunks/BN2Ce9S3.js","_app/immutable/chunks/Ct-zR_n4.js","_app/immutable/chunks/BIQmxR5X.js","_app/immutable/entry/app.C428k3fY.js","_app/immutable/chunks/Ct-zR_n4.js","_app/immutable/chunks/jC2EgOcq.js","_app/immutable/chunks/CwmPSybS.js","_app/immutable/chunks/DshcIpLp.js","_app/immutable/chunks/BIQmxR5X.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

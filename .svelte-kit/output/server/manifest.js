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
		client: {start:"_app/immutable/entry/start.BMEAAEoT.js",app:"_app/immutable/entry/app.BdxmEBL6.js",imports:["_app/immutable/entry/start.BMEAAEoT.js","_app/immutable/chunks/BbDvnk-4.js","_app/immutable/chunks/B2YNGnnl.js","_app/immutable/chunks/DxL3RQYX.js","_app/immutable/entry/app.BdxmEBL6.js","_app/immutable/chunks/B2YNGnnl.js","_app/immutable/chunks/DeeVGk0H.js","_app/immutable/chunks/afbdB6zX.js","_app/immutable/chunks/DhV3nISy.js","_app/immutable/chunks/DxL3RQYX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

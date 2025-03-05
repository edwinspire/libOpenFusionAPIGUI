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
		client: {start:"_app/immutable/entry/start.CmI5gF0p.js",app:"_app/immutable/entry/app.D9OUtehq.js",imports:["_app/immutable/entry/start.CmI5gF0p.js","_app/immutable/chunks/DMbBOAlO.js","_app/immutable/chunks/DBEW1uPQ.js","_app/immutable/chunks/Clo25wHT.js","_app/immutable/entry/app.D9OUtehq.js","_app/immutable/chunks/DBEW1uPQ.js","_app/immutable/chunks/CTXlAZXL.js","_app/immutable/chunks/40b9zCOW.js","_app/immutable/chunks/BQz5V4a7.js","_app/immutable/chunks/Clo25wHT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

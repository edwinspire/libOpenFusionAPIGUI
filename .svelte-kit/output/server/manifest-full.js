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
		client: {start:"_app/immutable/entry/start.H4I3HaLo.js",app:"_app/immutable/entry/app.B4QH17kz.js",imports:["_app/immutable/entry/start.H4I3HaLo.js","_app/immutable/chunks/CcZhqgCH.js","_app/immutable/chunks/Fbh92LXt.js","_app/immutable/chunks/BSI6tkg5.js","_app/immutable/entry/app.B4QH17kz.js","_app/immutable/chunks/Fbh92LXt.js","_app/immutable/chunks/D7DKxG39.js","_app/immutable/chunks/CdEWHPW_.js","_app/immutable/chunks/CvI430MJ.js","_app/immutable/chunks/BSI6tkg5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

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
		client: {"start":"_app/immutable/entry/start.CcO2EHUj.js","app":"_app/immutable/entry/app.BiwxU94f.js","imports":["_app/immutable/entry/start.CcO2EHUj.js","_app/immutable/chunks/entry.qGGNkQdU.js","_app/immutable/chunks/scheduler.C8CX-c83.js","_app/immutable/entry/app.BiwxU94f.js","_app/immutable/chunks/scheduler.C8CX-c83.js","_app/immutable/chunks/index.CqMK5122.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

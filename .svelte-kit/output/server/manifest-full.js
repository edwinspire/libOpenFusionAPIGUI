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
		client: {"start":"_app/immutable/entry/start.Drpysz8L.js","app":"_app/immutable/entry/app.B7A8jpCW.js","imports":["_app/immutable/entry/start.Drpysz8L.js","_app/immutable/chunks/entry.D-fAx773.js","_app/immutable/chunks/scheduler.C8CX-c83.js","_app/immutable/entry/app.B7A8jpCW.js","_app/immutable/chunks/scheduler.C8CX-c83.js","_app/immutable/chunks/index.CqMK5122.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

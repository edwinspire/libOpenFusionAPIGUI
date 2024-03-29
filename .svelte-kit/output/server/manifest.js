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
		client: {"start":"_app/immutable/entry/start.946AduyG.js","app":"_app/immutable/entry/app.12w1YS3o.js","imports":["_app/immutable/entry/start.946AduyG.js","_app/immutable/chunks/entry.hUdKJBKz.js","_app/immutable/chunks/scheduler.cRwEnXvX.js","_app/immutable/chunks/index.4zeG2qSv.js","_app/immutable/entry/app.12w1YS3o.js","_app/immutable/chunks/scheduler.cRwEnXvX.js","_app/immutable/chunks/index.AMgw-iC-.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

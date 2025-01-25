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
		client: {"start":"_app/immutable/entry/start.CSbfiGbE.js","app":"_app/immutable/entry/app.Dc5Rrm_l.js","imports":["_app/immutable/entry/start.CSbfiGbE.js","_app/immutable/chunks/entry.CDcKLwIB.js","_app/immutable/chunks/runtime.CAnBjqOD.js","_app/immutable/chunks/index.CQM5Z2Ys.js","_app/immutable/chunks/index-client.CqNOKDEM.js","_app/immutable/entry/app.Dc5Rrm_l.js","_app/immutable/chunks/runtime.CAnBjqOD.js","_app/immutable/chunks/render.tFrWxvY-.js","_app/immutable/chunks/disclose-version.CCK4YMqw.js","_app/immutable/chunks/props.DXcbZtJT.js","_app/immutable/chunks/index-client.CqNOKDEM.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

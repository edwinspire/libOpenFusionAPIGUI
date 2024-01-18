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
		client: {"start":"_app/immutable/entry/start.ITEpuDFJ.js","app":"_app/immutable/entry/app.B0dkLiYZ.js","imports":["_app/immutable/entry/start.ITEpuDFJ.js","_app/immutable/chunks/entry.uSr9UleI.js","_app/immutable/chunks/scheduler.eyujEKWe.js","_app/immutable/chunks/index.i9oGv7sS.js","_app/immutable/entry/app.B0dkLiYZ.js","_app/immutable/chunks/scheduler.eyujEKWe.js","_app/immutable/chunks/index.ztFHNGF1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
		}
	}
}
})();

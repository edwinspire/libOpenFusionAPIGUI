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
		client: {"start":"_app/immutable/entry/start.KZ3dHnUs.js","app":"_app/immutable/entry/app.HO6eErk7.js","imports":["_app/immutable/entry/start.KZ3dHnUs.js","_app/immutable/chunks/entry.9xWshvGt.js","_app/immutable/chunks/scheduler.eyujEKWe.js","_app/immutable/chunks/index.i9oGv7sS.js","_app/immutable/entry/app.HO6eErk7.js","_app/immutable/chunks/scheduler.eyujEKWe.js","_app/immutable/chunks/index.ztFHNGF1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

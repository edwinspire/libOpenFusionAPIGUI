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
		client: {"start":"_app/immutable/entry/start.-BDFkw9h.js","app":"_app/immutable/entry/app.C8gDe2El.js","imports":["_app/immutable/entry/start.-BDFkw9h.js","_app/immutable/chunks/entry.gn-DgmwB.js","_app/immutable/chunks/scheduler.eyujEKWe.js","_app/immutable/chunks/index.i9oGv7sS.js","_app/immutable/entry/app.C8gDe2El.js","_app/immutable/chunks/scheduler.eyujEKWe.js","_app/immutable/chunks/index.ztFHNGF1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

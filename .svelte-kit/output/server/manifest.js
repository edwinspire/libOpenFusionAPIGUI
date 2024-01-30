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
		client: {"start":"_app/immutable/entry/start.Ikk4nQtS.js","app":"_app/immutable/entry/app.fCooiHwC.js","imports":["_app/immutable/entry/start.Ikk4nQtS.js","_app/immutable/chunks/entry.GxCdAuus.js","_app/immutable/chunks/scheduler.459z-Jdj.js","_app/immutable/chunks/index.qwC499Zo.js","_app/immutable/entry/app.fCooiHwC.js","_app/immutable/chunks/scheduler.459z-Jdj.js","_app/immutable/chunks/index.HubrCk06.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

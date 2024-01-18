export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","flame.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.G-AGQVeH.js","app":"_app/immutable/entry/app.WeT4uuJG.js","imports":["_app/immutable/entry/start.G-AGQVeH.js","_app/immutable/chunks/entry.lh8kumJP.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/entry/app.WeT4uuJG.js","_app/immutable/chunks/scheduler.zMJaRgub.js","_app/immutable/chunks/index.W8cwxZNY.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

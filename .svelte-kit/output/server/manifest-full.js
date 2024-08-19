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
		client: {"start":"_app/immutable/entry/start.eqjOeb31.js","app":"_app/immutable/entry/app.BpI6UKB3.js","imports":["_app/immutable/entry/start.eqjOeb31.js","_app/immutable/chunks/entry.DLGCpdRm.js","_app/immutable/chunks/scheduler.DlgdoLeO.js","_app/immutable/chunks/index.BPWxhkd_.js","_app/immutable/entry/app.BpI6UKB3.js","_app/immutable/chunks/scheduler.DlgdoLeO.js","_app/immutable/chunks/index.DPSTnP1S.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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

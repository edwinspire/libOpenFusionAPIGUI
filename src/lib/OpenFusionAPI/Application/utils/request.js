import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';
import uFetch from '@edwinspire/universal-fetch';
import { createEndpoint } from '$lib/OpenFusionAPI/Application/utils/utils.js';
import {
	listHandlerStore,
	listMethodStore,
	listFunctionStoreDev,
	listFunctionStorePRD,
	listFunctionStoreQA,
	listAppVars
} from '$lib/OpenFusionAPI/Application/utils/stores.js';

export const getEnvironmentList = async (token) => {
	let uf = new uFetch();
	uf.setBearerAuthorization(token);
	let environment_list = [];

	try {
		let env_list_resp = await uf.GET({ url: url_paths.environment });
		environment_list = await env_list_resp.json();

		if (!environment_list || !Array.isArray(environment_list)) {
			/*
            environment_list = env_list.map((item) => {
				return { id: item.id, value: item.text };
			});
            */

			environment_list = [];
		}
	} catch (error) {
		alert(error.message);
	}
	return environment_list;
};

export const GetApp = async (idapp, token) => {
	if (idapp) {
		let uf = new uFetch();
		if (token) {
			uf.setBearerAuthorization(token);
		}

		let request = await uf.GET({
			url: url_paths.app,
			data: { idapp: idapp }
		});

		let response = await request.json();

		return response;
	} else {
		return [];
	}
};

export const LoginRequest = async (username, password) => {
	let uf = new uFetch();

	let user = await uf.POST({
		url: url_paths.login,
		data: { username, password },
		options: { credentials: 'same-origin' }
	});
	let data = await user.json();
	return data;
};

export const GetServerAPIVersion = async () => {
	// Lógica de autenticación aquí
	let uf = new uFetch();
	if (token) {
		uf.setBearerAuthorization(token);
	}

	let version_req = await uf.GET({ url: url_paths.serverAPIVersion });
	let version_res = await version_req.json();

	return version_res;
};

export const GetAppBackup = async (idapp, token) => {
	if (idapp) {
		let uf = new uFetch();
		if (token) {
			uf.setBearerAuthorization(token);
		}

		let request = await uf.GET({
			url: url_paths.appBackup,
			data: { idapp: idapp }
		});

		let response = await request.json();

		return response;
	} else {
		return [];
	}
};

export const RestoreAppBackup = async (app, token) => {
	if (app) {
		let uf = new uFetch();
		if (token) {
			uf.setBearerAuthorization(token);
		}

		let request = await uf.POST({
			url: url_paths.appBackup,
			data: app
		});

		let response = await request.json();

		return response;
	} else {
		return [];
	}
};

export const GetEndpointsByIdapp = async (idapp, token) => {
	if (idapp) {
		let app = await GetApp(idapp, token);

		if (app.idapp == idapp) {
			app.endpoints = [];
			let uf = new uFetch();
			if (token) {
				uf.setBearerAuthorization(token);
			}
			let request = await uf.GET({
				url: url_paths.endpoints_get_by_idapp,
				data: { idapp: idapp }
			});

			let response = await request.json();

			if (Array.isArray(response)) {
				app.endpoints = response.map((ax) => {
					return {
						//endpoint: `${ax.method == 'WS' ? '/ws/' : '/api/'}${app.app}${ax.resource}/${ax.environment}`,
						endpoint: createEndpoint(ax.method, app.app, ax.resource, ax.environment),
						...ax
					};
				});

				//	console.log(app);
			}
		}
		return app;
	} else {
		return {};
	}
};

export const getListHandler = async (/** @type {string} */ token) => {
	let f = new uFetch();
	f.setBearerAuthorization(token);

	let fr = await f.GET({ url: url_paths.getHandler });
	let list = await fr.json();

	if (list && Array.isArray(list)) {
		let data = list.map((m) => {
			return {
				id: m.handler,
				value: m.label,
				enabled: m.enabled,
				description: m.description
			};
		});
		listHandlerStore.set(data);
	}
};

export const getListMethods = async (/** @type {string} */ token) => {
	let f = new uFetch();
	f.setBearerAuthorization(token);

	let fr = await f.GET({ url: url_paths.Methods });
	let list = await fr.json();

	if (list && Array.isArray(list)) {
		let data = list.map((m) => {
			return {
				id: m.method,
				value: m.label,
				enabled: m.enabled,
				description: ''
			};
		});
		listMethodStore.set(data);
	}
};

export const getHandlerDocs = async (handler, token) => {
	if (handler) {
		//	console.log(url_paths.apiDoc);
		let uF = new uFetch();
		if (token) {
			uF.setBearerAuthorization(token);
		}
		let req = await uF.GET({ url: url_paths.apiDoc, data: { handler: handler } });
		let res = await req.json();
		//		console.log(res);
		return res;
	} else {
		return {};
	}
};

export const getListFunction = async (
	/** @type {string} */ token,
	/** @type {string} */ appName
) => {
	//	console.log('Fetching function list for app:', appName);

	// @ts-ignore
	let f = new uFetch();
	f.setBearerAuthorization(token);
	try {
		let fr = await f.GET({
			url: url_paths.getfunctions,
			data: { appName: appName, environment: 'dev' }
		});
		let list = await fr.json();

		if (list && Array.isArray(list)) {
			let data = list.map((fn) => {
				return { id: fn, value: fn };
			});
			listFunctionStoreDev.set(data);
		}
	} catch (error) {
		console.error(error);
		listFunctionStoreDev.set([]);
	}
	////////////////////////////////////
	try {
		let fr = await f.GET({
			url: url_paths.getfunctions,
			data: { appName: appName, environment: 'qa' }
		});
		let list = await fr.json();

		if (list && Array.isArray(list)) {
			let data = list.map((fn) => {
				return { id: fn, value: fn };
			});
			listFunctionStoreQA.set(data);
		}
	} catch (error) {
		console.error(error);
		listFunctionStoreQA.set([]);
	}
	////////////////////////////////////
	try {
		let fr = await f.GET({
			url: url_paths.getfunctions,
			data: { appName: appName, environment: 'prd' }
		});
		let list = await fr.json();

		if (list && Array.isArray(list)) {
			let data = list.map((fn) => {
				return { id: fn, value: fn };
			});
			listFunctionStorePRD.set(data);
		}
	} catch (error) {
		console.error(error);
		listFunctionStorePRD.set([]);
	}
};

export const clearCache = async (/** @type {string} */ token, urls_clear) => {
	let uf = new uFetch();

	if (token) {
		uf.setBearerAuthorization(token);
	}

	let get_list_clear = await uf.POST({
		url: url_paths.clearCache,
		data: urls_clear
	});

	let get_list_clear_result = await get_list_clear.json();
	return get_list_clear_result;
};

export const getAppDocumentation = async (token, idapp, idendpoints) => {
	let uf = new uFetch();

	if (token) {
		uf.setBearerAuthorization(token);
	}

	let get_doc = await uf.POST({
		url: url_paths.appDocumentation,
		data: { idapp: idapp, endpoints: idendpoints }
	});

	let result = await get_doc.json();
	return result;
};

export const getServerAPIVersion = async (token) => {
	// Lógica de autenticación aquí

	let uf = new uFetch();

	if (token) {
		uf.setBearerAuthorization(token);
	}

	let version_req = await uf.GET({ url: url_paths.serverAPIVersion });
	let version_res = await version_req.json();

	return version_res;
};

export const EndpointSave = async (endpoint, token) => {
	// Lógica de autenticación aquí

	let uf = new uFetch();

	if (token) {
		uf.setBearerAuthorization(token);
	}

	let req = await uf.POST({ url: url_paths.endpoint, data: endpoint });
	let es = await req.json();
	return es?.result;
};

export const getLogsRecordsPerMinute = async (options, token) => {
	let uf = new uFetch();

	if (token) {
		uf.setBearerAuthorization(token);
	}

	if (options) {
		let get_list_metrics = await uf.GET({
			url: url_paths.getLogsRecordsPerMinute,
			data: options
		});

		let metrics_list = await get_list_metrics.json();
		return metrics_list;
	}
};

export const GetAppVars = async (idapp, token, setStoreListAppVars = false) => {
	let uf = new uFetch();

	if (token) {
		uf.setBearerAuthorization(token);
	}

	let req = await uf.GET({
		url: url_paths.appvarsbyidapp,
		data: { idapp: idapp }
	});

	let resp = await req.json();

	if (setStoreListAppVars && resp && Array.isArray(resp)) {
		//console.log('setStoreListAppVars', resp);
		listAppVars.set(resp);
	}

	return resp;
};

export const UpsertAppVar = async (data, token) => {
	if (data) {
		let uf = new uFetch();
		if (token) {
			uf.setBearerAuthorization(token);
		}

		let request = await uf.POST({
			url: url_paths.appvar,
			data: data
		});

		let response = await request.json();

		return response;
	} else {
		return {};
	}
};

export const DeleteAppVar = async (idvar, token) => {
	if (idvar) {
		let uf = new uFetch();
		if (token) {
			uf.setBearerAuthorization(token);
		}

		let request = await uf.DELETE({
			url: url_paths.appvar,
			data: { idvar: idvar }
		});

		let response = await request.json();

		return response;
	} else {
		return [];
	}
};

export const getListApps = async (token) => {
	let uf = new uFetch();
	if (token) {
		uf.setBearerAuthorization(token);
	}

	let apps_res = await uf.GET({ url: url_paths.apps_get_list });
	let apps = await apps_res.json();
	return apps;
};

export const changeUserPassword = async (data, token) => {
	let uf = new uFetch();
	if (token) {
		uf.setBearerAuthorization(token);
	}

	let apps_res = await uf.POST({ url: url_paths.changeUserPassword, data: data });
	let apps = await apps_res.json();
	return apps;
};

export const restoreSystemEndpoints = async (restore, token) => {
	let uf = new uFetch();
	if (token) {
		uf.setBearerAuthorization(token);
	}

	let sys_res = await uf.PUT({
		url: url_paths.restoreSystemEndpoints,
		data: { restore: restore }
	});
	let r = await sys_res.json();
	return r;
};

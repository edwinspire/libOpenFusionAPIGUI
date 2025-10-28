import uFetch from '@edwinspire/universal-fetch';
import { writable } from 'svelte/store';
import { PUBLIC_API_SERVER_HOST } from '$env/static/public';

const host = validateBaseUrl(PUBLIC_API_SERVER_HOST || '');

export const url_paths = {
	getfunctions: host + '/api/system/api/function_names/prd',
	getHandler: host + '/api/system/system/handler/0.01/prd',
	Methods: host + '/api/system/system/method/0.01/prd',
	listEnv: host + '/api/system/system/environment/0.01/prd',
	listApps: host + '/api/system/api/apps/0.01/prd',
	getApp: host + '/api/system/api/app/0.01/prd',
	saveApp: host + '/api/system/api/app/0.01/prd',
	saveMethod: host + '/api/system/system/method/0.01/prd',
	login: host + '/api/system/system/login/0.01/prd',
	getCacheSize: host + '/api/system/cache/response/size/prd',
	clearCache: host + '/api/system/cache/clear/prd',
	getUsersList: host + '/api/system/users/list/prd',
	getResponsesCountStatusCode: host + '/api/system/responses/status_code/count/prd',
	getLogs: host + '/api/system/system/log/prd',
	getlistFunctionsVarsJS: host + '/api/system/system/handler/js/funtions/prd',
	getListIntervalTasksByIdApp: host + '/api/system/interval_tasks/byidapp/prd',
	upsertIntervalTasksByIdTask: host + '/api/system/interval_tasks/upsert/prd',
	deleteIntervalTasksByIdTask: host + '/api/system/interval_tasks/delete/prd',
	serverAPIVersion: host + '/server/version',
	apiDoc: host + '/api/system/api/handler/documentation/prd',
	wsServerEvents: host + '/ws/system/websocket/server/prd',
	getInternalAppMetrics: host + '/api/system/app/internal/metrics/prd',
	getLogsRecordsPerMinute: host + '/api/system/system/log/recordsperminute/prd'
};
//

export const userStore = writable({});
export const listMethodStore = writable({});
export const listHandlerStore = writable({});
export const listFunctionStoreDev = writable({});
export const listFunctionStoreQA = writable({});
export const listFunctionStorePRD = writable({});
export const listAppVars = writable({});
export const storeCacheSize = writable({});
export const storeUsersList = writable({});
export const storeCountResponseStatusCode = writable({});
export const storeEndpointOnStart = writable({});
export const storeEndpointOnComplete = writable({});
export const storeServerDynamicInformation = writable({});

export const formatJsonForHtmlCode = (/** @type {any} */ json) => {
	return JSON.stringify(json, null, 2).replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
};

export const getListUsers = async (/** @type {string} */ token) => {
	// @ts-ignore
	let f = new uFetch();
	f.setBearerAuthorization(token);
	try {
		let users = await f.GET({ url: url_paths.getUsersList });
		let data_users = await users.json();

		if (data_users && Array.isArray(data_users)) {
			storeUsersList.set(data_users);
		} else {
			storeUsersList.set([]);
		}
	} catch (error) {
		console.error(error);
		storeUsersList.set([]);
	}
};

export const getLogsRecordsPerMinute = async (options, token) => {
	let uf = new uFetch();

	try {
		if (options) {
			let get_list_metrics = await uf.GET({
				url: url_paths.getLogsRecordsPerMinute,
				data: options
			});

			let metrics_list = await get_list_metrics.json();
			return metrics_list;
		}
	} catch (error) {
		console.trace(error);
	}
};

export const getListFunction = async (
	/** @type {string} */ token,
	/** @type {string} */ appName
) => {
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

function validateBaseUrl(baseUrl) {
	try {
		// Intentamos crear una nueva instancia de URL con la baseUrl proporcionada
		const url = new URL(baseUrl);

		// Comprobamos si el protocolo es http o https para considerarla válida
		if (url.protocol === 'http:' || url.protocol === 'https:') {
			return baseUrl; // Es una base URL válida
		}
		return ''; // Si el protocolo no es válido
	} catch (e) {
		// Si hay un error al crear la URL, consideramos que la URL no es válida
		return '';
	}
}

export const getListHandler = async (/** @type {string} */ token) => {
	let f = new uFetch();
	f.setBearerAuthorization(token);
	try {
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
	} catch (error) {
		console.error(error);
		listHandlerStore.set([]);
	}
};

export const getListMethods = async (/** @type {string} */ token) => {
	let f = new uFetch();
	f.setBearerAuthorization(token);
	try {
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
	} catch (error) {
		console.error(error);
		listMethodStore.set([]);
	}
};

export const getCacheSize = async (app_name, token) => {
	let uf = new uFetch();

	try {
		if (app_name) {
			let get_list_cache = await uf.GET({
				url: url_paths.getCacheSize,
				data: { appName: app_name }
			});

			let cache_list = await get_list_cache.json();
			//	storeCacheSize.set(cache_list);
			console.log('>>>>>> Cache size', cache_list);
		}
	} catch (error) {
		console.trace(error);
	}
};

export const getInternalAppMetrics = async (app_name, token) => {
	let uf = new uFetch();

	try {
		if (app_name) {
			let get_list_metrics = await uf.GET({
				url: url_paths.getInternalAppMetrics,
				data: { appName: app_name }
			});

			let metrics_list = await get_list_metrics.json();

			if (Array.isArray(metrics_list)) {
				let data_size = {};
				let data_statusCode = {};
				for (let i = 0; i < metrics_list.length; i++) {
					//console.log('Iteration number: ' + i);
					data_size[metrics_list[i].idendpoint] = metrics_list[i].cache_size;
					data_statusCode[metrics_list[i].idendpoint] = metrics_list[i].statusCode;
				} /*
				let data_size = metrics_list.map((m) => {
					return { idendpoint: m.idendpoint, cache_size: m.cache_size };
				});
				*/
				//console.log(data_size);
				storeCacheSize.set(data_size);
				storeCountResponseStatusCode.set(data_statusCode);
			}

			//storeCacheSize.set(cache_list);
			//	console.log('>>>>>> Metrics ', metrics_list);

			/*
			storeCacheSize.update((value) => {
				//alert('++++++++++++ '+JSON.stringify(m.data));
				value[m.data.idendpoint] = m.data.cache_size;
				//	console.log("++++++ Actualizando datos de la app por evento websocket", value);
				return value;
			});
			*/
		}
	} catch (error) {
		console.trace(error);
	}
};

export const defaultValuesIntervalTask = (task) => {
	if (task == null) {
		task = {
			idtask: undefined,
			idendpoint: undefined,
			name: '',
			description: '',
			enabled: false,
			interval: 3600,
			datestart: new Date(),
			exec_time_limit: 30,
			failed_attempts: 0,
			status: 0
		};
	}

	task = {
		idtask: task.idtask || null,
		idendpoint: task.idendpoint || null,
		enabled: task.enabled || false,
		interval: task.interval || 3600,
		datestart: task.datestart || new Date(),
		exec_time_limit: task.exec_time_limit || 30,
		failed_attempts: task.failed_attempts || 0,
		status: task.status || 0
	};

	return task;
};

export const defaultValuesApp = (app) => {
	if (app == null) {
		app = { app: '', params: { telegram: {} } };
	}

	if (app && app.idapp == null) {
		app.idapp = 0;
	}

	if (app && app.app == null) {
		app.app = '';
	}

	if (app && app.environment == null) {
		app.environment = 'dev';
	}

	if (app && app.description == null) {
		app.description = '';
	}

	if (app && app.endpoints == null) {
		app.endpoints = [];
	}

	if (app && app.params == null) {
		app.params = { telegram: { idgroup: '' } };
	}

	if (app && app.params.telegram == null) {
		app.params.telegram = { idgroup: '' };
	}

	if (app && app.params.telegram && app.params.telegram.idgroup == null) {
		app.params.telegram.idgroup = '';
	}

	if (app && app.vars == null) {
		app.vars = {};
	}

	return app;
};

export const defaultValuesRow = (row) => {
	if (row == null) {
		row = {};
	}

	if (row && row.idendpoint == null) {
		row.idendpoint = undefined;
	}

	if (row && row.enabled == null) {
		row.enabled = false;
	}

	if (row && row.access == null) {
		row.access = 0;
	}

	if (row && row.environment == null) {
		row.environment = 'dev';
	}

	if (row && row.resource == null) {
		row.resource = '';
	}

	if (row && row.method == null) {
		row.method = 'GET';
	}

	if (row && row.handler == null) {
		row.handler = 'NA';
	}

	if (row && row.cors == null) {
		row.cors = {};
	}

	if (row && row.code == null) {
		row.code = '';
	}

	if (row && row.description == null) {
		row.description = '';
	}

	if (row && row.description == null) {
		row.description = '';
	}

	if (row && row.headers_test == null) {
		row.headers_test = {};
	}

	if (row && row.data_test == null) {
		row.data_test = {};
	}

	if (row && row.rowkey == null) {
		row.rowkey = 0;
	}

	if (row && row.cache_time == null) {
		row.cache_time = 0;
	}

	if (row && !row.environment) {
		row.environment = '?';
	}

	if (row && !row.endpoint) {
		row.endpoint = '';
	}

	if (row && !row.method) {
		row.method = '';
	}

	if (row && !row.handler) {
		row.handler = '';
	}
	if (row && row.ctrl == null) {
		row.ctrl = {};
	}

	if (row && row.ctrl.users == null) {
		row.ctrl.users = [];
	}

	if (row && row.ctrl.log == null) {
		row.ctrl.log = {};
	}

	if (row && row.data_test == null) {
		row.data_test = { query: {}, body: {}, headers: {}, auth: {} };
	}

	if (row && row.data_test.query == null) {
		row.data_test.query = {};
	}

	if (row && row.data_test.body == null) {
		row.data_test.body = {};
	}

	if (row && row.data_test.headers == null) {
		row.data_test.headers = {};
	}

	if (row && row.data_test.auth == null) {
		row.data_test.auth = {};
	}

	return row;
};

export const getCountStatusCode = async (app_name, token) => {
	let uf = new uFetch();
	//uf.setBearerAuthorization(token);
	try {
		if (app_name) {
			let get_list = await uf.GET({
				url: url_paths.getResponsesCountStatusCode,
				data: { appName: app_name }
			});

			let list = await get_list.json();
			storeCountResponseStatusCode.set(list);
		}
	} catch (error) {
		console.error(error);
	}
};

export const getLogs = async (options, token) => {
	let uf = new uFetch();
	//uf.setBearerAuthorization(token);
	try {
		let get_list = await uf.GET({
			url: url_paths.getLogs,
			data: options
		});

		let list = await get_list.json();
		return list;
	} catch (error) {
		console.error(error);
		return [];
	}
};

/**
 * @param {string} string_url
 */
export function validateURL(string_url) {
	const patron = /^\/[a-zA-Z0-9\-._~%]+(\/[a-zA-Z0-9\-._~%]+)*\/?$/;
	// ^ Inicio de la cadena
	// \/ Barra inicial
	// [a-zA-Z0-9\-._~%]+ Uno o más caracteres permitidos en la ruta
	// (\/[a-zA-Z0-9\-._~%]+)* Cero o más grupos adicionales de barra seguido de caracteres permitidos
	// \/? Barra opcional al final
	// $ Fin de la cadena

	if (patron.test(string_url)) {
		return true;
	} else {
		return false;
	}
}

export function createEndpoint(method, app, resource, environment) {
	return `${method == 'WS' ? '/ws/' : '/api/'}${app}${resource}/${environment}`;
}

export const listAccessMethod = [
	{ value: 'Public', id: 0 },
	{ value: 'Basic', id: 1 },
	{ value: 'Bearer', id: 2 },
	{ value: 'Basic & Bearer', id: 3 }
];
export const listHTTPMethods = {
	GET: { color: 'primary', icon: 'fa-brands fa-get-pocket' },
	POST: { color: 'link', icon: 'fa-solid fa-signs-post' },
	DELETE: { color: 'danger', icon: 'fa-solid fa-trash' },
	PUT: { color: 'info', icon: 'fa-solid fa-file-pen' },
	WS: { color: 'warning', icon: 'fa-solid fa-tower-broadcast' }
};

export const listHandlers = {
	JS: { color: 'success', icon: 'fa-brands fa-js', label: 'Javascript' },
	SQL: { color: 'link', icon: 'fa-solid fa-database', label: 'SQL' },
	SQL_BULK_I: { color: 'danger', icon: 'fa-solid fa-database', label: 'SQL BULK INSERT' },
	HANA: { color: '', icon: 'fa-solid fa-database', label: 'Hana' },
	FETCH: { color: 'primary', icon: 'fa-solid fa-globe', label: 'Fetch' },
	SOAP: { color: 'info', icon: 'fa-solid fa-soap', label: 'SOAP' },
	TEXT: { color: 'warning', icon: 'fa-regular fa-file-lines', label: 'Text' },
	FUNCTION: { color: 'danger', icon: 'fa-solid fa-robot', label: 'Function' },
	MONGODB: { color: '', icon: 'fa-solid fa-database', label: 'MongoDB' },
	MCP: { color: 'danger', icon: 'fa-solid fa-plug fa-bounce', label: 'MCP' }
};

export const listEnv = {
	prd: {
		color: ' has-text-success ',
		background: 'success',
		icon: ' fa-solid fa-check ',
		label: 'Production'
	},
	qa: {
		color: ' has-text-warning ',
		background: 'warning',
		icon: ' fa-solid fa-eye ',
		label: 'Quality'
	},
	dev: {
		color: ' has-text-danger ',
		background: 'danger',
		icon: ' fa-solid fa-bug ',
		label: 'Development'
	}
};

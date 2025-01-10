// @ts-ignore
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
	getLogs: host + '/api/system/system/log/prd'
};

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
	//uf.setBearerAuthorization(token);
	try {
		//      console.log("getListApps > ", $userStore, uf);
		if (app_name) {
			let get_list_cache = await uf.GET({
				url: url_paths.getCacheSize,
				data: { appName: app_name }
			});

			let cache_list = await get_list_cache.json();
			storeCacheSize.set(cache_list);
		}
	} catch (error) {
		console.trace(error);
	}
};

export const getCountStatusCode = async (app_name, token) => {
	let uf = new uFetch();
	//uf.setBearerAuthorization(token);
	try {
		//      console.log("getListApps > ", $userStore, uf);
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

export const css_handlers = {
	FETCH: { css: ' is-primary  ', label: ' Fetch ', icon: ' fa-solid fa-server ' },
	JS: { css: ' is-dark ', label: ' Javascript ', icon: ' fa-brands fa-square-js ' },
	SOAP: { css: ' is-warning ', label: ' SOAP ', icon: ' fa-solid fa-soap ' },
	SOAPFn: { css: ' is-warning ', label: ' SOAP FUNCTION', icon: ' fa-solid fa-soap ' },
	SQL: { css: ' is-link ', label: ' SQL ', icon: 'fa-solid fa-database ' },
	TEXT: { css: ' is-success ', label: ' TEXT ', icon: 'fa-regular fa-file-lines ' },
	FUNCTION: { css: ' is-info  ', label: ' Function ', icon: ' fa-brands fa-node-js ' }
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
	FUNCTION: { color: 'danger', icon: 'fa-solid fa-robot', label: 'Function' }
};

export const listEnv = {
	prd: {
		color: ' has-text-success ',
		background: 'success',
		icon: ' fa-solid fa-gear fa-spin ',
		label: 'Production'
	},
	qa: { color: ' has-text-link ', background: 'link', icon: ' fa-solid fa-eye ', label: 'Quality' },
	dev: {
		color: ' has-text-danger ',
		background: 'danger',
		icon: ' fa-solid fa-bug ',
		label: 'Development'
	}
};

// @ts-ignore
import uFetch from '@edwinspire/universal-fetch';
import { writable } from 'svelte/store';
import { PUBLIC_API_SERVER_HOST } from '$env/static/public';

const host = PUBLIC_API_SERVER_HOST || '';

export const url_paths = {
	getfunctions: host + '/api/system/functions/prd',
	getHandler: host + '/api/system/system/handler/0.01/prd',
	Methods: host + '/api/system/system/method/0.01/prd',
	listEnv: host + '/api/system/system/environment/0.01/prd',
	listApps: host + '/api/system/api/apps/0.01/prd',
	getApp: host + '/api/system/api/app/0.01/prd',
	saveApp: host + '/api/system/api/app/0.01/prd',
	saveMethod: host + '/api/system/system/method/0.01/prd',
	login: host + '/api/system/system/login/0.01/prd',
	getCacheSize: host + '/api/system/cache/response/size'
};

//const path_functions = '/system/main/functions';

//export const tokenStore = writable('');
export const userStore = writable({});
export const listMethodStore = writable({});
export const listHandlerStore = writable({});
export const listFunctionStoreDev = writable({});
export const listFunctionStoreQA = writable({});
export const listFunctionStorePRD = writable({});
export const listAppVars = writable({});

export const formatJsonForHtmlCode = (/** @type {any} */ json) => {
	return JSON.stringify(json, null, 2).replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
};

export const getListFunction = async (
	/** @type {string} */ token,
	/** @type {string} */ appName
) => {
	// @ts-ignore
	let f = new uFetch();
	f.setBearerAuthorization(token);
	try {
		let fr = await f.get(url_paths.getfunctions, { appName: appName, environment: 'dev' });
		let list = await fr.json();

		if (list && Array.isArray(list)) {
			let data = list.map((fn) => {
				return { id: fn, value: fn };
			});
			listFunctionStoreDev.set(data);
		}
	} catch (error) {
		console.error(error);
	}
	////////////////////////////////////
	try {
		let fr = await f.get(url_paths.getfunctions, { appName: appName, environment: 'qa' });
		let list = await fr.json();

		if (list && Array.isArray(list)) {
			let data = list.map((fn) => {
				return { id: fn, value: fn };
			});
			listFunctionStoreQA.set(data);
		}
	} catch (error) {
		console.error(error);
	}
	////////////////////////////////////
	try {
		let fr = await f.get(url_paths.getfunctions, { appName: appName, environment: 'prd' });
		let list = await fr.json();

		if (list && Array.isArray(list)) {
			let data = list.map((fn) => {
				return { id: fn, value: fn };
			});
			listFunctionStorePRD.set(data);
		}
	} catch (error) {
		console.error(error);
	}
};

export const getListHandler = async (/** @type {string} */ token) => {
	let f = new uFetch();
	f.setBearerAuthorization(token);
	try {
		let fr = await f.get(url_paths.getHandler);
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

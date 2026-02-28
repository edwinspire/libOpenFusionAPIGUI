import { get } from 'svelte/store';
import { listHandlerStore } from './stores.js';

export const getHandlerParams = (handler) => {
	const list = get(listHandlerStore); // ← obtiene el valor actual del store
	return Array.isArray(list) ? list.find((item) => item.id == handler) : {};
};

export const isNewApp = (idapp) => {
	if (typeof idapp === 'string' && idapp.trim().length > 5) {
		console.log('Basic cargar idapp: ', idapp);
		return false;
	} else {
		console.log('Basic nueva idapp:', idapp);
		return true;
	}
};

export const equalObjs = (value, new_value) => {
	let new_value_str = typeof new_value == 'object' ? JSON.stringify(new_value) : new_value;
	let currect_value_str = typeof value == 'object' ? JSON.stringify(value) : value;
	return new_value_str == currect_value_str;
};

export const jsonToHtmlString = (obj) => {
	// Convierte el objeto en JSON con identación (2 espacios)
	let jsonString = JSON.stringify(obj, null, 2);

	// Divide en líneas, convierte espacios a &nbsp; y luego vuelve a unir con <br>
	return jsonString
		.split('\n')
		.map((line) => line.replace(/ /g, '&nbsp;')) // espacios → &nbsp;
		.join('<br>'); // saltos → <br>
};

export const TimeOutChangeValue = (idTimeout, fn_handler, timeout = 600) => {
	clearTimeout(idTimeout);
	return setTimeout(() => {
		fn_handler();
	}, timeout);
};

export const defaultValuesEndpointRow = (row) => {
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

export function createEndpoint(method, app, resource, environment) {
	return `${method == 'WS' ? '/ws/' : '/api/'}${app}${resource}/${environment}`;
}

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

export const mergeSourceOverwrite = (target, source) => {
	// Early return para casos triviales
	if (target === source) return target;
	if (source == null || typeof source !== 'object') return target;
	if (target == null || typeof target !== 'object') return source;

	const isPlainObject = (val) =>
		val !== null &&
		typeof val === 'object' &&
		!Array.isArray(val);

	// Clon superficial del target (NO se muta el original)
	const result = { ...target };

	for (const key of Object.keys(source)) {
		const srcVal = source[key];
		const tarVal = target[key];

		if (isPlainObject(tarVal) && isPlainObject(srcVal)) {
			// Merge profundo inmutable
			result[key] = mergeSourceOverwrite(tarVal, srcVal);
		} else {
			// Overwrite directo
			result[key] = srcVal;
		}
	}

	return result;
};


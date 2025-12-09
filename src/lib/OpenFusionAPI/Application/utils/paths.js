import { PUBLIC_API_SERVER_HOST } from '$env/static/public';

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

const host = validateBaseUrl(PUBLIC_API_SERVER_HOST || '');

export const url_paths = {
	app: host + '/api/system/api/app/prd',
	apps_get_list: host + '/api/system/api/apps/prd',
	endpoint: host + '/api/system/api/endpoint/prd',
	endpoints_get_by_idapp: host + '/api/system/api/app/endpoints/prd',
	wsServerEvents: host + '/ws/system/websocket/server/prd',
	environment: host + '/api/system/system/environment/prd',
	serverAPIVersion: host + '/server/version',
	clearCache: host + '/api/system/cache/clear/prd',
	login: host + '/api/system/system/login/prd',
	getHandler: host + '/api/system/system/handler/0.01/prd',
	Methods: host + '/api/system/system/method/0.01/prd',
	apiDoc: host + '/api/system/api/handler/documentation/prd',
	getlistFunctionsVarsJS: host + '/api/system/system/handler/js/funtions/prd',
	getLogs: host + '/api/system/system/log/prd',
	getListIntervalTasksByIdApp: host + '/api/system/interval_tasks/byidapp/prd',
	upsertIntervalTasksByIdTask: host + '/api/system/interval_tasks/upsert/prd',
	deleteIntervalTasksByIdTask: host + '/api/system/interval_tasks/delete/prd',
	getfunctions: host + '/api/system/api/function_names/prd',
	serverAPIVersion: host + '/api/system/server/version/prd',
	appBackup: host + '/api/system/app/backup/prd',
	appDocumentation: host + '/api/system/app/documentation/prd',
	appvarsbyidapp: host + '/api/system/app/variables/idapp/prd',
	appvar: host + '/api/system/app/var/prd',
	getLogsRecordsPerMinute: host + '/api/system/system/log/recordsperminute/prd',
	changeUserPassword: host + '/api/system/user/changepassword/prd',
	restoreSystemEndpoints: host + '/api/system/restore/prd'
};

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

export const Environment = [
	{
		id: 'dev',
		value: `Development`,
		color: ' has-text-danger ',
		background: 'danger',
		icon: ' fa-solid fa-bug '
	},
	{
		id: 'qa',
		value: `Quality`,
		color: ' has-text-warning ',
		background: 'warning',
		icon: ' fa-solid fa-eye '
	},
	{
		id: 'prd',
		value: `Production`,
		color: ' has-text-success ',
		background: 'success',
		icon: ' fa-solid fa-check '
	}
];

export const defaultApp = {
	vars: {
		dev: {},
		qa: {},
		prd: {}
	},
	params: {},
	idapp: undefined,
	app: '',
	rowkey: 0,
	iduser: null,
	enabled: false,
	description: ''
};

export const defaultEndpoint = {
	enabled: false,
	endpoint: '',
	access: 0,
	method: 'GET',
	handler: 'NA',
	mcp: {},
	cache_time: 0,
	ctrl: {
		admin: true,
		users: [],
		log: {}
	},
	resource: '',
	code: '',
	idapp: 0,
	description: '',
	idendpoint: 0,
	cors: {},
	headers_test: {},
	data_test: {
		query: [
			{
				enabled: false,
				key: '',
				value: ''
			}
		],
		body: {
			selection: 0
		},
		headers: {},
		auth: {
			selection: 0
		}
	},
	latest_updater: null,
	environment: 'dev',
	json_schema: {
		in: {
			enabled: false,
			schema: {
				type: 'object',
				properties: {},
				additionalProperties: true
			}
		},
		out: {
			enabled: false,
			schema: {
				type: 'object',
				properties: {},
				additionalProperties: true
			}
		}
	}
};


export const defaultValuesIntervalTask = (task) => {
};
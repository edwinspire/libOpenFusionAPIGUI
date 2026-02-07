<script module>
	import { ColumnTypes } from '@edwinspire/svelte-components';
	import cellPath from './cellPath.svelte';
	import CellAccess from './cellAccess.svelte';
	import CellMethod from './cellMethod.svelte';
	import cellHandler from './cellHandler.svelte';
	import cellMCPTool from './cellMCPTool.svelte';
	import cellCacheTime from './cellCacheTime.svelte';
	import cellCountStatusCode from './cellCountStatusCode.svelte';

	export const endpointColumns = $state({
		//enabled: { label: 'Enabled App' },
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					custom: {
						ontrue: { label: 'Enabled' },
						onfalse: { label: 'Unabled' },
						editInline: true
					}
				}
			}
		},

		endpoint: { label: 'Endpoint', decorator: { component: cellPath } },
		access: {
			label: 'Access',
			decorator: {
				component: CellAccess
			}
		},
		method: { decorator: { component: CellMethod }, label: 'Method' },
		handler: { decorator: { component: cellHandler }, label: 'Handler' },
		mcp: { decorator: { component: cellMCPTool }, label: 'MCP Tool' },

		cache_time: { label: 'Cache Time', decorator: { component: cellCacheTime } },
		ctrl: { hidden: true, label: 'Users' },
		resource: { hidden: true },

		code: { label: 'Code', hidden: true },
		idapp: { hidden: true },
		rowkey: { decorator: { component: cellCountStatusCode }, label: 'Status Code' },
		app: { hidden: true },
		namespace: { hidden: true },
		name: { hidden: true },
		version: { hidden: true },
		description: { hidden: true },
		vars: { hidden: true },
		idendpoint: { hidden: true },
		cors: { hidden: true },
		headers_test: { hidden: true },
		data_test: { hidden: true },
		latest_updater: { hidden: true },
		environment: { hidden: true },
		price_by_request: { hidden: true },
		price_kb_request: { hidden: true },
		custom_data: { hidden: true },
		keywords: { hidden: true },
		cache_size: { hidden: true },
		docs: { hidden: true },
		title: { hidden: true },
		json_schema: { hidden: true },
		price_kb_response: { hidden: true },
		createdAt: { hidden: true },
		timeout: { hidden: true },
		//updatedAt: { hidden: false },
		price_total: { hidden: true }
	});
</script>

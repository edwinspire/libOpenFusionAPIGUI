<script>
	import { untrack } from 'svelte';
	import {
		SlideFullScreen,
		Tab,
		EditorCode,
		Input,
		MarkdownViewer,
		RESTTester
	} from '@edwinspire/svelte-components';
	import FetchCode from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/fetch.svelte';
	import JsCode from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/js.svelte';
	import SoapCode from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/soap.svelte';
	import SqlCode from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/sql.svelte';
	import AgentIA from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/agentia.svelte';
	import SqlBulkInsert from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/sqlBulkInsert.svelte';
	import SqlHana from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/sqlHana.svelte';
	import TextCode from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/text.svelte';
	import MongoDB from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/mongodb.svelte';
	import CustomFn from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/customFunction.svelte';
	import Endpoint from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/endpoint.svelte';
	import Authorizations from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/authorizations.svelte';
	import Logs from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/logs.svelte';
	import Backups from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/endpoint_bkp.svelte';
	import TelegramBot from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/telegramBot.svelte';
	import MCP from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/mcp.svelte';
	import EndpointLabel from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/endpoint_label.svelte';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import AppVars from '$lib/OpenFusionAPI/Application/widgets/application_variables/variables.svelte';
	import { defaultEndpoint } from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import { mergeSourceOverwrite } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { getHandlerDocs, EndpointSave } from '$lib/OpenFusionAPI/Application/utils/request.js';
	import SaveDeploy from '$lib/OpenFusionAPI/Application/widgets/common/saveDeploy.svelte';

	let { showEditor = $bindable(false), onsave = (d) => {}, oncopy = () => {} } = $props();

	let json_schema_in_enabled = $state(false);
	let json_schema_in_schema = $state({});
	let endpoint = $state(structuredClone(defaultEndpoint));
	let app = $state({});
	let idendpoint = $state();

	let markdown_docs = $state('');

	let deploying = $state({ show: false, message: '', error: false });

	// Cache del último handler consultado para evitar re-fetch innecesarios
	// NOTA: getHandlerDocsRequest() se llama directamente desde setValuesEndpoint().
	// Este efecto sólo actúa cuando el handler cambia manualmente en el editor,
	// sin recargar el endpoint completo, para no duplicar la llamada inicial.
	let lastHandlerDocs = '';
	$effect(() => {
		const h = endpoint.handler;
		untrack(() => {
			if (h && h !== lastHandlerDocs) {
				lastHandlerDocs = h;
				// Solo disparar si el endpoint ya está cargado (idendpoint definido)
				if (idendpoint) {
					getHandlerDocsRequest().catch((e) => console.error('getHandlerDocs:', e));
				}
			}
		});
	});

	export function setData(data) {
		app = data.app || {};
		idendpoint = data.idendpoint || undefined;
		setValuesEndpoint();
	}

	async function setValuesEndpoint() {
		//console.warn($state.snapshot(endpoint), defaultEndpoint);
		if (app && app.endpoints && idendpoint) {
			let ep_found = app.endpoints.find((ep) => ep.idendpoint == idendpoint);

			if (ep_found) {
				// Se hace una copia del default porque se estaba sobreescribiendo
				endpoint = mergeSourceOverwrite(structuredClone(defaultEndpoint), ep_found);

				// Ensure json_schema structure exists
				endpoint.json_schema ??= {};
				endpoint.json_schema.in ??= {};
				endpoint.json_schema.in.enabled ??= false;
				endpoint.json_schema.in.schema ??= {};

				// Ensure other critical structures exist
				endpoint.custom_data ??= {};
				endpoint.mcp ??= {};
				endpoint.ctrl ??= {};
				endpoint.ctrl.users ??= [];
				endpoint.ctrl.log ??= {};
				endpoint.data_test ??= {};

				// Get Handler Docs (actualizar cache para evitar re-fetch del $effect)
				lastHandlerDocs = endpoint.handler;
				await getHandlerDocsRequest();
			} else {
				//Notification.error('Endpoint not found');
				clearValues();
			}
		} else {
			//Notification.error('Application not found');
			clearValues();
		}
	}

	async function saveEndpoint() {
		// $state.snapshot() ya produce un objeto plano con todas las propiedades;
		// no se requieren asignaciones adicionales.
		let endpoint_out = $state.snapshot(endpoint);

		deploying = { show: true, message: 'Saving Endpoint...', error: false };
		try {
			let resp = await EndpointSave(endpoint_out, $userStore.token);
			let response = resp.result;

			if (response && response.idapp == app.idapp) {
				deploying.show = false;
				showEditor = false;
				onsave();
			} else {
				deploying.error = true;
				deploying.message = `Error: ${resp.message}`;
			}
		} catch (error) {
			console.error(error);
			deploying.error = true;
			deploying.message = `Error: ${error.message}`;
		}
	}

	let validateResource = $state(false);
	let availableURL = $state(false);

	let tabList = $state([
		{
			name: 'endpoint',
			label: 'Endpoint',
			isActive: true,
			component: tab_endpoint,
			classIcon: ' fa-solid fa-network-wired '
		},
		{ name: 'docs', label: 'Documentation', component: tab_docs, classIcon: ' fa-solid fa-book ' },
		{
			name: 'config',
			label: 'Configuration',
			component: tab_config,
			classIcon: ' fa-solid fa-screwdriver-wrench '
		},
		{
			name: 'app_vars',
			label: 'Application Variables',
			component: tab_app_vars,
			classIcon: ' fa-solid fa-square-root-variable '
		},
		{ name: 'json_schema', label: 'JSON Schema', component: tab_json_schema },
		{ name: 'auth', label: 'Authorizations', component: tab_auth, classIcon: ' fa-solid fa-key ' },
		{ name: 'mcp', label: 'MCP', component: tab_mcp, classIcon: ' fa-solid fa-robot ' },
		{
			name: 'custom_data',
			label: 'Custom Data',
			component: tab_custom_data,
			classIcon: ' fa-regular fa-hand '
		},
		{ name: 'price', label: 'Price', component: tab_price, classIcon: ' fa-solid fa-tag ' },
		{
			name: 'tester',
			label: 'Tester',
			component: tab_tester,
			classIcon: ' fa-solid fa-microscope '
		},
		{
			name: 'backups',
			label: 'Backups',
			component: tab_backups,
			classIcon: ' fa-solid fa-list-check '
		},
		{ name: 'logs', label: 'Logs', component: tab_log }
	]);

	/** Mapa de handler → tabs permitidas. Sin entrada = todas las tabs. */
	const HANDLER_TABS = {
		MCP:          new Set(['endpoint', 'docs', 'tester', 'backups', 'logs']),
		NOAPPLY:      new Set(['endpoint']),
		'No Handler': new Set(['endpoint']),
		NA:           new Set(['endpoint']),
		TELEGRAM_BOT: new Set(['endpoint', 'config', 'docs', 'app_vars', 'auth', 'price', 'tester', 'backups', 'logs']),
		FUNCTION:     new Set(['endpoint', 'config', 'docs', 'auth', 'mcp', 'price', 'tester', 'backups', 'logs', 'json_schema']),
		SOAP:         new Set(['endpoint', 'config', 'docs', 'auth', 'price', 'tester', 'backups', 'logs', 'json_schema', 'app_vars', 'mcp']),
		SQL_BULK_I:   new Set(['endpoint', 'config', 'docs', 'auth', 'price', 'tester', 'backups', 'logs', 'json_schema', 'app_vars', 'mcp']),
		SQL:          new Set(['endpoint', 'config', 'docs', 'auth', 'price', 'tester', 'backups', 'logs', 'json_schema', 'app_vars', 'mcp']),
		HANA:         new Set(['endpoint', 'config', 'docs', 'auth', 'price', 'tester', 'backups', 'logs', 'json_schema', 'app_vars', 'mcp']),
	};

	let derivedtabList = $derived.by(() => {
		if (!app.app) return [];
		const allowed = HANDLER_TABS[endpoint?.handler];
		if (!allowed) return tabList;
		return tabList.filter((tab) => allowed.has(tab.name));
	});

	function clearValues() {
		endpoint = structuredClone(defaultEndpoint);
		endpoint.idapp = app.idapp;
		// Inicializar estructuras anidadas requeridas
		endpoint.json_schema ??= {};
		endpoint.json_schema.in ??= { enabled: false, schema: {} };
		endpoint.custom_data ??= {};
		endpoint.mcp ??= {};
		endpoint.ctrl ??= { users: [], log: {} };
		endpoint.data_test ??= {};
	}

	function onChangeValueHandler(v) {
		console.trace('onChangeValueHandler', v);
		if (v) {
			endpoint.data_test = v.data_test;
			endpoint.code = v.code;
			endpoint.docs = v.docs;
			endpoint.File = v.File;
			
			if (v.custom_data) {
				endpoint.custom_data = v.custom_data;
			}
		}
	}

	/**
	 * Convierte un valor a string y retorna los primeros 1000 caracteres.
	 * Versión con manejo robusto de errores y opciones de configuración.
	 * @param {*} valor - El valor a procesar.
	 * @param {number} maxLength - Cantidad máxima de caracteres (por defecto 1000).
	 * @returns {string} Los primeros N caracteres del string.
	 */
	function getResultLimited(valor, maxLength = 1000) {
		let cadena;

		try {
			// Si ya es un string, usarlo directamente
			if (typeof valor === 'string') {
				cadena = valor;
			}
			// Si es null o undefined
			else if (valor === null) {
				cadena = 'null';
			} else if (valor === undefined) {
				cadena = 'undefined';
			}
			// Si es una función
			else if (typeof valor === 'function') {
				cadena = valor.toString();
			}
			// Si es un objeto o array
			else if (typeof valor === 'object') {
				// Intentar JSON.stringify
				try {
					cadena = JSON.stringify(valor, null, 2);
				} catch (jsonError) {
					// Si falla (referencias circulares, etc.), usar toString()
					cadena = Object.prototype.toString.call(valor);
				}
			}
			// Para número, boolean, symbol, bigint
			else {
				cadena = String(valor);
			}
		} catch (error) {
			// En caso de cualquier error inesperado
			cadena = '[Error al convertir valor]';
		}

		// Retornar los primeros N caracteres
		return cadena.substring(0, maxLength);
	}

	async function getHandlerDocsRequest() {
		if (endpoint?.handler) {
			try {
				let res = await getHandlerDocs(endpoint.handler);
				//	console.log(res);

				if (res && res.markdown) {
					markdown_docs = res.markdown;
				}
			} catch (error) {
				console.error(error);
			}
		}
	}


</script>

{#snippet tab_docs()}
	<MarkdownViewer content_class=" is-small " bind:markdown={markdown_docs}></MarkdownViewer>
{/snippet}

{#snippet tab_endpoint()}
	{#if endpoint && app}
		<Endpoint
			bind:endpoint
			bind:app
			bind:validateResource
			bind:availableURL
			oncopy={(ep) => {
				oncopy(ep);
			}}
		></Endpoint>
	{/if}
{/snippet}

{#snippet tab_app_vars()}
	{#if endpoint && endpoint.idapp}
		<AppVars bind:idapp={endpoint.idapp} environment={endpoint.environment} isReadOnly={true}
		></AppVars>
	{/if}
{/snippet}

{#snippet tab_json_schema()}
	<Input
		label="Enabled"
		type="checkbox"
		bind:value={endpoint.json_schema.in.enabled}
		placeholder="Enabled"
	/>

	<EditorCode
		lang="json"
		showFormat={true}
		bind:code={endpoint.json_schema.in.schema}
		onchange={(datajs) => {
			//	json_schema_in = datajs.code;
		}}
	></EditorCode>

	<div class="block">
		<div class="content is-small">
			<div class="icon-text">
				<span class="icon has-text-info">
					<i class="fas fa-info-circle"></i>
				</span>
				<span>Info</span>
			</div>

			While JSON is probably the most popular format for exchanging data, JSON Schema is the
			vocabulary that enables JSON data consistency, validity, and interoperability at scale.

			<p>
				More information about <a href="https://json-schema.org/">JSON Schema</a> can be found in the
				official documentation.
			</p>
		</div>
	</div>
{/snippet}

{#snippet tab_custom_data()}
	{#if endpoint?.custom_data}
		<EditorCode
			lang="json"
			showFormat={true}
			bind:code={endpoint.custom_data}
			onchange={(datajs) => {
				//	json_schema_in = datajs.code;
			}}
		></EditorCode>
	{/if}
{/snippet}

{#snippet tab_price()}
	<Input
		label="Price by Request (in credits)"
		type="number"
		bind:value={endpoint.price_by_request}
		step="1"
		min="0"
		placeholder="Price by Request"
	/>
	<Input
		label="Price by KB on request (in credits)"
		type="number"
		bind:value={endpoint.price_kb_request}
		step="1"
		min="0"
		placeholder="Price by Request"
	/>
	<Input
		label="Price by KB on response (in credits)"
		type="number"
		bind:value={endpoint.price_kb_response}
		step="1"
		min="0"
		placeholder="Price by Request"
	/>
{/snippet}

{#snippet tab_config()}
	{#if endpoint}
		<div>
			{#if endpoint?.handler == 'JS'}
				<JsCode bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'TELEGRAM_BOT'}
				<TelegramBot bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'SOAP'}
				<SoapCode bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'SQL'}
				<SqlCode bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'HANA'}
				<SqlHana bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'SQL_BULK_I'}
				<SqlBulkInsert bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'FETCH'}
				<FetchCode bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'FUNCTION'}
				<CustomFn bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'TEXT'}
				<TextCode bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'MONGODB'}
				<MongoDB bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'AGENT_IA'}
				<AgentIA bind:endpoint onchange={onChangeValueHandler} />
			{:else if endpoint?.handler == 'NOAPPLY' || endpoint?.handler == 'No Handler' || endpoint?.handler == 'NA'}
				<div>No Handler</div>
			{:else}
				<div>No Handler</div>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet tab_auth()}
	{#if endpoint && endpoint.ctrl}
		<Authorizations bind:users={endpoint.ctrl.users}></Authorizations>
	{/if}
{/snippet}

{#snippet tab_log()}
	{#if endpoint?.ctrl?.log}
		<Logs bind:log={endpoint.ctrl.log} bind:endpoint></Logs>
	{/if}
{/snippet}

{#snippet tab_mcp()}
	{#if endpoint?.mcp}
		<MCP bind:mcp={endpoint.mcp} bind:endpoint></MCP>
	{/if}
{/snippet}

{#snippet endpoint_path()}
	<EndpointLabel
		bind:endpoint={endpoint.endpoint}
		bind:environment={endpoint.environment}
		bind:method={endpoint.method}
		bind:handler={endpoint.handler}
	></EndpointLabel>
{/snippet}

{#snippet tab_backups()}
	{#if endpoint && endpoint.idendpoint}
		<Backups
			bind:idendpoint={endpoint.idendpoint}
			onselect={(backup) => {
				if (backup && backup.idendpoint == endpoint.idendpoint) {
					endpoint = $state.snapshot(backup);
				}
			}}
		></Backups>
	{/if}
{/snippet}

{#snippet tab_tester()}
	<div>
		<RESTTester
			bind:data={endpoint.data_test}
			method={endpoint.method}
			url={endpoint.endpoint}
			methodDisabled={true}
			onchange={(d) => {
				endpoint.data_test = d.data;

				// Limita el tamaño de la respuesta (guard para evitar TypeError si last_response es null)
				if (d.last_response) {
					endpoint.data_test.last_response = {
						data: getResultLimited(d.last_response.data),
						sizeKBResponse: d.last_response.sizeKBResponse,
						MimeType: d.last_response.MimeType
					};
				}
			}}
		></RESTTester>
	</div>
{/snippet}

<SlideFullScreen bind:show={showEditor}>
	<SaveDeploy
		bind:deploying
		left={[endpoint_path]}
		onsavedeploy={async () => {
			if (!validateResource) {
				deploying = { show: true, error: true, message: 'URL is invalid.' };
			} else if (!availableURL) {
				deploying = { show: true, error: true, message: 'URL already exists.' };
			} else if (endpoint.handler == 'FUNCTION' && (!endpoint.code || endpoint.code.length < 1)) {
				deploying = { show: true, error: true, message: 'You have not selected a function.' };
			} else {
				await saveEndpoint();
			}
		}}
		oncancel={() => {
			idendpoint = undefined;
			showEditor = false;
		}}
	></SaveDeploy>

	<Tab
		bind:tabs={derivedtabList}
		onselect={() => {
			//	defaultValues();
		}}
	></Tab>
</SlideFullScreen>

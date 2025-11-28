<script>
	import { onMount, onDestroy } from 'svelte';
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
	import Endpoint from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/handler/endpoint.svelte';
	import Authorizations from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/authorizations.svelte';
	import Logs from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/logs.svelte';
	import MCP from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/mcp.svelte';
	import EndpointLabel from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/endpoint_label.svelte';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import AppVars from '$lib/OpenFusionAPI/Application/widgets/application_variables/variables.svelte';
	import { defaultEndpoint } from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import { mergeSourceOverwrite } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { getHandlerDocs, EndpointSave } from '$lib/OpenFusionAPI/Application/utils/request.js';
	import SaveDeploy from '$lib/OpenFusionAPI/Application/widgets/common/saveDeploy.svelte';

	let { showEditor = $bindable(false), onsave = (d) => {}, oncopy = () => {} } = $props();

	let json_schema_enabled = $state(false);
	let json_schema_in = $state({});
	let endpoint = $state(defaultEndpoint);
	let app = $state({});
	let idendpoint = $state();

	let markdown_docs = $state('');

	let deploying = $state({ show: false, message: '', error: false });
	let timeoutChange;

	export function setData(data) {
		app = data.app || {};
		idendpoint = data.idendpoint || '';
		console.log('=>>', $state.snapshot(data));
		setValuesEndpoint();
	}

	async function setValuesEndpoint() {
		if (app && app.endpoints && idendpoint) {
			let ep_found = app.endpoints.find((ep) => ep.idendpoint == idendpoint);

			if (ep_found) {
				endpoint = mergeSourceOverwrite(defaultEndpoint, ep_found);

				// Get Handler Docs
				await getHandlerDocsRequest();
			} else {
				clearValues();
			}
		} else {
			clearValues();
		}
	}

	async function saveEndpoint() {
		let endpoint_out = $state.snapshot(endpoint);

		//console.log(endpoint_out, $state.snapshot(new_data_endpoint));

		endpoint_out.data_test = new_data_endpoint.data_test;
		endpoint_out.code = new_data_endpoint.code;
		endpoint_out.docs = new_data_endpoint.docs;

		//	console.log('Save Endpoint', endpoint_out);
		deploying = { show: true, message: 'Saving Endpoint...', error: false };
		try {
			let response = await EndpointSave(endpoint_out, $userStore.token);

			if (response && response.idapp == app.idapp) {
				deploying.show = false;
				//	console.log(response);
				onsave();
			} else {
				deploying.error = true;
				deploying.message = `Error: Not saved correctly`;
			}
		} catch (error) {
			console.error(error);
			deploying.error = true;
			deploying.message = `Error: ${error.message}`;
		}
	}

	function doc_app_header() {
		return {
			id: 'qomiKhnfSk',
			type: 'header',
			data: {
				text: `Application: ${app.app}`,
				level: 2
			}
		};
	}

	let doc_endpoint_resource = $state({
		id: 'NsMuckns3e',
		type: 'header',
		data: {
			text: `Resource: ${endpoint.endpoint}`,
			level: 3
		}
	});

	let doc_endpoint_params = {
		id: 'coNrlHnl5r',
		type: 'table',
		data: {
			withHeadings: false,
			stretched: false,
			content: [
				[`<b>Enabled:</b> ${endpoint.enabled}`, `<b>Method: </b> ${endpoint.method}`],
				[`<b>Handler:</b> ${endpoint.handler}`, `<b>Environment: </b> ${endpoint.environment}`],
				[`<b>Access:</b> ${endpoint.access}`, `<b>Handler: </b> ${endpoint.handler}`],
				[`<b>Environment: </b> ${endpoint.environment}`, ``]
			]
		}
	};

	let doc_endpoint_description_label = {
		id: 'TVnfeWbUYi',
		type: 'header',
		data: {
			text: 'Description:',
			level: 3
		}
	};

	let doc_endpoint_description = {
		id: 'sHiRVy9Eyh',
		type: 'paragraph',
		data: {
			text: `${endpoint.description}`,
			level: 3
		}
	};

	let default_docs = [
		doc_app_header(),
		doc_endpoint_resource,
		doc_endpoint_params,
		doc_endpoint_description_label,
		doc_endpoint_description
	];

	let new_data_endpoint = { data_test: {}, code: '', docs: default_docs };

	let validateResource = $state(false);
	let availableURL = $state(false);

	let tabList = $state([
		{ label: 'Endpoint', isActive: true, component: tab_endpoint },
		{ label: 'Documentation', isActive: false, component: tab_docs },
		{ label: 'Configuration', component: tab_config },
		{ label: 'Application Variables', component: tab_app_vars },
		{ label: 'JSON Schema', component: tab_json_schema },
		{ label: 'Authorizations', component: tab_auth },
		{ label: 'MCP', component: tab_mcp },
		{ label: 'Tester', component: tab_tester },
		{ label: 'Logs', component: tab_log }
	]);

	let derivedtabList = $derived.by(() => {
		let new_tabs = tabList;

		if (endpoint?.handler == 'MCP') {
			new_tabs = tabList.filter((tab) => {
				if (
					endpoint.handler == 'MCP' &&
					(tab.label == 'Configuration' || tab.label == 'JSON Schema' || tab.label == 'MCP')
				) {
					// retornamos un nuevo objeto, sin mutar el original
					return false;
				}
				return true;
			});
		} else if (
			endpoint?.handler == 'NOAPPLY' ||
			endpoint?.handler == 'No Handler' ||
			endpoint?.handler == 'NA'
		) {
			new_tabs = tabList.filter((tab) => {
				if (tab.label == 'Endpoint') {
					// retornamos un nuevo objeto, sin mutar el original
					return true;
				}
				return false;
			});
		} else if (endpoint?.handler == 'AGENT_IA') {
			new_tabs = tabList.filter((tab) => {
				if (endpoint.handler == 'AGENT_IA' && tab.label == 'MCP') {
					// retornamos un nuevo objeto, sin mutar el original
					return false;
				}
				return true;
			});
		} else {
			new_tabs = tabList;
		}

		return app.app ? new_tabs : [];
	});

	function clearValues() {
		endpoint = defaultEndpoint;
		endpoint.idapp = app.idapp;
	}

	function onChangeValueHandler(v) {
		if (v) {
			new_data_endpoint.data_test = v.data_test;
			new_data_endpoint.code = v.code;
			new_data_endpoint.docs = endpoint.docs;
			//console.log('onChangeValueHandler > ', $state.snapshot(new_data_endpoint));
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

	onMount(() => {
		//		await getEnvList();
		//	defaultValues();
		//	console.log('Editor endpoint > ', $state.snapshot(endpoint));
	});

	onDestroy(() => {
		clearTimeout(timeoutChange);
	});
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
	<Input label="Enabled" type="checkbox" bind:value={json_schema_enabled} placeholder="Enabled" />

	<EditorCode lang="json" showFormat={true} bind:code={json_schema_in}></EditorCode>

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

{#snippet tab_config()}
	{#if endpoint}
		<div>
			{#if endpoint?.handler == 'JS'}
				<JsCode
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'SOAP'}
				<SoapCode
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
						//console.log('SOAP onchange', v);
					}}
				/>
			{:else if endpoint?.handler == 'SQL'}
				<SqlCode
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'HANA'}
				<SqlHana
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'SQL_BULK_I'}
				<SqlBulkInsert
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'FETCH'}
				<FetchCode
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'FUNCTION'}
				<CustomFn
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'TEXT'}
				<TextCode
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'MONGODB'}
				<MongoDB
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if endpoint?.handler == 'AGENT_IA'}
				<AgentIA
					bind:endpoint
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
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

{#snippet tab_tester()}
	<div>
		<RESTTester
			bind:data={endpoint.data_test}
			method={endpoint.method}
			url={endpoint.endpoint}
			methodDisabled={true}
			onchange={(d) => {
				//	console.log($state.snapshot(d));
				endpoint.data_test = d.data;

				// Limita el tamaño de la respuesta
				endpoint.data_test.last_response = {
					data: getResultLimited(d.last_response.data),
					sizeKBResponse: d.last_response.sizeKBResponse,
					MimeType: d.last_response.MimeType
				};

				//console.log('RESTTester Editor > ', d.data);
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
				alert('URL is invalid.');
			} else if (!availableURL) {
				alert('URL already exists.');
			} else {
				saveEndpoint();
				showEditor = false;
			}
		}}
		oncancel={() => {
			idendpoint = '';
			//console.log('Editor Cancel', idendpoint);
			//clearValues();
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

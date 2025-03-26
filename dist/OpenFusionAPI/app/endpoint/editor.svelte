<script>
	import { onMount } from 'svelte';
	import FetchCode from './handler/fetch.svelte';
	import JsCode from './handler/js.svelte';
	import SoapCode from './handler/soap.svelte';
	import SqlCode from './handler/sql.svelte';
	import SqlBulkInsert from './handler/sqlBulkInsert.svelte';
	import SqlHana from './handler/sqlHana.svelte';
	import TextCode from './handler/text.svelte';
	import MongoDB from './handler/mongodb.svelte';
	import CustomFn from './handler/customFunction.svelte';
	import { Level, SlideFullScreen, Tab, EditorContent } from '@edwinspire/svelte-components';

	import Endpoint from './handler/endpoint.svelte';
	import Authorizations from './widgets/authorizations.svelte';
	import Logs from './widgets/logs.svelte';
	import EndpointLabel from './widgets/endpoint_label.svelte';

	let {
		showEditor = $bindable(false),
		row = {},
		app = $bindable({}),
		ondata = (d) => {},
		oncopy = () => {}
	} = $props();

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

	let doc_row_resource = {
		id: 'NsMuckns3e',
		type: 'header',
		data: {
			text: `Resource: ${row.endpoint}`,
			level: 3
		}
	};

	let doc_row_params = {
		id: 'coNrlHnl5r',
		type: 'table',
		data: {
			withHeadings: false,
			stretched: false,
			content: [
				[`<b>Enabled:</b> ${row.enabled}`, `<b>Method: </b> ${row.method}`],
				[`<b>Handler:</b> ${row.handler}`, `<b>Environment: </b> ${row.environment}`],
				[`<b>Access:</b> ${row.access}`, `<b>Handler: </b> ${row.handler}`],
				[`<b>Environment: </b> ${row.environment}`, ``]
			]
		}
	};

	let doc_row_description_label = {
		id: 'TVnfeWbUYi',
		type: 'header',
		data: {
			text: 'Description:',
			level: 3
		}
	};

	let doc_row_description = {
		id: 'sHiRVy9Eyh',
		type: 'paragraph',
		data: {
			text: `${row.description}`,
			level: 3
		}
	};

	let default_docs = [
		doc_app_header(),
		doc_row_resource,
		doc_row_params,
		doc_row_description_label,
		doc_row_description
	];

	let new_data_row = { data_test: {}, code: '', docs: default_docs };

	let validateResource = $state(false);
	let availableURL = $state(false);

	let tabList = $state([
		//		{ label: 'Documentation', isActive: true, component: tab_docs },
		{ label: 'Endpoint', isActive: true, component: tab_endpoint },
		{ label: 'Configuration', component: tab_config },
		{ label: 'Authorizations', component: tab_auth },
		{ label: 'Logs', component: tab_log }
	]);

	function accept() {
		defaultValues();

		let row_out = $state.snapshot(row);


		row_out.data_test = new_data_row.data_test;
		row_out.code = new_data_row.code;
		row_out.docs = new_data_row.docs;

		let data = {
			row: row_out,
			validateResource,
			availableURL
		};

		
		//console.log('data ->', $state.snapshot(data));

		ondata($state.snapshot(data));
	}

	function clearValues() {
		defaultValues();
		row.method = '';
		row.environment = '?';
		row.endpoint = '';
		row.handler = '';
		row.ctrl = { users: [] };
	}

	function defaultValues() {
		if (!row) {
			row = {};
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

		if (row && row.docs == null) {
			row.docs = { blocks: default_docs };
		}

		if (app == null) {
			app = { endpoints: [] };
		}

		if (app && app.endpoints == null) {
			app.endpoints = [];
		}
	}

	function setDocReadOnly() {
		if (!new_data_row?.docs) {
			new_data_row.docs = default_docs;
		}

		new_data_row.docs.blocks[0] = doc_app_header();
		new_data_row.docs.blocks[1] = doc_row_resource;
		new_data_row.docs.blocks[2] = doc_row_params;
		new_data_row.docs.blocks[4] = doc_row_description;
	}

	function onChangeValueHandler(v) {
		if (v) {
			new_data_row.data_test = v.data_test;
			new_data_row.code = v.code;
			//		new_data_row.docs = row.docs;
			console.log('onChangeValueHandler > ', $state.snapshot(new_data_row));
		}
	}

	onMount(() => {
		//		await getEnvList();
		defaultValues();
		//	console.log('Editor row > ', $state.snapshot(row));
	});
</script>

{#snippet tab_endpoint()}
	{#if row && app}
		<Endpoint
			bind:row
			bind:app
			bind:validateResource
			bind:availableURL
			oncopy={(ep) => {
				oncopy(ep);
			}}
		></Endpoint>
	{/if}
{/snippet}

{#snippet tab_docs()}
	<EditorContent
		bind:content={new_data_row.docs}
		readOnly={true}
		onchange={(doc) => {
			console.log('onchange', doc);
			new_data_row.docs = doc;
			setDocReadOnly();
		}}
	></EditorContent>
{/snippet}

{#snippet tab_config()}
	{#if row}
		<div>
			{#if row && row.handler == 'JS'}
				<JsCode
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'SOAP'}
				<SoapCode
					{row}
					onchange={(v) => {
						onChangeValueHandler(v);
						console.log('SOAP onchange', v);
					}}
				/>
			{:else if row && row.handler == 'SQL'}
				<SqlCode
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'HANA'}
				<SqlHana
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'SQL_BULK_I'}
				<SqlBulkInsert
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'FETCH'}
				<FetchCode
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'FUNCTION'}
				<CustomFn
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'TEXT'}
				<TextCode
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else if row && row.handler == 'MONGODB'}
				<MongoDB
					bind:row
					onchange={(v) => {
						onChangeValueHandler(v);
					}}
				/>
			{:else}
				<div>No Handler</div>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet tab_auth()}
	{#if row && row.ctrl}
		<Authorizations bind:users={row.ctrl.users}></Authorizations>
	{/if}
{/snippet}

{#snippet tab_log()}
	{#if row && row.ctrl}
		<Logs bind:log={row.ctrl.log} bind:row></Logs>
	{/if}
{/snippet}

<SlideFullScreen bind:show={showEditor}>
	<Level left={[endpoint_path]} right={[r01]}>
		{#snippet endpoint_path()}
			<EndpointLabel
				bind:endpoint={row.endpoint}
				bind:environment={row.environment}
				bind:method={row.method}
				bind:handler={row.handler}
			></EndpointLabel>
		{/snippet}

		{#snippet r01()}
			<div class="field has-addons">
				<p class="control">
					<button
						class="button is-success is-small"
						onclick={() => {
							if (!validateResource) {
								alert('URL is invalid.');
							} else if (!availableURL) {
								alert('URL already exists.');
							} else {
								accept();
								showEditor = false;
							}
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-check"></i>
						</span>
						<span>Accept</span>
					</button>
				</p>
				<p class="control">
					<button
						class="button is-small"
						onclick={() => {
							console.log('Editor Cancel', $state.snapshot(row.data_test));
							clearValues();
							showEditor = false;
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-xmark"></i>
						</span>
						<span>Cancel</span>
					</button>
				</p>
			</div>
		{/snippet}
	</Level>

	<Tab
		bind:tabs={tabList}
		onselect={() => {
			defaultValues();
		}}
	></Tab>
</SlideFullScreen>

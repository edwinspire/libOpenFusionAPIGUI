<script>
	// @ts-nocheck

	'use strict';
	import { onMount } from 'svelte';
	import FetchCode from './handler/fetch.svelte';
	import JsCode from './handler/js.svelte';
	import SoapCode from './handler/soap.svelte';
	import SqlCode from './handler/sql.svelte';
	import SqlBulkInsert from './handler/sqlBulkInsert.svelte';
	import SqlHana from './handler/sqlHana.svelte';
	import TextCode from './handler/text.svelte';
	import CustomFn from './handler/customFunction.svelte';
	import { Level, SlideFullScreen, Tab } from '@edwinspire/svelte-components';

	import Endpoint from './handler/endpoint.svelte';
	import Authorizations from './widgets/authorizations.svelte';
	import Logs from './widgets/logs.svelte';
	import EndpointLabel from './widgets/endpoint_label.svelte';

	let {
		showEditor = $bindable(false),
		row = $bindable({}),
		app = $bindable({}),
		ondata = (d) => {
			console.log('ondata not implemented.');
		}
	} = $props();

	//let value = $state();
	let handler_code = [];
	let validateResource = $state(false);
	let availableURL = $state(false);

	let tabList = $state([
		{ label: 'Endpoint', isActive: true, component: tab_endpoint },
		{ label: 'Configuration', component: tab_config },
		{ label: 'Authorizations', component: tab_auth },
		{ label: 'Logs', component: tab_log }
	]);
	//	const dispatch = createEventDispatcher();

	//$: row, defaultValues();

	$inspect(row).with((type) => {
		//	console.log('++++ row >>>>>>>>>>>>> ', type, row);
		if (type === 'init') {
			defaultValues();
		}
	});

	function accept() {
		defaultValues();
		let data = {
			row: $state.snapshot(row),
			validateResource,
			availableURL
		};

		console.log('ACCEPT => ', data);

		//dispatch('data', data);
		ondata(data);
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

		if (!app) {
			app = { endpoints: [] };
		}

		if (app && !app.endpoints) {
			app.endpoints = [];
		}

		//		console.log('row defaultValues', row);
	}

	onMount(() => {
		//		await getEnvList();
		defaultValues();
	});
</script>

{#snippet tab_endpoint()}
	{#if row && app}
		<Endpoint bind:row bind:app bind:validateResource bind:availableURL></Endpoint>
	{/if}
{/snippet}

{#snippet tab_config()}
	{#if row}
		<div>
			{#if row && row.handler == 'JS'}
				<JsCode
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'SOAP'}
				<SoapCode
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'SQL'}
				<SqlCode
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'HANA'}
				<SqlHana
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'SQL_BULK_I'}
				<SqlBulkInsert
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'FETCH'}
				<FetchCode
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'FUNCTION'}
				<CustomFn
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
					}}
				/>
			{:else if row && row.handler == 'TEXT'}
				<TextCode
					bind:row
					onchange={(v) => {
						handler_code[row.handler] = v;
						//console.log('----------------> ', handler_code);
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
	{#if row && row.ctrl && row.ctrl.log}
		<Logs bind:row bind:log={row.ctrl.log}></Logs>
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
								let v = handler_code[row.handler];
								//value = v.code;
								if (v) {
									row.data_test = v.data_test;
									row.code = v.code;
								}

								console.log('xxxxxx> ', row);

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
							row = {};
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

	<Tab bind:tabs={tabList}></Tab>
</SlideFullScreen>

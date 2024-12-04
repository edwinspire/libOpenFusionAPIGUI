<script>
	// @ts-nocheck

	'use strict';
	import { onMount, createEventDispatcher } from 'svelte';
	import FetchCode from './handler/fetch.svelte';
	import JsCode from './handler/js.svelte';
	import SoapCode from './handler/soap.svelte';
	import SqlCode from './handler/sql.svelte';
	import SqlBulkInsert from './handler/sqlBulkInsert.svelte';
	import SqlHana from './handler/sqlHana.svelte';
	import TextCode from './handler/text.svelte';
	import CustomFn from './handler/customFunction.svelte';
	import { Level, SlideFullScreen, Tab } from '@edwinspire/svelte-components';
	//import { listAccessMethod } from '../../utils.js';
	import Endpoint from './handler/endpoint.svelte';
	import Authorizations from './widgets/authorizations.svelte';
	import Logs from './widgets/logs.svelte';
	import EndpointLabel from './widgets/endpoint_label.svelte';

	/**
	 * @type {FetchCode}
	 */
	let fnFetchCode;
	/**
	 * @type {JsCode}
	 */
	let fnJsCode;
	/**
	 * @type {SoapCode}
	 */
	let fnSoapCode;
	/**
	 * @type {SqlCode}
	 */
	let fnSqlCode;
	let fnSqlHanaCode;
	let fnSqlBulkInsertCode;

	/**
	 * @type {CustomFn}
	 */
	let fnCustomFn;

	/**
	 * @type {TextFn}
	 */
	let fnTextFn;

	export let showEditor = false;

	/**
	 * @type {any}
	 */
	export let value;
	export let row = {};
	export let app = {};
	//export let endpoints = [];
	let validateResource = false;
	let availableURL = false;

	let tabList = [
		{ label: 'Endpoint', isActive: true },
		{ label: 'Configuration' },
		{ label: 'Authorizations' },
		{ label: 'Logs' }
	];
	const dispatch = createEventDispatcher();

	$: row, defaultValues();

	function accept() {
		let data = {
			row,
			validateResource,
			availableURL
		};

		console.log('ACCEPT => ', data);

		dispatch('data', data);
	}

	function defaultValues() {
		if (!row) {
			row = {};
		}

		if (!row.ctrl) {
			row.ctrl = {};
		}

		if (!row.ctrl.users) {
			row.ctrl.users = [];
		}

		if (!row.ctrl.log) {
			row.ctrl.log = {};
		}

		console.log('row defaultValues', row);
	}

	onMount(() => {
		//		await getEnvList();
		defaultValues();
	});
</script>

<SlideFullScreen bind:show={showEditor}>
	<Level>
		<span slot="r01">
			<div class="field has-addons">
				<p class="control">
					<button
						class="button is-success is-small"
						on:click={() => {
							if (!validateResource) {
								alert('URL is invalid.');
							} else if (!availableURL) {
								alert('URL already exists.');
							} else {
								if (row && row.handler == 'JS') {
									//value = fnJsCode.getCode();
									//fnJsCode.reset();
									let v = fnJsCode.getData();
									value = v.code;
									row.data_test = v.data_test;
								} else if (row && row.handler == 'SOAP') {
									//value = fnSoapCode.getCode();
									//fnSoapCode.reset();
									let v = fnSoapCode.getData();
									value = v.code;
									row.data_test = v.data_test;
								} else if (row && row.handler == 'SQL') {
									let v = fnSqlCode.getData();
									value = v.code;
									row.data_test = v.data_test;
								} else if (row && row.handler == 'SQL_BULK_I') {
									let v = fnSqlBulkInsertCode.getData();
									value = v.code;
									row.data_test = v.data_test;

									console.log('>> fnSqlBulkInsertCode.getData() > ', row);
								} else if (row && row.handler == 'HANA') {
									let v = fnSqlHanaCode.getData();
									value = v.code;
									row.data_test = v.data_test;

									//	console.log('>> fnSqlHanaCode.getData() > ', row);

									//fnSqlCode.reset();
								} else if (row && row.handler == 'FETCH') {
									//value = fnFetchCode.getCode();

									let v = fnFetchCode.getData();
									value = v.code;
									row.data_test = v.data_test;

									// fnFetchCode.reset();
								} else if (row && row.handler == 'FUNCTION') {
									//value = fnCustomFn.getCode();
									let v = fnCustomFn.getData();
									value = v.code;
									row.data_test = v.data_test;
								} else if (row && row.handler == 'TEXT') {
									//value = fnTextFn.getCode();
									//fnTextFn.reset();
									let v = fnTextFn.getData();
									value = v.code;
									row.data_test = v.data_test;
								}

								row.code = value;
								//								console.log('EDITOR ENDPOINT: ', row);

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
						on:click={() => {
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
		</span>
	</Level>

	<Tab bind:tabs={tabList}>
		<div class={tabList[0].isActive ? '' : 'is-hidden'}>
			<Endpoint
				bind:row
				bind:app
				bind:endpoints={app.endpoints}
				bind:validateResource
				bind:availableURL
			></Endpoint>
		</div>

		<div class={tabList[1].isActive ? '' : 'is-hidden'}>
			<EndpointLabel bind:endpoint={row.endpoint} bind:environment={row.environment}></EndpointLabel>

			{#if row && row.handler == 'JS'}
				<JsCode bind:this={fnJsCode} bind:row />
			{:else if row && row.handler == 'SOAP'}
				<SoapCode bind:this={fnSoapCode} bind:row />
			{:else if row && row.handler == 'SQL'}
				<SqlCode bind:this={fnSqlCode} bind:row />
			{:else if row && row.handler == 'HANA'}
				<SqlHana bind:this={fnSqlHanaCode} bind:row />
			{:else if row && row.handler == 'SQL_BULK_I'}
				<SqlBulkInsert bind:this={fnSqlBulkInsertCode} bind:row />
			{:else if row && row.handler == 'FETCH'}
				<FetchCode bind:this={fnFetchCode} bind:row />
			{:else if row && row.handler == 'FUNCTION'}
				<CustomFn bind:this={fnCustomFn} bind:row />
			{:else if row && row.handler == 'TEXT'}
				<TextCode bind:this={fnTextFn} bind:row />
			{:else}
				<div>No Handler</div>
			{/if}
		</div>

		<div class={tabList[2].isActive ? '' : 'is-hidden'}>
			{#if row.ctrl && row.ctrl.users}
				<Authorizations bind:users={row.ctrl.users} bind:row></Authorizations>
			{/if}
		</div>
		<div class={tabList[3].isActive ? '' : 'is-hidden'}>
			{#if row.ctrl && row.ctrl.log}
				<Logs bind:row bind:log={row.ctrl.log}></Logs>
			{/if}
		</div>
	</Tab>
</SlideFullScreen>

<script>
	// @ts-nocheck

	'use strict';
	import { onMount, createEventDispatcher } from 'svelte';
	import FetchCode from './handler/fetch.svelte';
	import JsCode from './handler/js.svelte';
	import SoapCode from './handler/soap.svelte';
	import SqlCode from './handler/sql.svelte';
	import TextCode from './handler/text.svelte';
	import CustomFn from './handler/customFunction.svelte';
	import { Level, SlideFullScreen, Tab } from '@edwinspire/svelte-components';
	//import { listAccessMethod } from '../../utils.js';
	import Endpoint from './handler/endpoint.svelte';

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

	let tabList = [{ label: 'Endpoint', isActive: true }, { label: 'Configuration' }];
	const dispatch = createEventDispatcher();

	function accept() {
		let data = {
			row,
			validateResource,
			availableURL
		};

		console.log('ACCEPT => ', data);

		dispatch('data', data);
	}

	onMount(() => {
		//		await getEnvList();
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
									value = fnJsCode.getCode();
									fnJsCode.reset();
								} else if (row && row.handler == 'SOAP') {
									value = fnSoapCode.getCode();
									fnSoapCode.reset();
								} else if (row && row.handler == 'SQL') {
									let v = fnSqlCode.getData();
									value = v.code;
									row.data_test = v.data_test;

									//	console.log('>> fnSqlCode.getData() > ', row);

									fnSqlCode.reset();
								} else if (row && row.handler == 'FETCH') {
									//value = fnFetchCode.getCode();

									let v = fnFetchCode.getData();
									value = v.code;
									row.data_test = v.data_test;


									// fnFetchCode.reset();
								} else if (row && row.handler == 'FUNCTION') {
									value = fnCustomFn.getCode();
								} else if (row && row.handler == 'TEXT') {
									value = fnTextFn.getCode();
									fnTextFn.reset();
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
			{#if row && row.handler == 'JS'}
				<JsCode bind:this={fnJsCode} code={value} bind:environment={row.environment} bind:row />
			{:else if row && row.handler == 'SOAP'}
				<SoapCode bind:this={fnSoapCode} code={value} bind:environment={row.environment} bind:row />
			{:else if row && row.handler == 'SQL'}
				<SqlCode bind:this={fnSqlCode} bind:row />
			{:else if row && row.handler == 'FETCH'}
				<FetchCode bind:this={fnFetchCode} bind:row />
			{:else if row && row.handler == 'FUNCTION'}
				<CustomFn bind:this={fnCustomFn} code={value} bind:environment={row.environment} bind:row />
			{:else if row && row.handler == 'TEXT'}
				<TextCode bind:this={fnTextFn} code={value} bind:environment={row.environment} bind:row />
			{:else}
				<div>No Handler</div>
			{/if}
		</div>
	</Tab>
</SlideFullScreen>

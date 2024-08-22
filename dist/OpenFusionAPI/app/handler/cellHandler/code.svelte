<script>
	// @ts-nocheck

	'use strict';
	import { onMount } from 'svelte';
	import FetchCode from '../../handler/fetch.svelte';
	import JsCode from '../../handler/js.svelte';
	import SoapCode from '../../handler/soap.svelte';
	import SqlCode from '../../handler/sql.svelte';
	import TextCode from '../../handler/text.svelte';
	import CustomFn from '../../handler/customFunction.svelte';
	import { Level, SlideFullScreen } from '@edwinspire/svelte-components';
	import { css_handlers } from '../../../utils.js';

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

	let showCode = false;

	/**
	 * @type {any}
	 */
	export let value;
	export let row = {};

	//let token;
	//let environment = '';
	/*
	userStore.subscribe((value) => {
		console.log('tokenStore ->>>>', value);
	//	token = value.token;
	});
	*/

	onMount(() => {});
</script>

{#if row.handler != 'NA' && row.method != 'WS' && row.method != 'MQTT'}
	<button
		class={css_handlers[row.handler] && css_handlers[row.handler].css
			? ' button is-small  ' + css_handlers[row.handler].css
			: ' button is-small  '}
		on:click={() => {
			if (!showCode) {
				showCode = true;
			}
		}}
	>
		<span class="icon is-small">
			{#if css_handlers[row.handler] && css_handlers[row.handler].icon}
				<i class={css_handlers[row.handler].icon} />
			{:else}
				<i class="fa-solid fa-code" />
			{/if}
		</span>

		<span> Code </span>
	</button>
{:else}
	<button
		class={css_handlers[row.handler] && css_handlers[row.handler].css
			? ' button is-small ' + css_handlers[row.handler].css
			: ' button is-small '}
		disabled
	>
		<span class="icon is-small">
			<i class="fa-solid fa-code" />
		</span>
		<span> Code </span>
	</button>
{/if}

<SlideFullScreen bind:show={showCode}>
	<Level>
		<span slot="r01">

			<div class="field has-addons">
				<p class="control">
				  <button class="button is-success is-small" on:click={() => {
					if (row && row.handler == 'JS') {
						fnJsCode.reset();
						//console.log("methodSelected > ", methodSelected, fnJsCode.getCode());
					} else if (row && row.handler == 'SOAP') {
						fnSoapCode.reset();
					} else if (row && row.handler == 'SQL') {
						fnSqlCode.reset();
					} else if (row && row.handler == 'FETCH') {
						fnFetchCode.reset();
					} else if (row && row.handler == 'FUNCTION') {
						fnCustomFn.reset();
					} else if (row && row.handler == 'TEXT') {
						fnTextFn.reset();
					}
					showCode = false;
				}}>
					<span class="icon is-small">
						<i class="fa-solid fa-check"></i>
					</span>
					<span>Accept</span>
				  </button>
				</p>
				<p class="control">
				  <button class="button is-small" on:click={() => {
					if (row && row.handler == 'JS') {
						fnJsCode.reset();
						//console.log("methodSelected > ", methodSelected, fnJsCode.getCode());
					} else if (row && row.handler == 'SOAP') {
						fnSoapCode.reset();
					} else if (row && row.handler == 'SQL') {
						fnSqlCode.reset();
					} else if (row && row.handler == 'FETCH') {
						fnFetchCode.reset();
					} else if (row && row.handler == 'FUNCTION') {
						fnCustomFn.reset();
					} else if (row && row.handler == 'TEXT') {
						fnTextFn.reset();
					}
					showCode = false;
				}}>
					<span class="icon is-small">
						<i class="fa-solid fa-xmark"></i>
					</span>
					<span>Cancel</span>
				  </button>
				</p>
			  </div>



		</span>

	</Level>

	<div>
		{#if row && row.handler == 'JS'}
			<JsCode bind:this={fnJsCode} code={value} bind:environment={row.environment} bind:row />
		{:else if row && row.handler == 'SOAP'}
			<SoapCode bind:this={fnSoapCode} code={value} bind:environment={row.environment} bind:row />
		{:else if row && row.handler == 'SQL'}
			<SqlCode bind:this={fnSqlCode} code={value} bind:environment={row.environment} bind:row />
		{:else if row && row.handler == 'FETCH'}
			<FetchCode bind:this={fnFetchCode} code={value} bind:environment={row.environment} bind:row />
		{:else if row && row.handler == 'FUNCTION'}
			<CustomFn bind:this={fnCustomFn} code={value} bind:environment={row.environment} bind:row />
			{:else if row && row.handler == 'TEXT'}
			<TextCode bind:this={fnTextFn} code={value} bind:environment={row.environment} bind:row />
		{:else}
			<code contenteditable>
				{value}
			</code>
		{/if}
	</div>
</SlideFullScreen>

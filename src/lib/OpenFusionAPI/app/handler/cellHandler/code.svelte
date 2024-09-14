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

	onMount(() => {});
</script>


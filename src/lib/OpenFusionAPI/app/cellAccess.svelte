<script>
	 "use strict";
	import SelectAccess from '../widgets/Select.svelte';
	import { onMount } from 'svelte';
	import { listAccessMethod } from "../utils.js";

	
	/**
	 * @type {any}
	 */
	export let value;
	export let row = {};
	export let props = {};

	
	onMount(() => {
	//	setCSS(value);
	});
</script>
<td>

<SelectAccess
options={listAccessMethod}
bind:option={value}
on:select={(e) => {
	console.log('Cambia', e, value);
}}
/>

</td>
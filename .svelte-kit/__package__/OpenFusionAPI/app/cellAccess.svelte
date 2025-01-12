<script>
	'use strict';
	import SelectAccess from '../widgets/Select.svelte';
	import { onMount } from 'svelte';
	import { listAccessMethod } from '../utils.js';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {
		//	setCSS(value);
	});
</script>

<td>
	<SelectAccess
		options={listAccessMethod}
		bind:option={value}
		onselect={(e) => {
			console.log('Cambia', e, value);
		}}
	/>
</td>

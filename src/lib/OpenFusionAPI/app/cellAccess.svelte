<script>
	'use strict';
	import SelectAccess from '../widgets/Select.svelte';
	import { onMount } from 'svelte';
	import { listAccessMethod } from '$lib/OpenFusionAPI/utils.js';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {
		//	setCSS(value);
	});

	/*
<SelectAccess
		options={listAccessMethod}
		bind:option={value}
		onselect={(e) => {
			console.log('Cambia', e, value);
		}}
	/>
*/
</script>

<td>
	
	<div class="tags has-addons">
		{#if value == 0}
			<span class="tag is-success"
				><span class="icon">
					<i class="fa-solid fa-lock-open"></i>
				</span></span
			>
			<span class="tag ">Public</span>
		{:else}
			<span class="tag is-danger"
				><span class="icon">
					<i class="fa-solid fa-lock"></i>
				</span></span
			>
			<span class="tag">Private</span>
		{/if}
	</div>
</td>

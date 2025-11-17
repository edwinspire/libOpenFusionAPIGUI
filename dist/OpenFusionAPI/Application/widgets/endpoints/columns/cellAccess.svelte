<script>
	'use strict';
	import { onMount } from 'svelte';
	import { listAccessMethod } from '../../../utils/static_values.js';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {
		//	setCSS(value);
	});
	let labelx = $derived.by(() => {
		let l = listAccessMethod.find((item) => {
			return item.id == value;
		});
	//	console.log('Label', l);
		return l ? l.value : 'Unknown';
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
			<span class="tag">Public</span>
		{:else}
			<span class="tag is-danger"
				><span class="icon">
					<i class="fa-solid fa-lock"></i>
				</span></span
			>
			<span class="tag">{labelx}</span>
		{/if}
	</div>
</td>

<script>
	'use strict';

	import { onMount } from 'svelte';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {
		//	setCSS(value);
	});
</script>

<td>
	{#if value?.enabled && value?.name}
		<span class="icon-text">
			<span class="icon {value.enabled ? 'has-text-success' : 'has-text-danger'}">
				<i class="fa-solid fa-hammer"></i>
			</span>
			<span>{value.name}</span>
		</span>
	{/if}
</td>

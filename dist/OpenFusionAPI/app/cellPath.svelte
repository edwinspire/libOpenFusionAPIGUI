<script>
	import { onMount } from 'svelte';
	import { listEnv } from '../utils.js';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {});
</script>

<td>
	<div class="icon-text">
		{#if listEnv && row?.environment && listEnv[row.environment]}
			<span class="icon {listEnv[row.environment].color}">
				<i class={listEnv[row.environment].icon}></i>
			</span>
		{:else}
			<span class="icon">
				<i class="fa-solid fa-question"></i>
			</span>
		{/if}
		<span>{value}</span>
	</div>
</td>

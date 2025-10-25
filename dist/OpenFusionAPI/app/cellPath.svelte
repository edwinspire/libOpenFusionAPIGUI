<script>
	import { onMount } from 'svelte';
	import { listEnv } from '../utils.js';
	import { storeEndpointOnRequest } from '../utils.js';

	let { value = $bindable(), row = $bindable() } = $props();
	let isRunning = $state(false);
	let timeoutIsRunning;

	onMount(() => {
		onMount(() => {
			storeEndpointOnRequest.subscribe((data) => {
				//console.log(":::::> ", data);
				if (row && row.idendpoint == data) {
					isRunning = true;
					clearTimeout(timeoutIsRunning);
					timeoutIsRunning = setTimeout(() => {
						isRunning = false;
					}, 1500);
				}
			});
		});
	});
</script>

<td>
	{#if listEnv && row?.environment && listEnv[row.environment]}
		<span class="icon-text">
			<span class="icon {isRunning ? ' has-text-success ' : ' has-text-grey-dark '}">
				<i class="fa-solid fa-gear {isRunning ? ' fa-spin ' : ''}"></i>
			</span>
			<span class="icon {listEnv[row.environment].color}">
				<i class={listEnv[row.environment].icon}></i>
			</span>
			<span>{value}</span>
		</span>
	{/if}
</td>

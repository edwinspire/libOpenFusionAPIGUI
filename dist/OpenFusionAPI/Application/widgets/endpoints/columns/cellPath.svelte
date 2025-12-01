<script>
	import { onDestroy, onMount } from 'svelte';
	//	import { env_params } from '../utils.js';
	import { storeEndpointOnStart } from '../../../utils/stores.js';
	import { Environment } from '../../../utils/static_values.js';

	let { value = $bindable(), row = $bindable() } = $props();
	let isRunning = $state(false);
	let timeoutIsRunning;
	let env_params = $derived.by(() => {
		return Environment && Array.isArray(Environment)
			? Environment.find((item) => {
					return row.environment == item.id;
				})
			: [];
	});

	let unsubscribe;

	onDestroy(() => {
		clearTimeout(timeoutIsRunning);
		unsubscribe();
	});
	onMount(() => {
		unsubscribe = storeEndpointOnStart.subscribe((data) => {
			//
			//	console.log('CELL PATH :::::> ', data);
			if (row && row.idendpoint == data.idendpoint) {
				isRunning = true;
				clearTimeout(timeoutIsRunning);
				timeoutIsRunning = setTimeout(() => {
					isRunning = false;
				}, 5000);
			}
		});
	});
</script>

<td>
	{#if env_params}
		<span class="icon-text">
			<span class="icon {isRunning ? ' has-text-success ' : ' has-text-black-ter '}">
				<i class="fa-solid fa-gear {isRunning ? ' fa-spin ' : ''}"></i>
			</span>
			<span class="icon {env_params.color}">
				<i class={env_params.icon}></i>
			</span>
			<span>{value}</span>
		</span>
	{/if}
</td>

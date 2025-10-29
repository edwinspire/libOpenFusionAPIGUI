<script>
	import { onMount } from 'svelte';
	import { listEnv } from '../utils.js';
	import { storeEndpointOnStart } from '../utils.js';

	let { value = $bindable(), row = $bindable() } = $props();
	let isRunning = $state(false);
	let timeoutIsRunning;

	onMount(() => {
		storeEndpointOnStart.subscribe((data) => {
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
	{#if listEnv && row?.environment && listEnv[row.environment]}
		<span class="icon-text">
			<span class="icon {isRunning ? ' has-text-success ' : ' has-text-black-ter '}">
				<i class="fa-solid fa-gear {isRunning ? ' fa-spin ' : ''}"></i>
			</span>
			<span class="icon {listEnv[row.environment].color}">
				<i class={listEnv[row.environment].icon}></i>
			</span>
			<span>{value}</span>
		</span>
	{/if}
</td>

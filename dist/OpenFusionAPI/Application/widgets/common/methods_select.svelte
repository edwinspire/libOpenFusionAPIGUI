<script>
	import { onDestroy, onMount } from 'svelte';
	import { BasicSelect } from '@edwinspire/svelte-components';
	import { listMethodStore } from '../../utils/stores.js';

	let { disabled = $bindable(false), option = $bindable({}), onselect } = $props();

	let methods = $state([]);

	const unsubscribe = listMethodStore.subscribe((value) => {
		methods = value;
		//console.log('methods', methods);
	});
	// TODO: Hay que agregar la lógica para manejar el estado disabled
	onMount(async () => {});
	onDestroy(unsubscribe);
</script>

{#if methods}
	<BasicSelect label="Method" bind:disabled bind:options={methods} bind:option {onselect} />
{/if}

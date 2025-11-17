<script>
	import { onMount } from 'svelte';
	import { BasicSelect } from '@edwinspire/svelte-components';
	import { listMethodStore } from '../../utils/stores.js';

	let {disabled = $bindable(false), option = $bindable({}), onselect } = $props();

	let methods = $state([]);

	listMethodStore.subscribe((value) => {
		methods = value;
        console.log('methods', methods);
	});
// TODO: Hay que agregar la lógica para manejar el estado disabled
	onMount(async () => {});
</script>

{#if methods}
	<BasicSelect label="Method" bind:disabled={disabled} bind:options={methods} bind:option={option} onselect={onselect} />
{/if}

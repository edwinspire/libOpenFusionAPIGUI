<script>
	import { onMount } from 'svelte';
	import { BasicSelect } from '@edwinspire/svelte-components';
	import { listMethodStore } from '$lib/OpenFusionAPI/utils.js';

	let { option = $bindable({}), onselect } = $props();

	let methods = $state([]);

	listMethodStore.subscribe((value) => {
		methods = value;
        console.log('methods', methods);
	});

	onMount(async () => {});
</script>

{#if methods}
	<BasicSelect bind:options={methods} bind:option {onselect} />
{/if}

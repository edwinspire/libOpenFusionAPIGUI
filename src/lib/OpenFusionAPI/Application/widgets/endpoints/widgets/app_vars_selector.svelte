<script>
	import { onMount, onDestroy } from 'svelte';
	import { PredictiveInput, JSONView } from '@edwinspire/svelte-components';
	import { listAppVars } from '$lib/OpenFusionAPI/Application/utils/stores.js';

	let {
		freeTyping = $bindable(false),
		placeholder = $bindable('$_VAR_NAME'),
		classIcon = $bindable(''),
		label = $bindable('Application Variable'),
		value = $bindable(''),
		environment = $bindable(''),
		onselect = () => {}
	} = $props();

	let options_app_vars = $state([]);

	// --------------------------------------------
	// Valor seleccionado (derivado)
	// --------------------------------------------
	let value_selected = $derived.by(() => options_app_vars.find((item) => item.name === value));

	// --------------------------------------------
	// Suscripción al store
	// --------------------------------------------
	const unsubscribe = listAppVars.subscribe((list) => {
		if (!Array.isArray(list)) {
			options_app_vars = [];
			return;
		}

		const filtered = list.filter((item) => item.environment === environment);

		options_app_vars = filtered.map((item) => ({
			name: item.name,
			value: item.name,
			code: item.value
		}));
	});

	function onselectInternal(val) {
		//		console.log('onselectInternal app_vars_selector', val);
		value = val;
		onselect(val);
	}

	onDestroy(unsubscribe);
</script>

<PredictiveInput
	{freeTyping}
	{placeholder}
	{classIcon}
	{label}
	options={options_app_vars}
	bind:selectedValue={value}
	onselect={(selected) => {
		onselectInternal(selected.value);
	}}
></PredictiveInput>
{#if value_selected}
	<details class=" ">
		<summary>View value</summary>
		<br />
		<JSONView jsonObject={value_selected.code} />
	</details>
{/if}

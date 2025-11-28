<script>
	import { onMount } from 'svelte';
	import { PredictiveInput, JSONView } from '@edwinspire/svelte-components';
	import { listAppVars } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { TimeOutChangeValue } from '$lib/OpenFusionAPI/Application/utils/utils.js';

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

	//let param_json = $state({});
	let param_data = $state('');
	//let use_var_app = $state(false);
	let env_vars = $state({});
	let timeoutChange;

	listAppVars.subscribe((list) => {
		console.log(typeof list, list);
		if (list && Array.isArray(list)) {
			let list_var_env = list.filter((item) => {
				return item.environment == environment;
			});
			options_app_vars = list_var_env.map((item) => {
				return { name: item.name, value: item.name };
			});
		}
	});

	$effect(() => {
		if (value) {
			timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
		}
	});

	function parseCode() {
		console.log('parseCode PARAMS SELECTOR', value, typeof value);
		param_data = value;
	}

	function onselectInternal(val) {
		//		console.log('onselectInternal app_vars_selector', val);
		value = val;
		onselect(val);
	}

	onMount(() => {
		parseCode();
	});
</script>

<PredictiveInput
	{freeTyping}
	{placeholder}
	{classIcon}
	{label}
	options={options_app_vars}
	bind:selectedValue={value}
	onselect={(selected) => {
		//console.log('APP VAR SELECTOR', selected, value);
		onselectInternal(selected.value);
		//value = selected.value;
	}}
></PredictiveInput>
{#if env_vars[param_data]}
	<details class=" ">
		<summary>View value</summary>
		<br />
		<JSONView jsonObject={env_vars[param_data]} />
	</details>
{/if}

<script>
	import { onMount } from 'svelte';
	import { PredictiveInput, JSONView } from '@edwinspire/svelte-components';
	import { listAppVars } from '../../../utils.js';

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
		env_vars = list[environment] ?? {};

		options_app_vars = Object.keys(env_vars).map((item) => {
			return { name: item, value: item };
		});
	});

	$effect(() => {
		if (value) {
			clearTimeout(timeoutChange);
			timeoutChange = setTimeout(() => {
				parseCode();
			}, 750);
		}
	});

	function parseCode() {
		console.log('parseCode PARAMS SELECTOR', value, typeof value);
		param_data = value;
	}

	function onselectInternal(val) {
		//console.log('onselectInternal', val);
		value = val.value;
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
//			console.log('APP VAR SELECTOR', selected, value);
		//		onselectInternal(selected.value);
		value = selected.value;
	}}
></PredictiveInput>
{#if env_vars[param_data]}
	<details class=" ">
		<summary>View value</summary>
		<br />
		<JSONView jsonObject={env_vars[param_data]} />
	</details>
{/if}

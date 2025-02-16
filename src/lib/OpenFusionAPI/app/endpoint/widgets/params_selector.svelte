<script>
	import { onMount } from 'svelte';
	import { PredictiveInput, EditorCode, JSONView } from '@edwinspire/svelte-components';
	import { listAppVars } from '../../../utils.js';

	let {
		freeTyping = $bindable(false),
		placeholder = $bindable('$_VAR_NAME'),
		classIcon = $bindable(''),
		label = $bindable('Application Variable'),
		value = $bindable(''),
		environment = $bindable(''),
		langEditor = $bindable('json'),
		onselect = () => {}
	} = $props();

	let options_app_vars = $state([]);

	let param_json = $state({});
	let param_data = $state('');
	let use_var_app = $state(false);
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
		//console.log('parseCode PARAMS SELECTOR', value, typeof value);

		if (typeof value !== 'object') {
			try {
				param_json = JSON.parse(value);
				use_var_app = false;
			} catch (error) {
				param_data = value;
				use_var_app = true;
				console.warn(error, value);
			}
		} else {
			param_json = value;
			use_var_app = false;
		}
	}

	function onselectInternal(val) {
		console.log('onselectInternal', val);
		value = val;
		onselect(val);
	}

	onMount(() => {
		parseCode();
	});
</script>

<div class="box">
	<div class="buttons has-addons">
		<button
			class="button is-small {use_var_app ? '' : 'is-active is-primary'}"
			onclick={() => {
				use_var_app = false;
			}}>Use Custom Parameters</button
		>
		<button
			class="button is-small {use_var_app ? 'is-active is-primary' : ''}"
			onclick={() => {
				use_var_app = true;
			}}>Use App Variable</button
		>
	</div>

	{#if !use_var_app}
		<EditorCode
			isReadOnly={false}
			lang={langEditor}
			showFormat={true}
			bind:code={param_json}
			onchange={(code) => {
				onselectInternal(code.code);
			}}
		></EditorCode>
	{:else}
		<PredictiveInput
			{freeTyping}
			{placeholder}
			{classIcon}
			{label}
			options={options_app_vars}
			bind:selectedValue={param_data}
			onselect={(selected) => {
				onselectInternal(selected.value);
			}}
		></PredictiveInput>
		{#if !freeTyping && env_vars[param_data]}
			<details class=" ">
				<summary>View value</summary>
				<br />
				<JSONView jsonObject={env_vars[param_data]} />
			</details>
		{/if}
	{/if}
</div>

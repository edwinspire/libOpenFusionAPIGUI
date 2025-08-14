<script>
	import { onMount } from 'svelte';
	import { EditorCode } from '@edwinspire/svelte-components';
	import AppVarsSelector from './app_vars_selector.svelte';

	let {
		freeTyping = $bindable(false),
		placeholder = $bindable('$_VAR_NAME'),
		classIcon = $bindable(''),
		label = $bindable('Application Variable'),
		value = $bindable(),
		environment = $bindable(''),
		langEditor = $bindable('json'),
		onselect = () => {}
	} = $props();

	let param_json = $state({});
	let param_varname = $state('');
	let use_var_app = $state(false);
	let new_value;
	let is_init = false;

	let timeoutChange;

	$effect(() => {
		parseCode();
	});

	function parseCode() {
		//	console.log('parseCode PARAMS SELECTOR', value, typeof value);
		if (value == null) {
			value = {};
		}

		if (typeof value !== 'object') {
			try {
				param_json = JSON.parse(value);
				use_var_app = false;
			} catch (error) {
				param_varname = value;
				use_var_app = true;
				console.warn(error, value);
			}
		} else {
			param_json = value;
			use_var_app = false;
		}
	}

	function checkUpdateValue() {
		let updated = false;
		let new_value_str = typeof new_value == 'object' ? JSON.stringify(new_value) : new_value;
		let currect_value_str = typeof value == 'object' ? JSON.stringify(value) : value;

		if (new_value_str != currect_value_str) {
			updated = true;
			value = new_value;
		}
		if (updated) {
			parseCode();
		}
		return updated;
	}

	function onselectInternal(val) {
		if (is_init) {
		//	console.log('>>>>>>>>>>>>> onselectInternal', val, value);
			new_value = val;

			if (checkUpdateValue()) {
				onselect(value);
			}
		}
	}

	onMount(() => {
		is_init = true;
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
			code={param_json}
			onchange={(code) => {
				onselectInternal(code.code);
			}}
		></EditorCode>
	{:else}
		<AppVarsSelector
			{freeTyping}
			{placeholder}
			{classIcon}
			{label}
			{environment}
			bind:value={param_varname}
			onselect={(selected) => {
				//console.log('onselect params_json_selector', selected, param_varname);
				onselectInternal(selected);
			}}
		></AppVarsSelector>
	{/if}
</div>

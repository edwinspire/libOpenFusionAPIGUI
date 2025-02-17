<script>
	import { onMount } from 'svelte';
	import { EditorCode } from '@edwinspire/svelte-components';
	import AppVarsSelector from '../widgets/app_vars_selector.svelte';

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

	let param_json = $state({});
	let param_data = $state('');
	let use_var_app = $state(false);

	let timeoutChange;

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
//		console.log('onselectInternal', val);
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
		<AppVarsSelector
			{freeTyping}
			{placeholder}
			{classIcon}
			{label}
			{environment}
			bind:value={param_data}
			onselect={(selected) => {
				onselectInternal(selected.value);
			}}
		></AppVarsSelector>
	{/if}
</div>

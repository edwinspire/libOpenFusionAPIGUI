<script>
	import { onMount } from 'svelte';
	import { EditorCode } from '@edwinspire/svelte-components';
	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/app_vars_selector.svelte';

	// Props (Svelte 5 Runes)
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

	// Estado interno que representa el valor real del componente
	let stateValue = $state(value);

	// Estados derivados
	let param_json = $state({});
	let param_varname = $state('');
	let use_var_app = $state(false);

	// Se ejecuta cuando stateValue cambia
	$effect(() => {
		if (value) {
			normalizeValue($state.snapshot(value));
		}
	});

	// ------------------------------------------------------------
	// Normaliza el valor recibido (JSON o variable)
	// ------------------------------------------------------------
	function normalizeValue(val) {
		stateValue = val;

		if (val == null) {
			use_var_app = false;
			param_json = {};
			return;
		}

		// Si es objeto, forzamos a JSON editor
		if (typeof val === 'object') {
			use_var_app = false;
			param_json = structuredClone(val);
			return;
		}

		// Si NO es objeto: intentamos parsear JSON
		try {
			param_json = JSON.parse(val);
			use_var_app = false;
		} catch {
			param_varname = val;
			use_var_app = true;
		}
	}

	// ------------------------------------------------------------
	// Comparación y actualización
	// ------------------------------------------------------------
	function updateValue(newValue) {
		const prev = stringifyValue(stateValue);
		const next = stringifyValue(newValue);

		if (prev !== next) {
			stateValue = newValue;
			onselect(newValue);
			value = newValue; // sincroniza con padre vía bind:value
		}
	}

	function stringifyValue(v) {
		return typeof v === 'object' ? JSON.stringify(v) : String(v ?? '');
	}

	// ------------------------------------------------------------
	// Callbacks internos
	// ------------------------------------------------------------
	function handleCodeChange(event) {
		updateValue(event.code);
	}

	function handleVarSelect(selected) {
		updateValue(selected);
	}

	onMount(() => {
		normalizeValue($state.snapshot(value));
	});
</script>

<div class="box">
	<div class="buttons has-addons">
		<button
			class="button is-small {use_var_app ? '' : 'is-active is-primary'}"
			onclick={() => (use_var_app = false)}
		>
			Use Custom Parameters
		</button>

		<button
			class="button is-small {use_var_app ? 'is-active is-primary' : ''}"
			onclick={() => (use_var_app = true)}
		>
			Use App Variable
		</button>
	</div>

	{#if !use_var_app}
		<EditorCode
			isReadOnly={false}
			lang={langEditor}
			showFormat={true}
			code={param_json}
			onchange={handleCodeChange}
		/>
	{:else}
		<AppVarsSelector
			{freeTyping}
			{placeholder}
			{classIcon}
			{label}
			{environment}
			bind:value={param_varname}
			onselect={handleVarSelect}
		/>
	{/if}
</div>

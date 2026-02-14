<script>
	import { EditorCode } from '@edwinspire/svelte-components';
	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/app_vars_selector.svelte';

	// Props (Svelte 5 Runes)
	// No usar fallback en $bindable() para evitar error props_invalid_value
	// cuando el padre pasa undefined.
	let {
		freeTyping = $bindable(),
		placeholder = $bindable(),
		classIcon = $bindable(),
		label = $bindable(),
		custom = $bindable(),
		appvar = $bindable(),
		environment = $bindable(),
		langEditor = $bindable(),
		onselect = () => {}
	} = $props();

	// Aplicar defaults cuando el padre pasa undefined
	$effect.pre(() => {
		if (freeTyping === undefined) freeTyping = false;
		if (placeholder === undefined) placeholder = '$_VAR_NAME';
		if (classIcon === undefined) classIcon = '';
		if (label === undefined) label = 'Application Variable';
		if (custom === undefined) custom = {};
		if (appvar === undefined) appvar = '';
		if (environment === undefined) environment = '';
		if (langEditor === undefined) langEditor = 'json';
	});

	// Estado interno — solo se modifica por cambios externos o por botones
	let use_var_app = $state(false);

	// Guard: true cuando el cambio viene de dentro del componente
	let _internal = false;

	// Solo actualizar use_var_app cuando appvar cambia desde el padre
	// y no es null/undefined
	$effect(() => {
		const currentAppvar = appvar;
		if (!_internal && currentAppvar !== null && currentAppvar !== undefined) {
			use_var_app = String(currentAppvar).trim().length > 0;
		}
	});

	// ------------------------------------------------------------
	// Callbacks internos (no modifican use_var_app)
	// ------------------------------------------------------------
	function handleCodeChange(event) {
		console.log('handleCodeChange', event);
		_internal = true;
		custom = event.code;
		appvar = '';
		_internal = false;
		onselect({ custom: event.code, appvar: '' });
	}

	function handleVarSelect(selected) {
		console.log('>> handleVarSelect >> ', selected);
		_internal = true;
		appvar = selected;
		custom = {};
		_internal = false;
		onselect({ custom: {}, appvar: selected });
	}
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
			code={custom}
			onchange={handleCodeChange}
		/>
	{:else}
		<AppVarsSelector
			{freeTyping}
			{placeholder}
			{classIcon}
			{label}
			{environment}
			bind:value={appvar}
			onselect={handleVarSelect}
		/>
	{/if}
</div>

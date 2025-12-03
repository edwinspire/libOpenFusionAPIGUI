<script>
	import { onMount } from 'svelte';
	import {
		EditorCode,
		Level,
		copyTextToClipboard,
		Notifications
	} from '@edwinspire/svelte-components';
	import { equalObjs } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { UpsertAppVar, DeleteAppVar } from '$lib/OpenFusionAPI/Application/utils/request.js';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';

	let {
		idapp = $bindable('-'),
		isReadOnly = $bindable(false),
		showCode = $bindable(false),
		appVars = $bindable([]),
		title = $bindable(''),
		environment = $bindable(''),
		onchange = () => {},
		oncopy = () => {}
	} = $props();

	let new_var_name = $state('');
	let classAnimationCopyName = $state('');
	let appVarsInternal = $state({});

	/*
	let idapp = $derived.by(() => {
		let r;
		if (appVars && Array.isArray(appVars)) {
			let fapp = appVars.find((item) => {
				return item.idvar;
			});
			r = fapp && fapp.idapp ? fapp.idapp : undefined;
		}
		return r;
	});
	*/

	let noty = new Notifications();

	function internalOnchange(name, vars) {
		if (!equalObjs(appVarsInternal[name], vars)) {
			appVarsInternal[name] = vars;
			onchange($state.snapshot(appVars));
		}
	}

	function appNameExists(name_app) {
		return appVars.some((item) => {
			return item.name == name_app;
		});
	}

	function showMessageDuplicateNames() {
		alert('There are duplicate variables');

		noty.push({
			message: 'There are variables with the same name; you must correct this before continuing.',
			color: 'danger'
		});
	}

	/**
	 * Valida si en la matriz existe más de un registro
	 * con el mismo valor en la propiedad "name".
	 *
	 * @param {Array<Object>} items - Arreglo de objetos como el que enviaste.
	 * @returns {boolean} - true si hay nombres duplicados, false si todos son únicos.
	 */
	function thereAreDuplicateNames() {
		const vistos = new Set();

		for (const item of appVars) {
			if (!item || typeof item.name !== 'string') continue; // Ignora si no tiene "name"

			if (vistos.has(item.name)) {
				// Ya se vio este nombre antes → hay duplicado
				return true;
			}

			vistos.add(item.name);
		}

		return false; // No se encontraron nombres repetidos
	}

	onMount(() => {});
</script>

{#snippet left_header(appvar)}
	<span>
		<div class="field has-addons">
			{#if !appvar.edit_name}
				<!-- svelte-ignore a11y_missing_attribute -->
				<p class="control"><a class="button is-static is-small"> {appvar.name} </a></p>
			{/if}

			{#if !isReadOnly}
				{#if appvar.edit_name}
					<p class="control">
						<input
							class="input is-success is-small"
							type="text"
							placeholder="Edit variable name"
							bind:value={appvar.name}
						/>
					</p>

					<p class="control">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="button is-small is-outlined is-success"
							title="Apply"
							onclick={() => {
								// Verificar que no haya ya una variable con ese nombre
								if (thereAreDuplicateNames()) {
									showMessageDuplicateNames();
								} else {
									// Buscar la fila y reemplazarla
									appVars = appVars.map((item) => {
										if (item.idvar == appvar.idvar) {
											item.name = appvar.name;
											item.edit_name = false;
										}
										return item;
									});
								}
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-check"></i>
							</span>
						</button>
					</p>

					<p class="control">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="button is-small is-outlined is-danger"
							title="Cancel"
							onclick={() => {
								appVars = appVars.map((item) => {
									if (item.idvar == appvar.idvar) {
										item.edit_name = false;
										item.name = item.org_name;
									}
									return item;
								});
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-xmark"></i>
							</span>
						</button>
					</p>
				{:else}
					<p class="control">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="button is-small"
							title="Edit variable name"
							onclick={() => {
								appVars = appVars.map((item) => {
									if (item.idvar == appvar.idvar) {
										// Aqui se marca en modo de edición la variable
										item.edit_name = true;
										item.org_name = item.name;
									}
									return item;
								});
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-pen"></i>
							</span>
						</button>
					</p>
				{/if}
			{/if}

			<p class="control">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="button is-small"
					title="Copy Name"
					onclick={async () => {
						let rc = await copyTextToClipboard(appvar.name);

						if (rc.result) {
							classAnimationCopyName = appvar.name;
							setTimeout(() => {
								classAnimationCopyName = '';
							}, 1500);
						}
					}}
				>
					<span class="icon is-small has-text-info">
						<i class="fa-solid fa-copy {classAnimationCopyName == appvar.name ? ' fa-shake ' : ''}"
						></i>
					</span>
				</button>
			</p>
		</div>
	</span>
{/snippet}

{#snippet right_header(appvar)}
	<span>
		{#if !isReadOnly}
			<div class="field has-addons">
				<p class="control">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small is-outlined is-link"
						title="Copy to another environment"
						onclick={() => {
							oncopy(appvar);
						}}
					>
						<span class="icon is-small">
							<i class="fa-regular fa-clone"></i>
						</span>
					</button>
				</p>
				<p class="control">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small is-outlined is-warning"
						title="Save & Deploy"
						onclick={async () => {
							if (thereAreDuplicateNames()) {
								showMessageDuplicateNames();
							} else if (
								confirm('Are you sure you want Save & Deloy the variable ' + appvar.name + '?')
							) {
								// Guardar la variable y emitir evento indicando cambios realizados
								let avr = await UpsertAppVar(appvar, $userStore.token);
								appvar.idvar = avr.idvar;
							}
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-rocket"></i>
						</span>
					</button>
				</p>
				<p class="control">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="button is-small is-outlined is-danger"
						title="Delete variable"
						onclick={async () => {
							if (confirm('Are you sure you want to remove the variable ' + appvar.name + '?')) {
								// Eliminar de base de datos y emitir evento indicando cambios realizados
								let req = await DeleteAppVar(appvar.idvar);
								if (req) {
									appVars = appVars.filter((item) => {
										return item.idvar != appvar.idvar;
									});
								}
							}
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-trash"></i>
						</span>
					</button>
				</p>
			</div>
		{/if}
	</span>
{/snippet}

{#if appVars}
	<div class="box">
		<Level left={[l01]} right={[r01]}>
			{#snippet l01()}
				{title}
			{/snippet}

			{#snippet r01()}
				<div>
					{#if !isReadOnly}
						<div class="field has-addons">
							<div class="control">
								<button class="button is-small is-static"> $_VAR_ </button>
							</div>

							<div class="control">
								<input
									class="input is-small"
									type="text"
									placeholder="New app variable"
									bind:value={new_var_name}
								/>
							</div>
							<div class="control">
								<button
									class="button is-success is-small"
									onclick={() => {
										if (new_var_name && new_var_name.length > 4) {
											// Verificar que la variable no exista
											let var_full_name = '$_VAR_' + new_var_name.toUpperCase();

											if (appNameExists(var_full_name)) {
												alert('Var ' + var_full_name + ' already exists.');
											} else {
												appVars.push({
													idapp: idapp,
													name: var_full_name,
													environment: environment
												});
												appVars = [...appVars];
											}
										} else {
											alert('You must enter at least 5 characters');
										}
									}}
								>
									New
								</button>
							</div>
						</div>
					{/if}
				</div>
			{/snippet}
		</Level>

		{#each appVars as av, i}
			<EditorCode
				showSelectLang={true}
				left={left_Editor}
				right={right_Editor}
				{showCode}
				showFormat={true}
				{isReadOnly}
				bind:code={av.value}
				bind:lang={av.type}
				onchange={(e) => {
					internalOnchange(av.name, e.code);
				}}
			>
				{#snippet left_Editor()}
					{@render left_header(av)}
				{/snippet}

				{#snippet right_Editor()}
					{@render right_header(av)}
				{/snippet}
			</EditorCode>
			<hr class="reset_margin" />
		{/each}
	</div>
{/if}

<style>
	.reset_margin {
		margin: auto;
	}
</style>

<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { isNewApp, mergeSourceOverwrite } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { defaultApp } from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import SaveDeploy from '$lib/OpenFusionAPI/Application/widgets/common/saveDeploy.svelte';
	import TextAreaWidget from '$lib/OpenFusionAPI/Application/widgets/common/textArea.svelte';
	import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { GetApp as GetAppRequest } from '$lib/OpenFusionAPI/Application/utils/request.js';

	let uf = new uFetch();

	let { idapp = $bindable(), onsavedeploy = () => {} } = $props();
	let deploying = $state({ show: false, message: '', error: false });
	let app = $state({ app: '', enabled: false, description: '' });

	$effect(async (onCleanup) => {
		// Guardamos el valor actual de idapp para evitar race conditions
		const idActual = idapp;

		if (isNewApp(idActual)) {
			app = mergeSourceOverwrite(defaultApp, {});
			console.log('Resetear variables'); // Quitamos la referencia a `app` del log
		} else {
			console.log('Cargar datos de la app');

			await GetApp();
		}

		// IMPORTANTE: NUNCA LEAS `app` DENTRO DE ESTE EFECTO
		// Cualquier lectura de `app` haría que el efecto se active cuando `app` cambie
	});

	
	userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	// Función que valida el input para permitir solo letras y números
	function validateInput(event) {
		const tecla = event.key; // obtiene la tecla presionada
		const permitido = /^[a-zA-Z0-9]$/; // solo letras y números

		// Si la tecla NO coincide con la expresión permitida...
		if (!permitido.test(tecla)) {
			event.preventDefault(); // cancela la entrada del carácter
		}
	}

	function clearDataVars() {
		console.log('clearDataVars No hay datos');
	}

	async function SaveApp() {
		try {
			let request = await uf.POST({
				url: url_paths.app,
				data: $state.snapshot(app)
			});

			let response = await request.json();

			if (request.status == 200 && response) {
				app = { ...response };
				deploying.show = false;
				//console.log(response);
			} else {
				deploying.error = true;
				deploying.message = `Error: ${response.message || request.statusText}`;
				// No se obtuvieron datos
				clearDataVars();
			}
		} catch (error) {
			console.error(error);
			deploying.error = true;
			deploying.message = `Error: ${error.message}`;
		}
	}

	async function GetApp() {
		try {
			let response = await GetAppRequest(idapp, $userStore.token);

			if (response) {
				app = { ...response };

				//	console.log(response);
			} else {
				// No se obtuvieron datos
				clearDataVars();
			}
		} catch (error) {
			console.error(error);
		}
	}

	// Alternativamente, también podemos limpiar pegados (Ctrl+V)
	function clearInput(e) {
		const input = e.target;
		input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
	}
</script>

{#snippet label_appname()}
	<span class="has-text-weight-bold">{app.app}</span>
{/snippet}

<div class="">
	<SaveDeploy
		bind:deploying
		left={[label_appname]}
		onsavedeploy={async () => {
			await SaveApp();
			onsavedeploy(app);
		}}
		oncancel={() => {
			alert('No');
		}}
	></SaveDeploy>

	<div class="columns">
		<div class="column">
			<div class="field has-addons">
				<p class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> Application </a>
				</p>
				<p class="control">
					{#if app}
						<input
							class="input is-small"
							type="text"
							placeholder="Application name"
							bind:value={app.app}
							onkeypress={(event) => {
								validateInput(event);
							}}
							oninput={(event) => {
								clearInput(event);
							}}
						/>
					{/if}
				</p>
			</div>
		</div>
		<div class="column">
			<div class="field has-addons">
				<p class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> Enabled </a>
				</p>
				<p class="control">
					{#if app}
						<input
							type="button"
							bind:value={app.enabled}
							class={app.enabled
								? 'button is-success is-selected is-small'
								: 'button is-danger is-small'}
							onclick={() => {
								app.enabled = !app.enabled;
							}}
						/>
					{/if}
				</p>
			</div>
		</div>
	</div>

	<TextAreaWidget label="Description" bind:value={app.description}></TextAreaWidget>
</div>

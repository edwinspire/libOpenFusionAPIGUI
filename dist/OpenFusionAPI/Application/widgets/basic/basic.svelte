<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { isNewApp, mergeSourceOverwrite } from '../../utils/utils.js';
	import { defaultApp } from '../../utils/static_values.js';
	import SaveDeploy from '../common/saveDeploy.svelte';
	import TextAreaWidget from '../common/textArea.svelte';
	import { url_paths } from '../../utils/paths.js';
	import { userStore, statusSystemEndpointsStore } from '../../utils/stores.js';
	import { GetApp as GetAppRequest, GetAppBackup, RestoreAppBackup, restoreSystemEndpoints } from '../../utils/request.js';
	import { Notifications } from '@edwinspire/svelte-components';
	import { onDestroy } from 'svelte';

	let notify = new Notifications();
	let uf = new uFetch();

	let uploaded_file = {};
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

	const unsubscribe = userStore.subscribe((value) => {
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

				console.log(response);
			} else {
				// No se obtuvieron datos
				clearDataVars();
			}

			let status_sys_endp = await restoreSystemEndpoints(false, $userStore.token);
			statusSystemEndpointsStore.set(status_sys_endp);
		} catch (error) {
			console.error(error);
		}
	}

	// Alternativamente, también podemos limpiar pegados (Ctrl+V)
	function clearInput(e) {
		const input = e.target;
		input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
	}

	onDestroy(unsubscribe);
</script>

{#snippet backup_restore_app()}
	{#if $userStore}
		<div class="field has-addons">
			<p class="control">
				<button class="button is-small is-info is-dark">
					<span> Application: {app.app} </span>
				</button>
			</p>
			<p class="control file">
				<input
					class="input is-small"
					type="file"
					accept=".json"
					onchange={(event) => {
						const selectedFile = event.target.files[0]; // Obten el primer archivo seleccionado

						if (!selectedFile) {
							//alert('Por favor, selecciona un archivo JSON válido.');
							notify.push({ message: 'Invalid JSON file', color: 'warning' });
							return;
						}

						const reader = new FileReader();

						// Escucha el evento 'load' que se dispara cuando se ha leído el archivo
						reader.onload = function (e) {
							const fileContent = e.target.result; // Aquí tienes el contenido del archivo

							try {
								uploaded_file = JSON.parse(fileContent);
							} catch (error) {
								uploaded_file = {};
								notify.push({ message: error.message, color: 'danger' });
								console.error('Error al analizar el archivo JSON:', error);
							}
						};

						// Lee el contenido del archivo como texto
						reader.readAsText(selectedFile);
					}}
				/>
			</p>

			<p class="control">
				<button
					class="button is-small"
					onclick={async () => {
						//alert('Ha hecho click');

						//showAppData([uploaded_file]);

						if (
							confirm('This action will replace existing data.') &&
							uploaded_file.idapp == app.idapp
						) {
							// TODO: Aquí puedes realizar acciones con los datos JSON, por ejemplo, mostrarlos en la página.
							let data_return = await RestoreAppBackup(uploaded_file, $userStore.token);
							if (data_return.idapp == app.idapp) {
								//	alert('The file does not correspond to the same application.');
								notify.push({
									message: 'App restored',
									color: 'success'
								});
							} else {
								notify.push({
									message: 'App not restored',
									color: 'danger'
								});
							}
						} else {
							notify.push({
								message: 'The file does not correspond to the same application.',
								color: 'danger'
							});
						}
					}}
				>
					<span class="icon is-small">
						<i class="fa-solid fa-upload"></i>
					</span>

					<span> Upload </span>
				</button>
			</p>
			<p class="control">
				<button
					class="button is-small"
					onclick={async () => {
						const now = new Date();
						const year = now.getFullYear();
						const month = String(now.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
						const day = String(now.getDate()).padStart(2, '0');
						const hours = String(now.getHours()).padStart(2, '0');
						const minutes = String(now.getMinutes()).padStart(2, '0');

						//const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
						let app_json = await GetAppBackup(app.idapp, $userStore.token);
						// Convertir el objeto JSON a una cadena
						const jsonString = JSON.stringify(app_json, null, 2);

						// Crear un Blob con el contenido JSON
						const blob = new Blob([jsonString], { type: 'application/json' });

						// Crear una URL para el Blob
						const url = window.URL.createObjectURL(blob);

						// Crear un enlace para descargar el JSON
						const a = document.createElement('a');
						a.href = url;
						a.download = `app_${app.app}_${year}${month}${day}_${hours}${minutes}.json`;

						// Simular un clic en el enlace para iniciar la descarga
						a.click();

						// Liberar recursos
						window.URL.revokeObjectURL(url);
					}}
				>
					<span class="icon is-small">
						<i class="fa-solid fa-download"></i>
					</span>

					<span> Download </span>
				</button>
			</p>
		</div>
	{/if}
{/snippet}

<div class="">
	<SaveDeploy
		bind:deploying
		left={[backup_restore_app]}
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

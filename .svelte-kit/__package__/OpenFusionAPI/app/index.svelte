<script>
	import uFetch from '@edwinspire/universal-fetch';
	import {
		PredictiveInput,
		Table,
		ColumnTypes,
		Level,
		Tab,
		MenuMega,
		SlideFullScreen
	} from '@edwinspire/svelte-components';
	import { onDestroy, onMount } from 'svelte';
	import {
		userStore,
		getListFunction,
		listAppVars,
		url_paths,
		getCacheSize,
		getCountStatusCode,
		getListUsers,
		defaultValuesRow,
		defaultValuesApp
	} from '../utils.js';
	import CellMethod from './cellMethod.svelte';
	import CellAccess from './cellAccess.svelte';
	import cellHandler from './cellHandler.svelte';
	import cellCountStatusCode from './cellCountStatusCode.svelte';
	import cellPath from './cellPath.svelte';
	import cellCacheTime from './cellCacheTime.svelte';
	import EndPointEditor from './endpoint/editor.svelte';
	import AppVars from './app_vars.svelte';
	import Logo from '../img/favicon.png';

	let idapp = 0;

	let intervalGetDataApp;
	let app_vars;
	let showEditorApp = $state(false);
	let selectedIdApp = $state(0);
	let menujson = {
		start: [],
		brand: [{ component: logo }, { component: select_app }, { component: app_enabled_field }],
		end: [
			{ component: edit_app },
			{ component: new_app },
			{ component: save_deploy },
			{ component: user }
		]
	};

	/**
	 * @type {any}
	 */
	let uploaded_file;
	/**
	 * @type {{}[]}
	 */
	let endpoints = $state([]);
	/**
	 * @type {{ id: any; value: any; }[]}
	 */
	let environment_list = [];
	let showEndpointEdit = $state(false);
	let SelectedRow = $state(defaultValuesRow());
	let TableSelectionType = $state(0);
	let TableObject = $state();
	//let fnVars;
	let active_tab = $state(0);
	//	let showAuthorizations = true;
	let deploying = $state({ show: false, msg: 'Deploying...', error: false });
	//let deployingMsg = 'Deploying...';

	let columns = $state({
		//enabled: { label: 'Enabled App' },
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					custom: {
						ontrue: { label: 'Enabled' },
						onfalse: { label: 'Unabled' },
						editInline: true
					}
				}
			}
		},

		endpoint: { label: 'Endpoint', decorator: { component: cellPath } },
		method: { decorator: { component: CellMethod }, label: 'Method' },
		handler: { decorator: { component: cellHandler }, label: 'Handler' },
		access: {
			label: 'Access',
			decorator: {
				component: CellAccess
			}
		},

		cache_time: { label: 'Cache Time', decorator: { component: cellCacheTime } },
		ctrl: { hidden: true, label: 'Users' },
		resource: { hidden: true },

		code: { label: 'Code', hidden: true },
		idapp: { hidden: true },
		rowkey: { decorator: { component: cellCountStatusCode }, label: 'Status Code' },
		app: { hidden: true },
		namespace: { hidden: true },
		name: { hidden: true },
		version: { hidden: true },
		description: { hidden: true },
		vars: { hidden: true },
		idendpoint: { hidden: true },
		cors: { hidden: true },
		headers_test: { hidden: true },
		data_test: { hidden: true },
		latest_updater: { hidden: true },
		environment: { hidden: true },

		cache_size: { hidden: true }
	});

	let tabs = $state([
		{
			label: 'Description',
			classIcon: 'fa-solid fa-file-lines',
			slot: 'description',
			isActive: false,
			component: tab_descrip
		},
		{
			label: 'Application variables',
			classIcon: 'fa-solid fa-box-archive',
			slot: 'vars',
			isActive: false,
			component: tab_app_vars
		},
		{
			label: 'Application parameters',
			classIcon: 'fa-regular fa-rectangle-list',
			slot: 'parameters',
			isActive: false
		}
	]);

	/**
	 * @type {{ name: any; value: any; }[]}
	 */
	let options = $state([]);

	let app = $state(defaultValuesApp());
	let uf = new uFetch();

	function reloadPage() {
		window.location.reload();
	}

	function confirmSaveApp() {
		console.log('confirmSaveApp', app);
		if (confirm('Do you want to save the application data?')) {
			//app.vars = fnVars.getCode();
			if (app_vars) {
				app.vars = app_vars;
			}
			saveApp();
		}
	}

	async function getEnvList() {
		// Lógica de autenticación aquí

		try {
			let env_list_resp = await uf.GET({ url: url_paths.listEnv });
			let env_list = await env_list_resp.json();

			if (env_list && Array.isArray(env_list) && env_list.length > 0) {
				environment_list = env_list.map((item) => {
					return { id: item.id, value: item.text };
				});
			} else {
				environment_list = [];
			}
		} catch (error) {
			//alert(error.message);
			console.error(error);
		}
	}

	async function clearcache() {
		// Lógica de autenticación aquí

		let urls_clear = TableObject.GetSelectedRows().map((u) => {
			return `${u.endpoint}|${u.method}`;
		});

		try {
			if (urls_clear && Array.isArray(urls_clear) && urls_clear.length > 0) {
				let get_list_clear = await uf.POST({
					url: url_paths.clearCache,
					data: urls_clear
				});

				let get_list_clear_result = await get_list_clear.json();

				alert('Cache deleted');
			} else {
				alert('You must select at least one record.');
				TableSelectionType = 2;
			}
		} catch (error) {
			alert(error.message);
		}
	}

	async function getListApps() {
		// Lógica de autenticación aquí

		try {
			let apps_res = await uf.GET({ url: url_paths.listApps });
			let apps = await apps_res.json();

			if (apps && Array.isArray(apps) && apps.length > 0) {
				options = apps.map((item) => {
					return { name: item.app, value: item.idapp };
				});
			} else {
				options = [];
			}
		} catch (error) {
			//alert(error.message);
			console.error(error);
		}
	}

	/**
	 * @param {string | any[]} app_resp
	 */
	function showAppData(app_resp) {
		if (app_resp && app_resp.length > 0) {
			active_tab = 0;

			app = defaultValuesApp(app_resp[0]);

			console.log('>>>>>>>>>>>>>>>>>>', app.vars);

			if (app && app.vars && typeof app.vars === 'object') {
				listAppVars.set(app.vars);
			} else if (app && app.vars && typeof app.vars === 'string') {
				try {
					listAppVars.set(JSON.parse(app.vars));
				} catch (error) {
					console.error(error);
					listAppVars.set({});
				}
			} else {
				listAppVars.set({});
			}

			getListFunction($userStore.token, app.app, app.environment);
			console.log($userStore);

			if (app.endpoints) {
				//	console.log('Procesar endpoints... ');
				endpoints = app.endpoints.map((/** @type {{ environment: any; resource: any; }} */ ax) => {
					return {
						endpoint: `${ax.method == 'WS' ? '/ws/' : '/api/'}${app.app}${ax.resource}/${ax.environment}`,
						...ax
					};
				});
				//	console.log('Procesardos endpoints... ', endpoints);
				endpoints = endpoints;
			}
		}
	}

	async function getApp() {
		cleanApp(); // Esta linea es importante para que no se vayan a guardar variables de una apliacción a otra
		console.log('getapp', idapp, app);
		if (idapp) {
			try {
				await getListUsers();

				let apps_res = await uf.GET({
					url: url_paths.getApp,
					data: {
						idapp: idapp,
						raw: false
					}
				});
				let app_resp = await apps_res.json();

				showAppData(app_resp);
			} catch (error) {
				console.error(error);
				//alert(error.message);
				deploying.msg = error.message;
			}
		}
	}

	userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	function appToStore() {
		let app_save = { ...app };
		app_save.endpoints = endpoints;

		console.log('appToStore >>>> ', $state.snapshot(app_save));

		return $state.snapshot(app_save);
	}

	function cleanApp() {
		//idapp = 0;
		app = { app: '', idapp: null };
		endpoints = [...new Array()];
		app_vars = undefined;
		listAppVars.set({});
	}

	async function saveApp() {
		deploying.show = true;
		deploying.msg = 'Deploying...';
		deploying.error = null;
		try {
			let apps_res = await uf.POST({ url: url_paths.saveApp, data: appToStore() });

			if (apps_res.status == 200) {
				let rapp = await apps_res.json();
				idapp = rapp?.app?.idapp;
				deploying.msg = 'Deploying successfully...';

				// TODO: Mejorar información de respuesta para indicar tambien los endpoints que no se hayan guardado.

				if (idapp) {
					//alert(rapp?.app?.app + ' saved successfully.');
					deploying.msg = 'Getting app data...';
					getApp();
					deploying.show = false;
				} else {
					//alert('Could not get idapp.');
					deploying.msg = 'Could not save App!';
					deploying.error = true;
				}

				await getListApps();
			} else if (apps_res.status == 401) {
				//alert('The session has expired.');
				deploying.msg = 'The session has expired.';
				deploying.error = true;
				reloadPage();
			} else {
				//alert('Error: ' + apps_res.status);
				deploying.msg = 'Not save app. Error: ' + apps_res.status;
				deploying.error = true;
			}
		} catch (error) {
			//alert(error.message);
			deploying.msg = 'Not save app. Error: ' + error.message;
			deploying.error = true;
		}
	}

	function uploadFile_checkAppname() {
		return !(uploaded_file && uploaded_file.app && uploaded_file.app == app.app);
	}

	onMount(async () => {
		await getListApps();
		await getEnvList();
		app = defaultValuesApp();

		intervalGetDataApp = setInterval(async () => {
			if (app?.app) {
				await getCacheSize(app.app, $userStore.token);
				await getCountStatusCode(app.app, $userStore.token);
			}
		}, 5000);
	});

	onDestroy(() => {
		clearInterval(intervalGetDataApp);
	});
</script>

{#snippet save_deploy()}
	{#if $userStore}
		<button
			disabled={deploying.show}
			class="button is-small is-link is-outlined"
			onclick={() => {
				confirmSaveApp();
			}}
		>
			<span class="icon is-small">
				<i class="fa-solid fa-rocket"></i>
			</span>
			<span>Save & Deploy</span>
		</button>
	{/if}
{/snippet}

{#snippet logo()}
	<img src={Logo} alt="Open Fusion API" />
{/snippet}

{#snippet user()}
	<span class="icon-text">
		<span class="icon">
			<i class="fa-solid fa-user"></i>
		</span>
		<span>{$userStore?.user?.username}</span>
	</span>
{/snippet}

{#snippet tab_descrip()}
	<textarea class="textarea is-small" placeholder="Description" bind:value={app.description}
	></textarea>
{/snippet}

{#snippet tab_app_vars()}
	<AppVars
		isReadOnly={false}
		onchange={(data) => {
			console.log('tab_app_vars', data);
			app_vars = data;
		}}
	></AppVars>
{/snippet}

{#snippet tab_endpoints()}
	<div>
		<Table
			showEditRow="true"
			ShowNewButton="true"
			ShowEditButton="true"
			ShowDeleteButton="true"
			bind:RawDataTable={endpoints}
			bind:columns
			bind:SelectionType={TableSelectionType}
			bind:this={TableObject}
			left_items={[lt01]}
			right_items={[rt1]}
			ondeleterow={(data) => {
				//console.log('ondeleterow', data);
				if (confirm('Do you want to delete the endpoints selected?')) {
					endpoints = endpoints.filter((item) => {
						return !data.rows.some((element) => element.idendpoint == item.idendpoint);
					});
					//console.log('ondeleterow', endpoints);
				}
			}}
			onnewrow={() => {
				/*
		SelectedRow = {
			enabled: false,
			environment: 'dev',
			method: 'NA',
			handler: 'NA',
			resource: '',
			cache_time: 0
		};
		*/

				if (app && app.idapp && app.idapp.length > 0) {
					SelectedRow = defaultValuesRow();

					showEndpointEdit = true;
				} else {
					alert('No App selected');
				}
			}}
			oneditrow={(data) => {
				SelectedRow = defaultValuesRow(data);
				showEndpointEdit = true;
			}}
		>
			{#snippet lt01()}
				Endpoints
			{/snippet}
			<!-- <span slot="r09">
		<button
			class="button is-small"
			onclick={() => {
				showAuthorizations = !showAuthorizations;

				if (showAuthorizations) {
					columns.ctrl.hidden = false;
					columns.cache_time.hidden = true;
				} else {
					columns.ctrl.hidden = true;
					columns.cache_time.hidden = false;
				}
			}}
		>
			<span class="icon is-small">
				<i class="fa-solid fa-users"></i>
			</span>
			<span>Users</span>
		</button>
	</span> -->

			{#snippet rt1()}
				<span>
					<button
						class="button is-small"
						onclick={() => {
							clearcache();
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-eraser"></i>
						</span>
						<span>Cache</span>
					</button>
				</span>
			{/snippet}
		</Table>
	</div>
{/snippet}

{#snippet new_app()}
	{#if $userStore}
		<button
			class="button is-small is-primary is-outlined"
			onclick={() => {
				cleanApp();
				idapp = 0;
				selectedIdApp = 'sdsd';
				showEditorApp = true;
			}}
		>
			<span class="icon is-small">
				<i class="fa-regular fa-file"></i>
			</span>
			<span>New App</span>
		</button>
	{/if}
{/snippet}

{#snippet edit_app()}
	{#if $userStore && app.idapp}
		<button
			class="button is-small is-primary is-outlined"
			onclick={() => {
				showEditorApp = true;
			}}
		>
			<span class="icon is-small">
				<i class="fa-solid fa-pen"></i>
			</span>
			<span>Edit App</span>
		</button>
	{/if}
{/snippet}

{#snippet select_app()}
	<PredictiveInput
		label="Application"
		classLabel="is-small"
		classInput="is-small"
		bind:options
		bind:selectedValue={selectedIdApp}
		onselect={(/** @type {{ detail: { value: number; }; }} */ e) => {
			console.log('PredictiveInput =>> ', $userStore, e);

			if ($userStore) {
				idapp = e.value;
				getApp();
			} else {
				alert('You do not have authorization');
			}
		}}
	/>
{/snippet}

{#snippet app_enabled_field()}
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
{/snippet}

<MenuMega brand={menujson.brand} start={menujson.start} end={menujson.end}></MenuMega>

{#if $userStore}
	<div>
		{@render tab_endpoints()}
	</div>
{/if}

{#if app}
	<EndPointEditor
		bind:showEditor={showEndpointEdit}
		row={SelectedRow}
		{app}
		ondata={(e) => {
			let row_edited = { ...e.row };

			if (row_edited.idendpoint && row_edited.idendpoint.length > 10) {
				// Es edición de endpoint
				/*
				let found = endpoints.findIndex((element) => element.idendpoint == row_edited.idendpoint);
				console.log('Se ha encontrado: ', found);
				if (found >= 0) {
					endpoints[found] = { ...row_edited };
				}
				*/

				endpoints = endpoints.map((org) => {
					return row_edited.idendpoint == org.idendpoint ? row_edited : org;
				});

				console.log(endpoints);

				//found = { ...SelectedRow };
			} else {
				// es nuevo endpoint

				// Busca si el endpoint existe ya en la tabla, si ya existe la actualiza, si no la agrega
				let found = endpoints.findIndex((element) => element.endpoint == row_edited.endpoint);
				if (found >= 0) {
					endpoints[found] = { ...row_edited };
				} else {
					endpoints.unshift({
						idapp: app.idapp,
						idendpoint: undefined,
						endpoint: row_edited.endpoint,
						resource: row_edited.resource,
						enabled: row_edited.enabled,
						access: row_edited.access,
						environment: row_edited.environment,
						resource: row_edited.resource,
						method: row_edited.method,
						handler: row_edited.handler,
						cors: row_edited.cors,
						code: row_edited.code,
						description: row_edited.description,
						headers_test: row_edited.headers_test,
						data_test: row_edited.data_test,
						rowkey: 0,
						latest_updater: $userStore.iduser,
						cache_time: row_edited.cache_time
					});
				}

				endpoints = [...endpoints]; // Esto se hace para que se actualice la tabla
				//endpoints = endpoints; // Esto se hace para que se actualice la tabla
				console.log('Con nuevo endpoint:::::> ', endpoints);
			}
		}}
	></EndPointEditor>
{/if}

{#if app}
	<SlideFullScreen bind:show={showEditorApp}>
		<Level left={[]} right={[r01]}>
			{#snippet r01()}
				<div class="field has-addons">
					<p class="control">
						<button
							class="button is-small is-link"
							onclick={() => {
								confirmSaveApp();
								showEditorApp = false;
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-rocket"></i>
							</span>
							<span>Save & Deploy</span>
						</button>
					</p>
					<p class="control">
						<button
							class="button is-small"
							onclick={() => {
								//console.log('app Actual', app, app_vars);

								if (
									confirm(
										'If you cancel, you will lose absolutely all changes made to the app. Do you want to continue?'
									)
								) {
									getApp();
									showEditorApp = false;
								}
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-xmark"></i>
							</span>
							<span>Cancel</span>
						</button>
					</p>
				</div>
			{/snippet}
		</Level>

		<Level left={[app_name_field, app_enabled_field]} right={[upload_app, download_app]}>
			{#snippet app_name_field()}
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
							/>
						{/if}
					</p>
				</div>
			{/snippet}

			{#snippet download_app()}
				{#if $userStore}
					<button
						class="button is-small"
						onclick={() => {
							const now = new Date();
							const year = now.getFullYear();
							const month = String(now.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
							const day = String(now.getDate()).padStart(2, '0');
							const hours = String(now.getHours()).padStart(2, '0');
							const minutes = String(now.getMinutes()).padStart(2, '0');

							//const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

							// Convertir el objeto JSON a una cadena
							const jsonString = JSON.stringify(appToStore(), null, 2);

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
							<i class="fa-solid fa-file-export"></i>
						</span>
						<span>Download</span>
					</button>
				{/if}
			{/snippet}

			{#snippet upload_app()}
				{#if $userStore}
					<div class="field has-addons">
						<p class="control file">
							<input
								class="input is-small"
								type="file"
								accept=".json"
								onchange={(event) => {
									const selectedFile = event.target.files[0]; // Obten el primer archivo seleccionado

									if (!selectedFile) {
										alert('Por favor, selecciona un archivo JSON válido.');
										return;
									}

									const reader = new FileReader();

									// Escucha el evento 'load' que se dispara cuando se ha leído el archivo
									reader.onload = function (e) {
										const fileContent = e.target.result; // Aquí tienes el contenido del archivo

										try {
											uploaded_file = JSON.parse(fileContent);

											// TODO: Aquí puedes realizar acciones con los datos JSON, por ejemplo, mostrarlos en la página.

											if (uploadFile_checkAppname()) {
												alert('The file does not correspond to the same application.');
											}
										} catch (error) {
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
								onclick={() => {
									//alert('Ha hecho click');

									//showAppData([uploaded_file]);

									if (uploadFile_checkAppname()) {
										alert('The file does not correspond to the same application.');
									} else {
										if (uploaded_file) {
											if (confirm('Are you sure to merge the file with your data?')) {
												if (uploaded_file.endpoints && Array.isArray(uploaded_file.endpoints)) {
													// Chequear los endpoints donde le colocamos el idenpoint
													uploaded_file.endpoints = uploaded_file.endpoints.map((ep) => {
														// buscar si existe el endpoint
														let current_endpoint = app.endpoints.find((element) => {
															return (
																element.environment == ep.environment &&
																element.method == ep.method &&
																element.resource == ep.resource
															);
														});

														if (current_endpoint) {
															ep.idendpoint = current_endpoint.idendpoint;
														}
														return ep;
													});

													// Utilizar filter() para encontrar los elementos que existen en arrayA pero no en arrayB
													const ep_diff = app.endpoints.filter((app_ep) => {
														return !uploaded_file.endpoints.some(
															(uep) => app_ep.idendpoint === uep.idendpoint
														);
													});

													uploaded_file.endpoints = uploaded_file.endpoints.concat(ep_diff);

													//app = { ...uploaded_file };
													showAppData([uploaded_file]);
													uploaded_file = null;
												}
											}
										} else {
											alert('Please new select file!');
										}
									}
								}}
							>
								<span class="icon is-small">
									<i class="fas fa-align-left"></i>
								</span>

								<span> Upload </span>
							</button>
						</p>
					</div>
				{/if}
			{/snippet}
		</Level>

		<Tab bind:tabs bind:active={active_tab}></Tab>
	</SlideFullScreen>
{/if}

<div class="modal {deploying.show ? 'is-active' : ''}">
	<div class="modal-background"></div>

	<div class="modal-content">
		<div class="box">
			<p>{deploying.msg}</p>
			<br />
			{#if deploying.error}
				<progress class="progress is-small is-danger" max="100" value="10">Loading...</progress>
			{:else}
				<progress class="progress is-small is-primary" max="100">Loading...</progress>
			{/if}

			<!-- Your content -->
		</div>
	</div>

	{#if deploying.error}
		<button
			class="modal-close is-large"
			aria-label="close"
			onclick={() => {
				deploying.show = false;
				deploying.msg = '';
				deploying.error = null;
			}}
		></button>
	{/if}
</div>

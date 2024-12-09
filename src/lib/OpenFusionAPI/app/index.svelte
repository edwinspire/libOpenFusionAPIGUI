<script>
	// @ts-ignore
	import uFetch from '@edwinspire/universal-fetch';
	import { PredictiveInput, Table, ColumnTypes, Level, Tab } from '@edwinspire/svelte-components';
	import { onMount } from 'svelte';
	//import { createEventDispatcher } from 'svelte';
	import {
		userStore,
		getListFunction,
		listAppVars,
		url_paths,
		getCacheSize,
		getCountStatusCode,
		getListUsers
	} from '../utils.js';
	import CellMethod from './cellMethod.svelte';
	import CellAccess from './cellAccess.svelte';
	import cellHandler from './cellHandler.svelte';
	import cellCountStatusCode from './cellCountStatusCode.svelte';
	import cellPath from './cellPath.svelte';
	import cellCacheTime from './cellCacheTime.svelte';
	import EndPointEditor from './endpoint/editor.svelte';
	import AppVars from './app_vars.svelte';

	//const dispatch = createEventDispatcher();
	export let idapp = 0;

	const default_row = {
		idendpoint: undefined,
		enabled: false,
		access: 0,
		environment: 'dev',
		resource: '',
		method: 'GET',
		handler: 'NA',
		cors: null,
		code: '',
		description: '',
		headers_test: {},
		data_test: {},
		rowkey: 0,
		latest_updater: null,
		cache_time: 0,
		ctrl: {}
	};

	/**
	 * @type {any}
	 */
	let uploaded_file;
	/**
	 * @type {{}[]}
	 */
	let endpoints = [];
	/**
	 * @type {{ id: any; value: any; }[]}
	 */
	let environment_list = [];
	let showEndpointEdit = false;
	let SelectedRow = {};
	let TableSelectionType = 0;
	let TableObject;
	let fnVars;
	let active_tab = 0;
	//	let showAuthorizations = true;

	let columns = {
		//enabled: { label: 'Enabled App' },
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.BooleanIcon,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: true
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
		rowkey: { decorator: {component: cellCountStatusCode}, label: "Status Code" },
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
	};

	let tabs = [
		{
			label: 'Endpoints',
			classIcon: 'fa-solid fa-rectangle-list',
			slot: 'endpoints',
			isActive: true
		},
		{
			label: 'Description',
			classIcon: 'fa-solid fa-file-lines',
			slot: 'description',
			isActive: false
		},
		{
			label: 'Application variables',
			classIcon: 'fa-solid fa-box-archive',
			slot: 'vars',
			isActive: false
		},
		{
			label: 'Application parameters',
			classIcon: 'fa-regular fa-rectangle-list',
			slot: 'parameters',
			isActive: false
		}
	];

	/**
	 * @type {{ name: any; value: any; }[]}
	 */
	let options = [];

	//let SelectedEndpoints = [];
	/**
	 * @type {any}
	 */
	let app = {};

	let uf = new uFetch();

	$: idapp, getApp();
	// @ts-ignore
	//$: SelectedRow.resource, checkResource();

	function reloadPage() {
		window.location.reload();
	}

	async function getEnvList() {
		// Lógica de autenticación aquí

		try {
			//      console.log("getListApps > ", $userStore, uf);

			let env_list_resp = await uf.GET({ url: url_paths.listEnv });
			let env_list = await env_list_resp.json();
			//console.log(apps);

			if (env_list && Array.isArray(env_list) && env_list.length > 0) {
				environment_list = env_list.map((item) => {
					return { id: item.id, value: item.text };
				});
			} else {
				environment_list = [];
			}
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	}

	async function clearcache() {
		// Lógica de autenticación aquí

		let urls_clear = TableObject.GetSelectedRows().map((u) => {
			//console.log(u);
			return `${u.endpoint}|${u.method}`;
		});

		try {
			//      console.log("getListApps > ", $userStore, uf);
			if (urls_clear && Array.isArray(urls_clear) && urls_clear.length > 0) {
				let get_list_clear = await uf.POST({
					url: url_paths.clearCache,
					data: urls_clear
				});

				let get_list_clear_result = await get_list_clear.json();

				//	console.log('Clear Cache', get_list_clear_result);

				alert('Cache deleted');
			} else {
				alert('You must select at least one record.');
				TableSelectionType = 2;
			}
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	}

	async function getListApps() {
		// Lógica de autenticación aquí

		try {
			//      console.log("getListApps > ", $userStore, uf);

			let apps_res = await uf.GET({ url: url_paths.listApps });
			let apps = await apps_res.json();
			//console.log(apps);

			if (apps && Array.isArray(apps) && apps.length > 0) {
				options = apps.map((item) => {
					return { name: item.app, value: item.idapp };
				});
			} else {
				options = [];
			}
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	}

	/**
	 * @param {string | any[]} app_resp
	 */
	function showAppData(app_resp) {
		if (app_resp && app_resp.length > 0) {
			active_tab = 0;

			//appDataTable = AppToTable(app);
			app = app_resp[0];

			if (app && !app.params) {
				app.params = {};
			}

			if (app && !app.params.telegram) {
				app.params.telegram = {};
			}

			if (app && app.params.telegram && !app.params.telegram.idgroup) {
				app.params.telegram.idgroup = '';
			}

			//console.log('>>>><> ', app);

			if (app && app.vars && typeof app.vars === 'object') {
				listAppVars.set(app.vars);

				//				console.log('===>>>> VARS', app.vars);
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

			// @ts-ignore
			getListFunction($userStore.token, app.app, app.environment);

			//console.log('showAppData >> ', app.endpoints);

			if (app.endpoints) {
				endpoints = app.endpoints.map((/** @type {{ environment: any; resource: any; }} */ ax) => {
					return {
						endpoint: `${ax.method == 'WS' ? '/ws/' : '/api/'}${app.app}${ax.resource}/${ax.environment}`,
						...ax
					};
				});
				//	console.log(endpoints);
			}
		}
	}

	async function getApp() {
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
				//console.log(app_resp);
				showAppData(app_resp);
			} catch (error) {
				// @ts-ignore
				alert(error.message);
			}
		}
	}

	userStore.subscribe((value) => {
		// console.log('tokenStore ->>>>', value);
		// @ts-ignore
		uf.setBearerAuthorization(value.token);
	});

	function appToStore() {
		let app_save = { ...app };
		app_save.endpoints = endpoints;

		console.log('appToStore >>>> ', app_save);

		return app_save;
	}

	async function saveApp() {
		try {
			let apps_res = await uf.POST({ url: url_paths.saveApp, data: appToStore() });

			if (apps_res.status == 200) {
				let rapp = await apps_res.json();

				if (idapp == rapp.idapp) {
					alert('Saved successfully.');

					getApp();
				} else {
					idapp = rapp.idapp;
				}

				await getListApps();
			} else if (apps_res.status == 401) {
				alert('The session has expired.');
				reloadPage();
			} else {
				alert('Error: ' + apps_res.status);
			}
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	}

	function uploadFile_checkAppname() {
		return !(uploaded_file && uploaded_file.app && uploaded_file.app == app.app);
	}

	onMount(async () => {
		// dataUser = tokenVerify(tokenStore);
		// uf.addHeader();
		// console.log($userStore);
		await getListApps();
		await getEnvList();
		setInterval(async () => {
			await getCacheSize(app.app, $userStore.token);
			await getCountStatusCode(app.app, $userStore.token);
		}, 5000);
		// @ts-ignore
	});
</script>

<Level>
	<span slot="r01">
		{#if $userStore}
			<button
				class="button is-small is-primary is-outlined"
				on:click={() => {
					app = { app: '', idapp: null };
					endpoints = [];
				}}
			>
				<span class="icon is-small">
					<i class="fab fa-github" />
				</span>
				<span>New App</span>
			</button>
		{/if}
	</span>

	<span slot="r02">
		<PredictiveInput
			label="Application: "
			classLabel="is-small"
			classInput="is-small"
			bind:options
			on:select={(/** @type {{ detail: { value: number; }; }} */ e) => {
				// console.log('>>>>>> Application > ', $userStore, userStore);

				if ($userStore) {
					idapp = e.detail.value;
				} else {
					alert('You do not have authorization');
				}
			}}
		/></span
	>
</Level>

<div />

{#if $userStore}
	<div>
		<Level>
			<span slot="l01">
				<div class="field has-addons">
					<p class="control">
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="button is-static is-small"> Application </a>
					</p>
					<p class="control">
						<input
							class="input is-small"
							type="text"
							placeholder="Application name"
							bind:value={app.app}
						/>
					</p>
				</div>
			</span>
			<span slot="l02">
				<div class="field has-addons">
					<p class="control">
						<!-- svelte-ignore a11y-missing-attribute -->
						<a class="button is-static is-small"> Enabled </a>
					</p>
					<p class="control">
						<input
							type="button"
							bind:value={app.enabled}
							class={app.enabled
								? 'button is-success is-selected is-small'
								: 'button is-danger is-small'}
							on:click={() => {
								app.enabled = !app.enabled;
							}}
						/>
					</p>
				</div>
			</span>
			<span slot="r01">
				{#if $userStore}
					<button
						class="button is-small is-link is-outlined"
						on:click={() => {
							//	console.log(fnVarsDev.getCode());

							if (confirm('Do you want to save the application data?')) {
								app.vars = fnVars.getCode();
								saveApp();
							}
						}}
					>
						<span class="icon is-small">
							<i class="fab fa-github" />
						</span>
						<span>Save</span>
					</button>
				{/if}
			</span>

			<span slot="r02">
				{#if $userStore}
					<button
						class="button is-small"
						on:click={() => {
							console.log('Download', app);

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
							<i class="fa-solid fa-file-export" />
						</span>
						<span>Download</span>
					</button>
				{/if}
			</span>

			<span slot="r03">
				{#if $userStore}
					<div class="field has-addons">
						<p class="control file">
							<input
								class="input is-small"
								type="file"
								accept=".json"
								on:change={(event) => {
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
											// console.log('Contenido del archivo JSON:', uploaded_file);

											// TODO: Aquí puedes realizar acciones con los datos JSON, por ejemplo, mostrarlos en la página.
											console.log('>>>>>>>>>>>>> -> ', uploaded_file, app);
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
								on:click={() => {
									//alert('Ha hecho click');

									//showAppData([uploaded_file]);

									if (uploadFile_checkAppname()) {
										alert('The file does not correspond to the same application.');
									} else {
										if (uploaded_file) {
											if (confirm('Are you sure to merge the file with your data?')) {
												//app = { ...uploaded_file };
												//uploaded_file = null;

												//	console.log(uploaded_file);

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

														//console.log(current_endpoint);
														if (current_endpoint) {
															ep.idendpoint = current_endpoint.idendpoint;
														}
														return ep;
													});

													console.log('>>> ', uploaded_file.endpoints);

													// Utilizar filter() para encontrar los elementos que existen en arrayA pero no en arrayB
													const ep_diff = app.endpoints.filter((app_ep) => {
														return !uploaded_file.endpoints.some(
															(uep) => app_ep.idendpoint === uep.idendpoint
														);
													});
													console.log('Resultado de los que no existen: ', ep_diff);

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
									<i class="fas fa-align-left" />
								</span>

								<span> Upload </span>
							</button>
						</p>
					</div>
				{/if}
			</span>
		</Level>

		<Tab bind:tabs bind:active={active_tab}>
			<div style="display: {active_tab == 0 ? 'block' : 'none'};">
				<Table
					ShowNewButton="true"
					ShowEditButton="true"
					bind:RawDataTable={endpoints}
					bind:columns
					bind:SelectionType={TableSelectionType}
					bind:this={TableObject}
					on:newrow={() => {
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

						console.log(app);
						if (app && app.idapp && app.idapp.length > 0) {
							SelectedRow = { ...default_row };

							showEndpointEdit = true;
						} else {
							alert('No App selected');
						}
					}}
					on:editrow={(e) => {
						SelectedRow = { ...e.detail.data };
						showEndpointEdit = true;
						//	console.log('SelectedRow: ', SelectedRow);
					}}
				>
					<span slot="l01"> Endpoints </span>

					<!-- <span slot="r09">
						<button
							class="button is-small"
							on:click={() => {
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

					<span slot="r10">
						<button
							class="button is-small"
							on:click={() => {
								clearcache();
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-eraser"></i>
							</span>
							<span>Cache</span>
						</button>
					</span>
				</Table>
			</div>

			<div style="display: {active_tab == 1 ? 'block' : 'none'};">
				<textarea
					class="textarea is-small"
					placeholder="Description"
					bind:value={app.description}
				/>
			</div>

			<div style="display: {active_tab == 2 ? 'block' : 'none'};">
				<AppVars isReadOnly={false} bind:this={fnVars}></AppVars>
			</div>

			<div style="display: {active_tab == 3 ? 'block' : 'none'};"></div>
		</Tab>
	</div>
{/if}

<EndPointEditor
	bind:showEditor={showEndpointEdit}
	bind:row={SelectedRow}
	{app}
	on:data={(e) => {
		// console.log('EndPointEditor >>>> ', e);

		let row_edited = e.detail.row;

		//	console.log(row_edited);

		if (row_edited.idendpoint && row_edited.idendpoint.length > 10) {
			// Es edición de endpoint
			let found = endpoints.findIndex((element) => element.idendpoint == row_edited.idendpoint);
			//	console.log('Se ha encontrado: ', found);
			if (found >= 0) {
				endpoints[found] = { ...row_edited };
			}
			//found = { ...SelectedRow };
		} else {
			// es nuevo endpoint
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
			endpoints = endpoints; // Esto se hace para que se actualice la tabla
		}
	}}
></EndPointEditor>

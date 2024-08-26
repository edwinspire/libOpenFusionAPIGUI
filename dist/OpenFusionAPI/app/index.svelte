<script>
	// @ts-ignore
	import uFetch from '@edwinspire/universal-fetch';
	import {
		PredictiveInput,
		Table,
		ColumnTypes,
		DialogModal,
		Level,
		Tab,
		sha256
		// @ts-ignore
	} from '@edwinspire/svelte-components';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { userStore, getListFunction, listAppVars, url_paths } from '../utils.js';
	import CellMethod from './cellMethod.svelte';
	import CellAccess from './cellAccess.svelte';
	import cellHandler from './handler/cellHandler/index.svelte';
	import cellPath from './cellPath.svelte';
	import cellCacheTime from './cellCacheTime.svelte';
	import { validateURL } from '../utils.js';

	import AppVars from './app_vars.svelte';

	import SelectEnvironment from '../widgets/Select.svelte';

	const dispatch = createEventDispatcher();
	export let idapp = 0;

	const default_row = {
		idendpoint: undefined,
		enabled: true,
		access: 0,
		environment: 'dev',
		resource: '',
		method: 'GET',
		handler: 'NA',
		cors: null,
		code: undefined,
		description: '',
		headers_test: {},
		data_test: {},
		rowkey: 0,
		latest_updater: null,
		cache_time: 0,
		ctrl: {},
		cache_size: 0
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
	let validateResource = false;
	let availableURL = false;
	let TableSelectionType = 0;
	let TableObject;

	let fnVars;

	let hash_data_cache = '-';
	let active_tab = 0;

	let columns = {
		//enabled: { label: 'Enabled App' },
		endpoint: { label: 'Endpoint', decorator: { component: cellPath } },
		enabled: {
			label: 'Enabled Endpoint',
			decorator: {
				component: ColumnTypes.BooleanIcon,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: true
				}
			}
		},
		cache_time: { label: 'Cache Time', decorator: { component: cellCacheTime } },
		method: { decorator: { component: CellMethod }, label: 'Method' },
		handler: { decorator: { component: cellHandler }, label: 'Handler' },
		resource: { hidden: true },
		access: {
			label: 'Access',
			decorator: {
				component: CellAccess
			}
		},
		code: { label: 'Code', hidden: true },
		idapp: { hidden: true },
		rowkey: { hidden: true },
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
		ctrl: { hidden: true },
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
	$: SelectedRow.resource, checkResource();

	function checkResource() {
		// @ts-ignore
		validateResource = validateURL(SelectedRow.resource);
		//		console.log('validateURL: ', SelectedRow.resource, validateResource);

		availableURL = checkEndpointConstraint(SelectedRow);
	}

	/**
	 * @param {{ resource?: any; environment?: any; method?: any; idendpoint?: any; }} endpoint_value
	 */
	function checkEndpointConstraint(endpoint_value) {
		let check = endpoints.some((row) => {
			//	console.log(endpoint_value, row);
			return (
				// @ts-ignore
				endpoint_value.resource == row.resource &&
				// @ts-ignore
				endpoint_value.environment == row.environment &&
				// @ts-ignore
				endpoint_value.method == row.method &&
				// @ts-ignore
				endpoint_value.idendpoint != row.idendpoint
			);
		});
		return !check;
	}

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

	async function getCacheSize() {
		// Lógica de autenticación aquí

		try {
			//      console.log("getListApps > ", $userStore, uf);
			if (app && app.app) {
				let get_list_cache = await uf.GET({
					url: url_paths.getCacheSize,
					data: { appName: app.app }
				});

				let cache_list = await get_list_cache.json();

				//console.log('>> cache_list >> ', cache_list, JSON.stringify(cache_list));

				// Verificar si hay cambios en los datos, si es así actualizar la tabla
				if (cache_list && Array.isArray(cache_list)) {
					let hash_data_cache_now = sha256(
						JSON.stringify(cache_list.length > 0 ? cache_list : '0')
					);

					if (hash_data_cache !== hash_data_cache_now) {
						hash_data_cache = hash_data_cache_now;
						endpoints = endpoints.map((item) => {
							let rItem = item;
							let data_cache = cache_list.find((element) => element.url == item.endpoint);
							rItem['cache_size'] = data_cache ? data_cache.bytes : 0;
							return rItem;
						});
					}
				}

				//
				//	console.log(cache_list, endpoints);
			}
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	}

	async function clearcache() {
		// Lógica de autenticación aquí

		let urls_clear = TableObject.GetSelectedRows().map((u) => {
			return u.endpoint;
		});

		try {
			//      console.log("getListApps > ", $userStore, uf);
			if (urls_clear && Array.isArray(urls_clear) && urls_clear.length > 0) {
				let get_list_clear = await uf.POST({
					url: url_paths.clearCache,
					data: urls_clear
				});

				let get_list_clear_result = await get_list_clear.json();

				console.log('Clear Cache', get_list_clear_result);

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

			if (app && app.vars && typeof app.vars === 'object') {
				listAppVars.set(app.vars);

				console.log('===>>>> VARS', app.vars);
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

			console.log('showAppData >> ', app.endpoints);

			if (app.endpoints) {
				endpoints = app.endpoints.map((/** @type {{ environment: any; resource: any; }} */ ax) => {
					return {
						endpoint: `${ax.method == 'WS' ? '/ws/' : '/api/'}${app.app}${ax.resource}/${ax.environment}`,
						...ax
					};
				});
				console.log(endpoints);
			}
		}
	}

	async function getApp() {
		if (idapp) {
			try {
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

		//console.log('v >> ', app, app_save);

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

	onMount(async () => {
		// dataUser = tokenVerify(tokenStore);
		// uf.addHeader();
		// console.log($userStore);
		await getListApps();
		await getEnvList();
		setInterval(async () => {
			await getCacheSize();
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
				console.log('>>>>>> Application > ', $userStore, userStore);

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

								console.log('---> fnVars ', fnVars.getCode(), app);

								/*
								app.vars.dev = fnVarsDev.getCode();
								app.vars.qa = fnVarsQa.getCode();
								app.vars.prd = fnVarsPrd.getCode();
								*/
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
											showAppData([uploaded_file]);
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

									if (uploaded_file) {
										if (confirm('Do you want to replace app data permanently?')) {
											app = { ...uploaded_file };
											uploaded_file = null;
										}
									} else {
										alert('Please new select file!');
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
						SelectedRow = { ...default_row };

						showEndpointEdit = true;
					}}
					on:editrow={(e) => {
						SelectedRow = { ...e.detail.data };
						showEndpointEdit = true;
						console.log(SelectedRow);
					}}
				>
					<span slot="l01"> Endpoints </span>
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
		</Tab>
	</div>
{/if}

<DialogModal
	bind:Show={showEndpointEdit}
	on:cancel={() => {
		console.log('Ha cancelado');
		//data = {};
	}}
	on:ok={() => {
		//console.log('SelectedRow >>> ', SelectedRow);
		SelectedRow.idapp = app.idapp;
		SelectedRow.latest_updater = $userStore.iduser;

		if (validateResource && availableURL) {
			SelectedRow.endpoint = `${SelectedRow.method == 'WS' ? '/ws/' : '/api/'}${app.app}${SelectedRow.resource}/${SelectedRow.environment}`;

			console.log('SelectedRow: ', SelectedRow);

			if (SelectedRow.idendpoint) {
				// Es edición de endpoint
				let found = endpoints.findIndex((element) => element.idendpoint == SelectedRow.idendpoint);
				//		console.log('Se ha encontrado: ', found);
				if (found >= 0) {
					endpoints[found] = { ...SelectedRow };
				}
				//found = { ...SelectedRow };
			} else {
				// es nuevo endpoint
				endpoints.unshift({
					idapp: app.idapp,
					idendpoint: undefined,
					endpoint: SelectedRow.endpoint,
					resource: SelectedRow.resource,
					enabled: SelectedRow.enabled,
					access: 0,
					environment: SelectedRow.environment,
					resource: SelectedRow.resource,
					method: SelectedRow.method,
					handler: 'NA',
					cors: null,
					code: '',
					description: SelectedRow.description,
					headers_test: {},
					data_test: {},
					rowkey: 0,
					latest_updater: $userStore.iduser,
					cache_time: 0
				});
			}
			/*
			endpoints = endpoints.map((en) => {
				return en;
			});
			*/

			showEndpointEdit = false;
		} else {
			alert('The data has errors, please review it.');
		}
	}}
>
	<span slot="title">Endpoint Edit</span>

	<div slot="body">
		<input class="input" type="hidden" placeholder="Name" bind:value={SelectedRow.idendpoint} />

		<div class="field is-horizontal">
			<div class="field-label is-small">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">Enabled</label>
			</div>
			<div class="field-body">
				<div class="field">
					<div class="control">
						<label class="checkbox">
							<input type="checkbox" bind:checked={SelectedRow.enabled} />
						</label>
					</div>
				</div>
			</div>
		</div>

		<div class="field is-horizontal">
			<div class="field-label is-small">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">Method</label>
			</div>
			<div class="field-body">
				<div class="field">
					<div class="control">
						<CellMethod bind:value={SelectedRow.method} />
					</div>
				</div>
			</div>
		</div>

		<div class="field">
			<div class="field is-horizontal">
				<div class="field-label is-small"><strong> API Resource: </strong></div>
				<div class="field-body">
					<div class="field is-expanded">
						<div class="field has-addons">
							<p class="control">
								<!-- svelte-ignore a11y-missing-attribute -->
								<a class="button is-small is-static">
									{SelectedRow.method == 'WS' ? '/ws/' : '/api/'}{app.app}
								</a>
							</p>

							<p class="control is-expanded">
								<input
									class="input is-small"
									type="text"
									placeholder="Resourse"
									bind:value={SelectedRow.resource}
								/>
							</p>
							<p class="control">
								<!-- svelte-ignore a11y-missing-attribute -->
								<a class="button is-small is-static"> / </a>
							</p>
							<p class="control">
								<SelectEnvironment
									bind:options={environment_list}
									bind:option={SelectedRow.environment}
									on:select={(e) => {
										//	console.log(e);
									}}
								/>
							</p>
						</div>
						<p class="help">
							{#if validateResource}
								<div class="icon-text is-small">
									<span class="icon has-text-success">
										<i class="fas fa-check-square" />
									</span>
									<span>Url Success</span>
								</div>
							{:else}
								<div class="icon-text is-small">
									<span class="icon has-text-danger">
										<i class="fas fa-ban" />
									</span>
									<span>Url Invalid</span>
								</div>
							{/if}

							{#if validateResource && availableURL}
								<div class="icon-text is-small">
									<span class="icon has-text-success">
										<i class="fas fa-check-square" />
									</span>
									<span>Available URL</span>
								</div>
							{:else if validateResource && !availableURL}
								<div class="icon-text is-small">
									<span class="icon has-text-danger">
										<i class="fas fa-ban" />
									</span>
									<span>Url not available</span>
								</div>
							{/if}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="field">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label is-small">Description</label>
			<div class="control">
				<textarea
					class="textarea is-small"
					placeholder="Textarea"
					bind:value={SelectedRow.description}
				/>
			</div>
		</div>
	</div>
</DialogModal>

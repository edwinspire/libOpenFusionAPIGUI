<script>
	import uFetch from '@edwinspire/universal-fetch';
	import {
		PredictiveInput,
		Table,
		ColumnTypes,
		Level,
		Tab,
		MenuMega,
		SlideFullScreen,
		Modal
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
		defaultValuesApp,
		createEndpoint
	} from '$lib/OpenFusionAPI/utils.js';
	import CellMethod from '$lib/OpenFusionAPI/app/cellMethod.svelte';
	import CellAccess from '$lib/OpenFusionAPI/app/cellAccess.svelte';
	import cellHandler from '$lib/OpenFusionAPI/app/cellHandler.svelte';
	import cellCountStatusCode from '$lib/OpenFusionAPI/app/cellCountStatusCode.svelte';
	import cellPath from '$lib/OpenFusionAPI/app/cellPath.svelte';
	import cellCacheTime from '$lib/OpenFusionAPI/app/cellCacheTime.svelte';
	import EndPointEditor from '$lib/OpenFusionAPI/app/endpoint/editor.svelte';
	import AppVars from '$lib/OpenFusionAPI/app/app_vars.svelte';
	import Logo from '$lib/OpenFusionAPI/img/favicon.png';
	import { Notifications } from '@edwinspire/svelte-components';
	import IntervalTasks from '$lib/OpenFusionAPI/app/interval_tasks/index.svelte';
	import cellMCPTool from '$lib/OpenFusionAPI/app/cellMCPTool.svelte';

	let notify = new Notifications();

	let idapp = $state(0);

	let intervalGetDataApp;
	let app_vars;
	let showEditorApp = $state(false);
	//let showEditorIntervalTasks = $state(false);
	let selectedIdApp = $state(0);
	let menujson = {
		start: [],
		brand: [{ component: logo }, { component: select_app }, { component: app_enabled_field }],
		end: [
			{ component: new_app },
			{ component: edit_app },
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
	let environment_list = $state([]);
	let showEndpointEdit = $state(false);
	let SelectedRow = $state(defaultValuesRow());
	let TableSelectionType = $state(0);
	let TableObject = $state();
	//let fnVars;
	let active_tab = $state(0);
	//	let showAuthorizations = true;
	let deploying = $state({ show: false, msg: 'Deploying...', error: false });
	//let deployingMsg = 'Deploying...';

	let serverAPIVersion = $state('Loading...');

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
		mcp: { decorator: { component: cellMCPTool }, label: 'MCP Tool' },
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

		cache_size: { hidden: true },
		docs: { hidden: true },

		json_schema: { hidden: true }
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
		}
	]);

	let tabs_main = $state([
		{
			label: 'Endpoints',
			classIcon: 'fa-solid fa-globe',
			alias: 'endpoints',
			isActive: true,
			component: tab_endpoints
		},
		{
			label: 'Interval Tasks',
			classIcon: 'fa-solid fa-clock-rotate-left',
			alias: 'interval_tasks',
			isActive: false,
			component: interva_task_tab
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
		//console.log('confirmSaveApp', app);
		if (confirm('Do you want to save the application data?')) {
			//app.vars = fnVars.getCode();
			if (app_vars) {
				app.vars = app_vars;
			}
			saveApp();
		}
	}

	async function getServerAPIVersion() {
		// Lógica de autenticación aquí

		try {
			let version_req = await uf.GET({ url: url_paths.serverAPIVersion });
			let version_res = await version_req.json();

			if (version_res && version_res.version) {
				serverAPIVersion = version_res.version;
			} else {
				serverAPIVersion = 'Unknown';
			}
		} catch (error) {
			//notify.push({ message: error.message, color: 'danger' });
			//alert(error.message);
			console.error(error);
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

			console.log('environment_list >>>>>> ', environment_list);
		} catch (error) {
			notify.push({ message: error.message, color: 'danger' });
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

				notify.push({ message: 'Cache deleted', color: 'success' });
			} else {
				//alert('You must select at least one record.');

				TableSelectionType = 2;
				notify.push({ message: 'You must select at least one record.', color: 'warning' });
			}
		} catch (error) {
			//alert(error.message);
			notify.push({ message: error.message, color: 'danger' });
		}
	}

	function setpathEdpoint(endpoint_list) {
		return endpoint_list.map((ax) => {
			return {
				//endpoint: `${ax.method == 'WS' ? '/ws/' : '/api/'}${app.app}${ax.resource}/${ax.environment}`,
				endpoint: createEndpoint(ax.method, app.app, ax.resource, ax.environment),
				...ax
			};
		});
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
			notify.push({ message: error.message, color: 'danger' });
		}
	}

	/**
	 * @param {string | any[]} app_resp
	 */
	function showAppData(app_resp) {
		if (app_resp && app_resp.length > 0) {
			active_tab = 0;

			app = defaultValuesApp(app_resp[0]);

			//console.log('>>>>>>>>>>>>>>>>>>', app.vars);

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
			//console.log($userStore);

			if (app.endpoints) {
				//	console.log('Procesar endpoints... ');
				/*
				endpoints = app.endpoints.map(( ax) => {
					return {
						endpoint: `${ax.method == 'WS' ? '/ws/' : '/api/'}${app.app}${ax.resource}/${ax.environment}`,
						...ax
					};
				});
				*/
				//	console.log('Procesardos endpoints... ', endpoints);
				endpoints = setpathEdpoint(app.endpoints);
			}
		}
	}

	async function getApp() {
		cleanApp(); // Esta linea es importante para que no se vayan a guardar variables de una apliacción a otra
		//console.log('getapp', idapp, app);
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
				notify.push({ message: error.message, color: 'danger' });
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

		// console.log('appToStore >>>> ', $state.snapshot(app_save));

		return $state.snapshot(app_save);
	}

	function cleanApp() {
		//idapp = 0;
		try {
			app = { app: '', idapp: null };
			endpoints = [...new Array()];
			app_vars = undefined;

			if (listAppVars) {
				listAppVars.set({});
			} else {
				console.warn('listAppVars is not defined');
			}
		} catch (error) {
			console.warn(error);
		}
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
					notify.push({ message: 'Could not save App!', color: 'danger' });
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
				notify.push({ message: 'Not save app. Error: ' + apps_res.status, color: 'danger' });
			}
		} catch (error) {
			//alert(error.message);
			deploying.msg = 'Not save app. Error: ' + error.message;
			deploying.error = true;
			notify.push({ message: 'Not save app. Error: ' + error.message, color: 'danger' });
		}
	}

	function uploadFile_checkAppname() {
		return !(uploaded_file && uploaded_file.app && uploaded_file.app == app.app);
	}

	onMount(async () => {
		notify.push({ message: 'Welcome ', color: 'success' });

		await getListApps();
		await getEnvList();
		await getServerAPIVersion();
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
	<div class="dropdown is-hoverable">
		<div class="dropdown-trigger">
			<button
				class="button is-small is-success is-outlined"
				aria-haspopup="true"
				aria-controls="dropdown-menu3"
			>
				<span class="icon is-small">
					<i class="fa-solid fa-user"></i>
				</span>
				<span> {$userStore?.user?.username}</span>
				<span class="icon is-small">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</button>
		</div>
		<div class="dropdown-menu" role="menu">
			<div class="dropdown-content">
				<a href="https://github.com/edwinspire/OpenFusionAPI" target="_blank" class="dropdown-item">
					<div class="icon-text">
						<span class="icon">
							<i class="fa-brands fa-github"></i>
						</span>
						<span>Github</span>
					</div>
				</a>
				<hr class="dropdown-divider" />
				
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="dropdown-item"
					onclick={() => {
						location.reload();
					}}
				>
					<div class="icon-text">
						<span class="icon has-text-danger">
							<i class="fa-solid fa-arrow-right-from-bracket"></i>
						</span>
						<span>Logout</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet tab_descrip()}
	<textarea class="textarea is-small" placeholder="Description" bind:value={app.description}
	></textarea>
{/snippet}

{#snippet tab_app_vars()}
	<AppVars
		isReadOnly={false}
		bind:environment_list={environment_list}
		onchange={(data) => {
			//console.log('tab_app_vars', data);
			app_vars = data;
		}}
	></AppVars>
{/snippet}

{#snippet tab_endpoints()}
	<div>
		<Table
			showEditRow="true"
			showNewButton="true"
			showEditButton="true"
			showDeleteButton="true"
			bind:RawDataTable={endpoints}
			bind:columns
			bind:selectionType={TableSelectionType}
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
					//alert('No App selected');
					notify.push({ message: 'Not app selected', color: 'warning' });
				}
			}}
			oneditrow={(data) => {
				SelectedRow = defaultValuesRow(data);
				showEndpointEdit = true;
			}}
		>
			{#snippet lt01()}
				
				<div class="control">
					<div class="tags has-addons">
						<span class="tag is-dark">Server</span>
						<span class="tag is-success">{serverAPIVersion}</span>
					</div>
				</div>
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
		onselect={(e) => {
			if ($userStore) {
				idapp = e.value;
				getApp();
			} else {
				//alert('You do not have authorization');
				notify.push({ message: 'You do not have authorization', color: 'warning' });
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

{#snippet interva_task_tab()}
	<IntervalTasks bind:idapp bind:endpoints></IntervalTasks>
{/snippet}

<MenuMega brand={menujson.brand} start={menujson.start} end={menujson.end}></MenuMega>

{#if $userStore}
	<div>
		<Tab bind:tabs={tabs_main}></Tab>
	</div>
{/if}

{#if app}
	<EndPointEditor
		bind:showEditor={showEndpointEdit}
		row={SelectedRow}
		bind:app
		oncopy={(eps) => {
			console.log(eps);
			endpoints = setpathEdpoint(eps);
		}}
		ondata={(e) => {
			let row_edited = { ...e.row };

			console.log('ENDPOINT RECIVE DATA ', row_edited);

			if (row_edited.idendpoint && row_edited.idendpoint.length > 10) {
				console.log('Es un endpoint existente', row_edited.idendpoint);

				endpoints = endpoints.map((org) => {
					return row_edited.idendpoint == org.idendpoint ? row_edited : org;
				});

				//console.log('ENDPOINTS ACTUALIZADAS :::> ', endpoints);

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
				//console.log('Con nuevo endpoint:::::> ', endpoints);
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
							<i class="fa-solid fa-download"></i>
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

											// TODO: Aquí puedes realizar acciones con los datos JSON, por ejemplo, mostrarlos en la página.

											if (uploadFile_checkAppname()) {
												//	alert('The file does not correspond to the same application.');
												notify.push({
													message: 'The file does not correspond to the same application.',
													color: 'warning'
												});
											}
										} catch (error) {
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
								onclick={() => {
									//alert('Ha hecho click');

									//showAppData([uploaded_file]);

									if (uploadFile_checkAppname()) {
										//alert('The file does not correspond to the same application.');
										notify.push({
											message: 'The file does not correspond to the same application.',
											color: 'warning'
										});
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
											//alert('Please new select file!');
											notify.push({ message: 'Please new select file!', color: 'warning' });
										}
									}
								}}
							>
								<span class="icon is-small">
									<i class="fa-solid fa-upload"></i>
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

<Modal bind:show={deploying.show} bind:showCloseButton={deploying.error}>
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
</Modal>

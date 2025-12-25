<script>
	import { onMount } from 'svelte';
	import { Table, Notifications } from '@edwinspire/svelte-components';
	import { isNewApp } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import {
		userStore,
		statusSystemEndpointsStore,
		storeCountResponseStatusCode
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { endpointColumns } from '$lib/OpenFusionAPI/Application/widgets/endpoints/columns/index.svelte';
	import {
		GetEndpointsByIdapp,
		getListFunction,
		clearCache,
		getServerAPIVersion,
		getAppDocumentation,
		GetAppVars,
		restoreSystemEndpoints,
		getLogSummaryByAppStatusCode
	} from '$lib/OpenFusionAPI/Application/utils/request.js';
	import EndPointEditor from './widgets/editor.svelte';

	let { idapp = $bindable(0), onsavedeploy = () => {} } = $props();

	let notify = new Notifications();
	let EndpointEditorWidget = $state();
	//let deploying = $state({ show: false, message: '', error: false });
	let app = $state({ app: '', enabled: false, description: '' });
	let endpoints = $state([]);
	let showEndpointEdit = $state(false);
	//let SelectedRow = $state(defaultValuesEndpointRow());
	let TableSelectionType = $state(0);
	let serverAPIVersion = $state('Loading...');
	let serverDDBB = $state('?');
	let TableObject = $state();
	let idendpoint_selected = $state();

	$effect(async () => {
		//idapp;
		if (isNewApp(idapp)) {
			app = {};
			console.log('Resetear variables');
		} else {
			console.log('Cargar endpoints para la app', idapp);
			await GetEndpoints();
		}
	});

	// Función para descargar el archivo
	function downloadFileAppDoc(text, file_name, type = 'text/html') {
		// Crear un blob con el contenido
		const blob = new Blob([text], { type: type });
		// Crear una URL para el blob
		const url = URL.createObjectURL(blob);

		// Crear un elemento <a> para iniciar la descarga
		const a = document.createElement('a');
		a.href = url;
		a.download = file_name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Liberar la URL
		URL.revokeObjectURL(url);
	}

	async function clearcacheSelected() {
		// Lógica de autenticación aquí

		let urls_clear = TableObject.GetSelectedRows().map((u) => {
			return `${u.endpoint}|${u.method}`;
		});

		try {
			if (urls_clear && Array.isArray(urls_clear) && urls_clear.length > 0) {
				await clearCache($userStore.token, urls_clear);

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

	/**
	 * Devuelve la fecha y hora actual en formato yyyyMMddHHmmss.
	 * @returns {string} Fecha y hora actual formateada.
	 */
	function getCurrentDateToNameDoc() {
		const ahora = new Date();

		const yyyy = ahora.getFullYear();
		const MM = String(ahora.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
		const dd = String(ahora.getDate()).padStart(2, '0');
		const HH = String(ahora.getHours()).padStart(2, '0');
		const mm = String(ahora.getMinutes()).padStart(2, '0');
		const ss = String(ahora.getSeconds()).padStart(2, '0');

		return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
	}

	async function exportAppDocumentation() {
		// Lógica de autenticación aquí

		let idendpoints = TableObject.GetSelectedRows().map((u) => {
			return u.idendpoint;
		});

		try {
			if (idendpoints && Array.isArray(idendpoints) && idendpoints.length > 0) {
				let doc = await getAppDocumentation($userStore.token, app.idapp, idendpoints);
				console.log(doc);
				downloadFileAppDoc(doc.html, `${app.app}_${getCurrentDateToNameDoc()}.html`);
				//notify.push({ message: 'Cache deleted', color: 'success' });
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

	async function getServerAPIVer() {
		// Lógica de autenticación aquí

		try {
			let version_res = await getServerAPIVersion($userStore.token);

			if (version_res && version_res.version) {
				serverAPIVersion = version_res.version;
				serverDDBB = version_res.ddbb;
			} else {
				serverAPIVersion = 'Unknown';
			}
		} catch (error) {
			//notify.push({ message: error.message, color: 'danger' });
			//alert(error.message);
			console.error(error);
		}
	}

	async function GetEndpoints() {
		try {
			app = await GetEndpointsByIdapp(idapp);
			await getListFunction(app.app);
			await GetAppVars(idapp, true);
			let status_sys_endp = await restoreSystemEndpoints(false);
			statusSystemEndpointsStore.set(status_sys_endp);
			let statusCodeEndpoints = await getLogSummaryByAppStatusCode(idapp);

			if (statusCodeEndpoints && Array.isArray(statusCodeEndpoints)) {
				// Asigna los datos al store con la cantidad de statuscode por cada endpoint
				let dataStatus = {};
				for (let index = 0; index < statusCodeEndpoints.length; index++) {
					const element = statusCodeEndpoints[index];

					if (dataStatus[element.idendpoint] === undefined) {
						dataStatus[element.idendpoint] = {};
					}

					dataStatus[element.idendpoint][element.status_code] = element.recordCount;
				}
				//console.log('statusCodeEndpoints >> ', statusCodeEndpoints	);
				storeCountResponseStatusCode.set(dataStatus);
			}
		} catch (error) {
			console.error(error);
		}
	}

	onMount(async () => {
		await getServerAPIVer();
		//
	});
</script>

<div class="">
	<div>
		<Table
			showEditRow="true"
			showNewButton="true"
			showEditButton="true"
			showDeleteButton="true"
			bind:RawDataTable={app.endpoints}
			columns={endpointColumns}
			bind:selectionType={TableSelectionType}
			bind:this={TableObject}
			left_items={[lt01]}
			right_items={[rt2, rt1]}
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
				if (idapp && idapp.length > 0) {
					//SelectedRow = { app: app, endpoint: defaultValuesEndpointRow() };
					idendpoint_selected = 0;
					showEndpointEdit = true;
					EndpointEditorWidget.setData({ app: app });
				} else {
					//alert('No App selected');
					notify.push({ message: 'Not app selected', color: 'warning' });
				}
			}}
			oneditrow={(data) => {
				//SelectedRow = { app: app, endpoint: defaultValuesEndpointRow(data) };
				idendpoint_selected = data.idendpoint;
				showEndpointEdit = true;
				//console.log('oneditrow', data);
				EndpointEditorWidget.setData({ app: app, idendpoint: data.idendpoint });
			}}
		>
			{#snippet lt01()}
				<div class="control">
					<div class="tags has-addons">
						<span class="tag is-dark">Server API</span>
						<span class="tag is-success">{serverAPIVersion}</span>
					</div>
				</div>
				<div class="control">
					<div class="tags has-addons">
						<span class="tag is-dark">DataBase</span>
						<span class="tag is-link">{serverDDBB}</span>
					</div>
				</div>
			{/snippet}

			{#snippet rt1()}
				<span>
					<button
						class="button is-small"
						onclick={() => {
							clearcacheSelected();
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-eraser"></i>
						</span>
						<span>Cache</span>
					</button>
				</span>
			{/snippet}
			{#snippet rt2()}
				<span>
					<button
						class="button is-small"
						onclick={async () => {
							await exportAppDocumentation();
						}}
					>
						<span class="icon is-small">
							<i class="fa-solid fa-file-export"></i>
						</span>
						<span>Doc</span>
					</button>
				</span>
			{/snippet}
		</Table>
	</div>
</div>

{#if idapp}
	<EndPointEditor
		bind:this={EndpointEditorWidget}
		bind:showEditor={showEndpointEdit}
		oncopy={async (eps) => {
			console.log('EndPointEditor >', eps);
			await GetEndpoints();
		}}
		onsave={async (e) => {
			await GetEndpoints();
		}}
	></EndPointEditor>
{/if}

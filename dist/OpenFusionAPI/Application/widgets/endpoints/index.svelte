<script>
	import { onMount, untrack } from 'svelte';
	import { Table, Notifications, Modal  } from '@edwinspire/svelte-components';
	import { isNewApp } from '../../utils/utils.js';
	import {
		userStore,
		statusSystemEndpointsStore,
		storeCountResponseStatusCode
	} from '../../utils/stores.js';
	import { endpointColumns } from './columns/index.svelte';
	import {
		GetEndpointsByIdapp,
		getListFunction,
		clearCache,
		getServerAPIVersion,
		getAppDocumentation,
		GetAppVars,
		restoreSystemEndpoints,
		getLogSummaryByAppStatusCode,
		getServerAPILastVersion,
		migrateEndpoints
	} from '../../utils/request.js';
	import EndPointEditor from './widgets/editor.svelte';

	let { idapp = $bindable(0), onsavedeploy = () => {} } = $props();

	let notify = new Notifications();
	let EndpointEditorWidget = $state();
	let app = $state({ app: '', enabled: false, description: '' });
	let showMigrateModal = $state(false);
	let migrateTargetEnv = $state('');
	let migrateConfirmCheck = $state(false);
	let selectedEndpointsForMigration = $state([]);
	let showEndpointEdit = $state(false);
	let TableSelectionType = $state(0);
	let serverAPIVersion = $state('Loading...');
	let serverAPILastVersion = $state('');
	let serverDDBB = $state('?');
	let TableObject = $state();
	let idendpoint_selected = $state();
	let loadingEndpoints = $state(false);

	$effect(() => {
		// Leer idapp de forma reactiva, luego ejecutar lógica sin rastrear app
		const currentIdapp = idapp;
		untrack(() => {
			if (isNewApp(currentIdapp)) {
				app = { app: '', enabled: false, description: '', endpoints: [] };
			} else {
				GetEndpoints();
			}
		});
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
		let urls_clear = TableObject.GetSelectedRows().map((u) => {
			return `${u.endpoint}|${u.method}`;
		});

		try {
			if (urls_clear && Array.isArray(urls_clear) && urls_clear.length > 0) {
				await clearCache($userStore.token, urls_clear);

				notify.push({ message: 'Cache deleted', color: 'success' });
			} else {
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
	 * @returns {string}
	 */
	function getCurrentDateToNameDoc() {
		return new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
	}

	async function exportAppDocumentation() {
		let idendpoints = TableObject.GetSelectedRows().map((u) => {
			return u.idendpoint;
		});

		try {
			if (idendpoints && Array.isArray(idendpoints) && idendpoints.length > 0) {
				let doc = await getAppDocumentation($userStore.token, app.idapp, idendpoints);
				downloadFileAppDoc(doc.html, `${app.app}_${getCurrentDateToNameDoc()}.html`);
			} else {
				TableSelectionType = 2;
				notify.push({ message: 'You must select at least one record.', color: 'warning' });
			}
		} catch (error) {
			notify.push({ message: error.message, color: 'danger' });
		}
	}

	function openMigrateModal() {
		let idendpoints = TableObject.GetSelectedRows().map((u) => {
			return u.idendpoint;
		});

		if (idendpoints && Array.isArray(idendpoints) && idendpoints.length > 0) {
			selectedEndpointsForMigration = idendpoints;
			migrateTargetEnv = '';
			migrateConfirmCheck = false;
			showMigrateModal = true;
		} else {
			TableSelectionType = 2;
			notify.push({ message: 'You must select at least one record.', color: 'warning' });
		}
	}

	async function confirmMigration() {
		if (!migrateTargetEnv) {
			notify.push({ message: 'Please select a target environment.', color: 'warning' });
			return;
		}
		if (!migrateConfirmCheck) {
			notify.push({ message: 'Please confirm the migration by checking the box.', color: 'warning' });
			return;
		}

		try {
			let payload = selectedEndpointsForMigration.map((id) => {
				return { idendpoint: id, target_env: migrateTargetEnv };
			});

			let migrate_data = await migrateEndpoints(payload);
			
			if (Array.isArray(migrate_data)) {
				let successCount = migrate_data.filter(item => item.status === 'success').length;
				let ignoredCount = migrate_data.filter(item => item.status === 'ignored').length;
				let errorCount = migrate_data.length - successCount - ignoredCount;

				if (errorCount === 0) {
					if (successCount > 0 && ignoredCount === 0) {
						notify.push({ message: `Successfully migrated ${successCount} endpoints.`, color: 'success' });
					} else if (successCount > 0 && ignoredCount > 0) {
						notify.push({ message: `Successfully migrated ${successCount} endpoints. (${ignoredCount} already existed in target env).`, color: 'success' });
					} else if (successCount === 0 && ignoredCount > 0) {
						notify.push({ message: `All ${ignoredCount} selected endpoints are already in the target environment.`, color: 'info' });
					} else {
						notify.push({ message: 'No endpoints were processed.', color: 'info' });
					}
				} else {
					if (successCount > 0 || ignoredCount > 0) {
						notify.push({ message: `Migrated ${successCount} successfully, ${ignoredCount} ignored, but ${errorCount} failed.`, color: 'warning' });
					} else {
						notify.push({ message: `Failed to migrate ${errorCount} endpoints.`, color: 'danger' });
					}
				}

				if (successCount > 0 || ignoredCount > 0) {
					showMigrateModal = false;
					// Force uncheck the selection type to clear the UI state
					TableSelectionType = 0;
					// Re-enable multiple selection if needed
					setTimeout(() => {
						TableSelectionType = 2;
					}, 100);
				}
			} else {
				notify.push({ message: 'Unexpected response from server.', color: 'danger' });
			}
		} catch (error) {
			notify.push({ message: error.message, color: 'danger' });
		}
	}

	async function getServerAPIVer() {
		try {
			let version_res = await getServerAPIVersion($userStore.token);

			if (version_res && version_res.version) {
				serverAPIVersion = version_res.version;
				serverDDBB = version_res.ddbb;
			} else {
				serverAPIVersion = 'Unknown';
			}
		} catch (error) {
			console.error(error);
		}

		try {
			let last_version_res = await getServerAPILastVersion($userStore.token);
			if (last_version_res) {
				serverAPILastVersion = last_version_res.libOpenFusionAPI?.version || last_version_res.version || '';
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function GetEndpoints() {
		try {
			loadingEndpoints = true;
			// Limpiar datos previos antes de cargar la nueva app
			app = { app: '', enabled: false, description: '', endpoints: [] };

			app = await GetEndpointsByIdapp(idapp);
			await getListFunction(app.app);
			await GetAppVars(idapp, true);
			let status_sys_endp = await restoreSystemEndpoints(false);
			statusSystemEndpointsStore.set(status_sys_endp);
			let statusCodeEndpoints = await getLogSummaryByAppStatusCode(idapp);

			if (statusCodeEndpoints && Array.isArray(statusCodeEndpoints)) {
				let dataStatus = {};
				for (const element of statusCodeEndpoints) {
					if (dataStatus[element.idendpoint] === undefined) {
						dataStatus[element.idendpoint] = {};
					}
					dataStatus[element.idendpoint][element.status_code] = element.recordCount;
				}
				storeCountResponseStatusCode.set(dataStatus);
			}
		} catch (error) {
			console.error(error);
			notify.push({ message: error.message, color: 'danger' });
		} finally {
			loadingEndpoints = false;
		}
	}

	onMount(async () => {
		await getServerAPIVer();
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
			right_items={[rt3, rt2, rt1]}
			ondeleterow={(data) => {
				if (confirm('Do you want to delete the endpoints selected? - NO IMPLEMENTED')) {
					app.endpoints = app.endpoints.filter((item) => {
						return !data.rows.some((element) => element.idendpoint == item.idendpoint);
					});
				}
			}}
			onnewrow={() => {
				if (idapp && idapp.length > 5) {
					idendpoint_selected = 0;
					showEndpointEdit = true;
					EndpointEditorWidget.setData({ app: app });
				} else {
					notify.push({ message: 'Not app selected', color: 'warning' });
				}
			}}
			oneditrow={(data) => {
				idendpoint_selected = data.idendpoint;
				showEndpointEdit = true;
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
				{#if serverAPIVersion !== serverAPILastVersion && serverAPILastVersion !== ''}
					<div class="control">
						<div class="tags has-addons">
							<span class="tag is-dark">
								<span class="icon is-small mr-1 has-text-warning">
									<i class="fa-solid fa-bell fa-shake"></i>
								</span>
								Update
							</span>
							<span class="tag is-warning">{serverAPILastVersion}</span>
						</div>
					</div>
				{/if}
			{/snippet}

			{#snippet rt1()}
				<span >
					<button class="button is-small" onclick={clearcacheSelected} title="Clear Cache">
						<span class="icon is-small">
							<i class="fa-solid fa-eraser"></i>
						</span>
						<span>Cache</span>
					</button>
				</span>
			{/snippet}
			{#snippet rt2()}
				<span>
					<button title="Generate Documentation" class="button is-small" onclick={exportAppDocumentation}>
						<span class="icon is-small">
							<i class="fa-solid fa-file-export"></i>
						</span>
						<span>Doc</span>
					</button>
				</span>
			{/snippet}
			{#snippet rt3()}
				<span>
					<button class="button is-small" onclick={openMigrateModal} title="Migrate selected endpoints to another environment">
						<span class="icon is-small">
							<i class="fa-solid fa-route"></i>
						</span>
						<span>Migrate</span>
					</button>
				</span>
			{/snippet}
		</Table>
		{#if loadingEndpoints}
			<div class="is-flex is-justify-content-center p-4">
				<span class="icon has-text-grey">
					<i class="fa-solid fa-spinner fa-spin fa-2x"></i>
				</span>
			</div>
		{/if}
	</div>
</div>

<Modal bind:show={showMigrateModal} bind:showCloseButton={showMigrateModal}>
	<div class="box">
		<h3 class="title is-4">Migrate Endpoints</h3>
		
		<div class="content">
			<p class="has-text-weight-bold">
				You have selected {selectedEndpointsForMigration.length} endpoint{selectedEndpointsForMigration.length === 1 ? '' : 's'} for migration.
			</p>
			
			<div class="field">
				<label class="label" for="migrate-target-environment">Target Environment</label>
				<div class="control">
					<div class="select is-fullwidth is-small">
						<select id="migrate-target-environment" bind:value={migrateTargetEnv}>
							<option value="" disabled>Select an environment...</option>
							<option value="qa">QA (Quality Assurance)</option>
							<option value="dev">DEV (Development)</option>
							<option value="prd">PRD (Production)</option>
						</select>
					</div>
				</div>
			</div>

			<div class="notification is-warning is-light">
				<span class="icon">
					<i class="fa-solid fa-triangle-exclamation"></i>
				</span>
				<strong>Warning:</strong> This is a risky operation. The existing code in the target environment for the selected endpoints will be completely replaced. Please proceed with caution.
			</div>

			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" bind:checked={migrateConfirmCheck}>
						Are you sure you want to migrate the selected endpoints to the <strong>{migrateTargetEnv ? migrateTargetEnv.toUpperCase() : 'selected'}</strong> environment?
					</label>
				</div>
			</div>
		</div>
		
		<div class="buttons is-right mt-5">
			<button class="button is-small" onclick={() => (showMigrateModal = false)}>Cancel</button>
			<button class="button is-small is-primary" disabled={!migrateConfirmCheck || !migrateTargetEnv} onclick={confirmMigration}>
				<span class="icon">
					<i class="fa-solid fa-check"></i>
				</span>
				<span>Accept</span>
			</button>
		</div>
	</div>
</Modal>

{#if idapp}
	<EndPointEditor
		bind:this={EndpointEditorWidget}
		bind:showEditor={showEndpointEdit}
		oncopy={async (eps) => {
			await GetEndpoints();
			onsavedeploy();
		}}
		onsave={async (e) => {
			await GetEndpoints();
			onsavedeploy();
		}}
	></EndPointEditor>
{/if}

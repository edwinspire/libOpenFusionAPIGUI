<script>
	import { onMount } from 'svelte';
	import {
		Table,
		ColumnTypes,
		SlideFullScreen,
		Level,
		PredictiveInput,
		Input,
		TextArea
	} from '@edwinspire/svelte-components';

	import { url_paths } from '../../utils/paths.js';
	import uFetch from '@edwinspire/universal-fetch';
	import CellMethod from '../endpoints/columns/cellMethod.svelte';
	import {
		userStore,
		statusSystemEndpointsStore
	} from '../../utils/stores.js';
	import { GetAPIKeys, GetAPIClients } from '../../utils/request.js';

	let { idapp = $bindable(), onchange = () => {} } = $props();

	const uF = new uFetch();
	let showEditor = $state(false);
	let selectedRow = $state({
		idclient: '',
		enabled: true,
		startAt: '',
		endAt: '',
		description: '',
		token: '',
		idapp: idapp
	});
	let optionsClients = $state([{ name: 'dsdf', value: 'dsdf' }]);

	let DataTableTasks = $state([]);
	let columns = $state({
		idtask: { hidden: true },
		iduser: { hidden: true },
		idapp: { hidden: true },
		task_enabled: {
			label: 'Enabled Task',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: false
				}
			}
		},
		endpoint_enabled: {
			label: 'Enabled Endpoint',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: false
				}
			}
		},
		method: { label: 'method', decorator: { component: CellMethod } },
		url: { label: 'url' },
		interval: {},
		datestart: {
			label: 'datestart',
			decorator: {
				component: ColumnTypes.DateTime
			}
		},
		dateend: {
			label: 'dateend',
			decorator: {
				component: ColumnTypes.DateTime
			}
		},
		last_run: {
			label: 'last_run',
			decorator: {
				component: ColumnTypes.DateTime
			}
		},
		next_run: {
			label: 'next_run',
			decorator: {
				component: ColumnTypes.DateTime
			}
		},

		params: {},
		exec_time_limit: {},
		failed_attempts: {},
		status: {},
		last_exec_time: {},
		last_response: {},
		app: { hidden: true },
		resource: { hidden: true },
		environment: { hidden: true },
		app_enabled: { hidden: true }
	});

	$effect(async () => {
		idapp;
		await loadAPIKeys();
	});

	async function loadAPIKeys() {
		if (idapp) {
			let jresp = await GetAPIKeys(idapp, $userStore.token);

			if (Array.isArray(jresp)) {
				//console.log(jresp);
				DataTableTasks = jresp;
				//	console.log('DataTableTasks', DataTableTasks);
			} else {
				DataTableTasks = [];
			}

			let clients = await GetAPIClients();
			if (Array.isArray(clients)) {
				//console.log(jresp);
				optionsClients = clients.map((c) => {
					return {
						name: `${c.username} - ${c.first_name} ${c.last_name} - ${c.email} - ${c.document_id}`,
						value: c.idclient
					};
				});
				//	console.log('DataTableTasks', DataTableTasks);
			} else {
				optionsClients = [];
			}
		} else {
			console.log('idapp not found');
		}
	}

	async function saveAPIKey() {
		if (idapp) {
			let row = $state.snapshot(selectedRow);
			console.log('saveAPIKey >>>>>>>>>>>>>', row);
			let resp = await uF.POST({ url: url_paths.APIKeys, data: row });
			let jresp = await resp.json();
			console.log('saveAPIKey >>>>>>>>>>>>>', selectedRow, jresp);
			await loadAPIKeys();
		}
	}

	async function deleteTasks(tasks) {
		let idtasks = tasks.map((t) => {
			return t.idtask;
		});

		console.log('deleteTasks >>>>>>>>>>>>>', idtasks, url_paths.deleteIntervalTasksByIdTask);
		let resp = await uF.DELETE({ url: url_paths.deleteIntervalTasksByIdTask, data: idtasks });
		let jresp = await resp.json();
		//console.log('saveAPIKey >>>>>>>>>>>>>', selectedRow, jresp);
		await loadAPIKeys();
	}

	function fnDefaulValues() {
		selectedRow = {
			idclient: '',
			enabled: true,
			startAt: '',
			endAt: '',
			description: '',
			token: '',
			idapp: idapp
		};
	}

	onMount(() => {
		//
		//selectedRow = fnDefaulValues(defaultApp, selectedRow);
		//loadAPIKeys();
		fnDefaulValues();
	});
</script>

<Table
	bind:RawDataTable={DataTableTasks}
	bind:columns
	showEditRow={true}
	showNewButton={true}
	showDeleteButton={true}
	showEditButton={true}
	oneditrow={(r) => {
		selectedRow.enabled = r.task_enabled;
		selectedRow.startAt = r.datestart || '';
		selectedRow.endAt = r.dateend || '';
		selectedRow.idclient = r.idclient || '';
		selectedRow.token = r.token || '';
		selectedRow.description = r.description || '';
		selectedRow.idapp = idapp;
		showEditor = true;
	}}
	onnewrow={() => {
		fnDefaulValues();
		console.log('TABLE > NEW ', selectedRow);
		showEditor = true;
	}}
	ondeleterow={async (r) => {
		console.log('TABLE > DELETE ', r);
		if (r.rows.length > 0 && confirm('Are you sure you want to delete this task?')) {
			await deleteTasks(r.rows);
		}
	}}
></Table>

{#if idapp && selectedRow}
	<SlideFullScreen bind:show={showEditor}>
		<Level left={[]} right={[r01]}>
			{#snippet r01()}
				<div class="field has-addons">
					<p class="control">
						<button
							class="button is-small is-link"
							onclick={async () => {
								//	confirmSaveApp();
								await saveAPIKey();
								showEditor = false;
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
									//	getApp();
									showEditor = false;
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

		<div>
			<PredictiveInput
				label="API Client"
				classLabel="is-small"
				classInput="is-small"
				bind:options={optionsClients}
				bind:selectedValue={selectedRow.idclient}
				onselect={(e) => {
					console.log(e, selectedRow);
				}}
			/>

			<div class="columns">
				<div class="column is-one-third">
					<Input type="boolean" label="Enabled" bind:value={selectedRow.enabled}></Input>
				</div>
				<div class="column is-one-third">
					<Input type="date" label="Date Start: " bind:value={selectedRow.startAt}
					></Input>
				</div>
				<div class="column is-one-third">
					<Input type="date" label="Date End: " bind:value={selectedRow.endAt}></Input>
				</div>
			</div>
			<div class="columns">
				<div class="column is-full">
					<TextArea label="Description" bind:value={selectedRow.description}></TextArea>
				</div>
			</div>
		</div>
	</SlideFullScreen>
{/if}

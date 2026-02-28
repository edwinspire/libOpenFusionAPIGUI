<script>
	import { onMount } from 'svelte';
	import {
		Table,
		ColumnTypes,
		SlideFullScreen,
		Level,
		PredictiveInput,
		Input,
		TextArea,
		DialogModal,
		BasicSelect,
		Notifications
	} from '@edwinspire/svelte-components';

	import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';
	import uFetch from '@edwinspire/universal-fetch';
	import CellMethod from '$lib/OpenFusionAPI/Application/widgets/endpoints/columns/cellMethod.svelte';
	import {
		userStore,
		statusSystemEndpointsStore
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import {
		GetAPIKeys,
		GetAPIClients,
		saveAPIClient
	} from '$lib/OpenFusionAPI/Application/utils/request.js';

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
	const todayISO = () => new Date().toISOString().split('T')[0];
	const nextMonthISO = () => {
		const d = new Date();
		d.setMonth(d.getMonth() + 1);
		return d.toISOString().split('T')[0];
	};
	let notify = new Notifications();
	let new_user = $state({ startAt: todayISO(), endAt: nextMonthISO() });
	let optionsClients = $state([{ name: 'dsdf', value: 'dsdf' }]);
	let show_dialog_new_user = $state(false);
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
			startAt: todayISO(),
			endAt: nextMonthISO(),
			description: '',
			token: '',
			idapp: idapp
		};
	}

	let new_user_compare_verify = $derived.by(() => {
		return new_user.newPassword == new_user.repeatNewPassword;
	});

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
	left_items={[lt01]}
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
>
	{#snippet lt01()}
		<div class="buttons are-small">
			<button
				class="button is-link is-outlined"
				onclick={() => {
					new_user = { startAt: todayISO(), endAt: nextMonthISO() };
					show_dialog_new_user = true;
				}}
			>
				<span class="icon">
					<i class="fa-solid fa-user"></i>
				</span>
				<span>New User API</span>
			</button>
		</div>
	{/snippet}
</Table>

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
					<Input type="date" label="Date Start: " bind:value={selectedRow.startAt}></Input>
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

<DialogModal
	title={titleModal}
	body={bodyDialogModal}
	onaccept={async () => {
		if (new_user.newPassword == new_user.repeatNewPassword) {
			let result = await saveAPIClient(new_user);
			if (result?.client?.idclient) {
				show_dialog_new_user = false;
				notify.push({ message: 'User API created successfully', color: 'success' });
				await loadAPIKeys();
			} else {
				notify.push({ message: result.error, color: 'danger' });
			}
		} else {
			notify.push({ message: 'You must repeat the new password twice.', color: 'danger' });
		}
	}}
	oncancel={() => {
		new_user = { ...defaultPasswordChange };
	}}
	bind:show={show_dialog_new_user}
>
	{#snippet titleModal()}
		<span>{`New User API`}</span>
	{/snippet}

	{#snippet bodyDialogModal()}
		<Input label="Username" type="text" bind:value={new_user.username}></Input>
		<Input label="First Name" type="text" bind:value={new_user.first_name}></Input>
		<Input label="Last Name" type="text" bind:value={new_user.last_name}></Input>

		<Input label="Email" type="email" bind:value={new_user.email}></Input>
		<BasicSelect
			label="Document Type"
			bind:value={new_user.document_type}
			options={[
				{ name: 'Passport', value: 'passport' },
				{ name: 'National ID', value: 'id_card' },
				{ name: 'Driver License', value: 'driver_license' },
				{ name: 'Social Security', value: 'social_security' },
				{ name: 'Tax ID', value: 'tax_id' },
				{ name: 'Other', value: 'other' }
			]}
		></BasicSelect>
		<Input label="Document ID" type="text" bind:value={new_user.document_id}></Input>
		<Input label="Phone" type="text" bind:value={new_user.phone}></Input>
		<Input label="StartAt	" type="date" bind:value={new_user.startAt}></Input>
		<Input label="EndAt" type="date" bind:value={new_user.endAt}></Input>
		<Input label="Password" type="password" bind:value={new_user.password}></Input>
		<Input label="Repeat Password" type="password" bind:value={new_user.repeatPassword}></Input>
		<div>
			{#if !new_user_compare_verify}
				<span class="icon-text has-text-warning is-small">
					<span class="icon">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span>You must repeat the new password twice.</span>
				</span>
			{/if}
		</div>
	{/snippet}
</DialogModal>

<script>
	import { onMount } from 'svelte';
	import {
		Table,
		ColumnTypes,
		SlideFullScreen,
		Level,
		PredictiveInput,
		Input
	} from '@edwinspire/svelte-components';
	import { defaultValuesApp, url_paths } from '$lib/OpenFusionAPI/utils.js';
	import uFetch from '@edwinspire/universal-fetch';
	import CellMethod from '$lib/OpenFusionAPI/app/cellMethod.svelte';
	//	import MethodSelect from '$lib/OpenFusionAPI/app/widgets/methods_select.svelte';

	let { idapp = $bindable(), onchange = () => {}, endpoints = $bindable([]) } = $props();

	const uF = new uFetch();
	let showEditor = $state(false);
	let selectedRow = $state({ idendpoint: '?' });
	let optionsEndpoints = $state([]);

	let DataTableTasks = $state([]);
	let columns = $state({
		idtask: { hidden: true },
		idendpoint: { hidden: true },
		iduser: { hidden: true },
		idapp: { hidden: true },
		enabled: {
			label: 'Enabled',
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
		last_response: {}
	});

	$effect(() => {
		idapp;
		defaultValuesApp();
		loadTasks();
	});

	$effect(() => {
		endpoints;
		if (endpoints && endpoints.length > 0) {
			optionsEndpoints = endpoints.map((e) => {
				return { name: `[${e.method}] ${e.endpoint}`, value: e.idendpoint };
			});
		}
	});

	async function loadTasks() {
		if (idapp) {
			let resp = await uF.GET({ url: url_paths.getListIntervalTasksByIdApp, data: { idapp } });
			let jresp = await resp.json();
			//	console.log('++++>>>>>>>>>>>>>', jresp);

			/**
 * 
 [
    {
        "idapp": "08a964fe-e605-405d-a2e1-db2cead9fbf7",
        "app": "facturacion_electronica",
        "enabled": true,
        "tasks": [
            {
                "params": {},
                "last_response": {
                    "funcionando": true
                },
                "idtask": "3",
                "timestamp": "1900-01-01T00:00:00.000Z",
                "iduser": null,
                "idapp": "08a964fe-e605-405d-a2e1-db2cead9fbf7",
                "enabled": true,
                "interval": "300",
                "datestart": "2021-01-01T00:00:00.000Z",
                "dateend": "2034-01-01T00:00:00.000Z",
                "next_run": "2025-03-26T13:54:47.104Z",
                "last_run": "2025-03-26T13:49:47.104Z",
                "url": "/api/facturacion_electronica/validacion/servicio/sri/prd",
                "method": "GET",
                "exec_time_limit": "30",
                "failed_attempts": 0,
                "status": 2,
                "last_exec_time": "4350"
            }
        ]
    }
]
 * */

			if (Array.isArray(jresp) && jresp[0] && jresp[0].tasks) {
				//console.log(jresp);
				DataTableTasks = jresp[0].tasks.map((t) => {
					t.method = jresp[0].method;
					t.url = jresp[0].url;
					return t;
				});
				//	console.log('DataTableTasks', DataTableTasks);
			} else {
				DataTableTasks = [];
			}
		} else {
			console.log('idapp not found');
		}
	}

	async function saveInterval() {
		if (idapp) {
			let resp = await uF.POST({ url: url_paths.upsertIntervalTasksByIdTask, data: selectedRow });
			let jresp = await resp.json();
			//console.log('saveInterval >>>>>>>>>>>>>', selectedRow, jresp);
			await loadTasks();
		}
	}

	function fnDefaulValues() {
		if (selectedRow) {
			selectedRow = { idendpoint: '-' };
		}
	}

	onMount(() => {
		//
		fnDefaulValues();
		loadTasks();
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
		//console.log('TABLE > ', r);
		selectedRow = r;
		showEditor = true;
	}}
	onnewrow={() => {
		selectedRow = { idendpoint: '-' };
		//console.log('TABLE > NEW ', selectedRow);
		showEditor = true;
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
								await saveInterval();
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
				label="Url"
				classLabel="is-small"
				classInput="is-small"
				bind:options={optionsEndpoints}
				bind:selectedValue={selectedRow.idendpoint}
				onselect={(e) => {
					console.log(e);
				}}
			/>

			<div class="columns">
				<div class="column is-one-third">
					<Input type="number" label="Exec time limit: " bind:value={selectedRow.exec_time_limit}
					></Input>
				</div>
				<div class="column is-one-third">
					<Input type="number" label="Fail attemps: " bind:value={selectedRow.failed_attempts}
					></Input>
				</div>
				<div class="column is-one-third">
					<Input type="number" label="Status: " bind:value={selectedRow.status}></Input>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third">
					<Input type="datetime-local" label="Date End: " bind:value={selectedRow.dateend}></Input>
				</div>
				<div class="column is-one-third">
					<Input type="datetime-local" label="Last run: " bind:value={selectedRow.last_run}></Input>
				</div>
				<div class="column is-one-third">
					<Input type="datetime-local" label="Next run: " bind:value={selectedRow.next_run}></Input>
				</div>
			</div>
			<div class="columns">
				<div class="column is-one-third">
					<Input type="boolean" label="Enabled" bind:value={selectedRow.enabled}></Input>
				</div>
				<div class="column is-one-third">
					<Input type="number" label="Interval: " bind:value={selectedRow.interval}></Input>
				</div>
				<div class="column is-one-third">
					<Input type="datetime-local" label="Date Start: " bind:value={selectedRow.datestart}
					></Input>
				</div>
			</div>
		</div>
	</SlideFullScreen>
{/if}

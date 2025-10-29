<script>
	import { onMount } from 'svelte';
	import { Chart } from '@edwinspire/svelte-components';
	import {
		storeEndpointOnComplete,
		getLogsRecordsPerMinute,
		storeServerDynamicInformation
	} from '$lib/OpenFusionAPI/utils.js';
	let { idapp = $bindable() } = $props();
	let data_request = $state([]);
	/*
	let title = $derived.by(() => {
		return 'Last Requests: ' + (data_request ? data_request.length : '0');
	});
*/
	let data_logs_per_minute = $state([]);
	let data_cpu = $state([]);
	let data_memory = $state([]);
	let cpuUsage = $state();
	let memoryUsage = $state();

	$effect(() => {
		idapp;
		onChangeIdApp();
	});

	function formatDataCPUUsage(data) {
		let now = new Date();
		cpuUsage = data.cpuUsage;
		return {
			name: now.toISOString(),
			value: [now, cpuUsage],
			other: 'Nada'
		};
	}

	function formatDataMemoryUsage(data) {
		let now = new Date();
		memoryUsage = data.memoryUsage;
		return {
			name: now.toISOString(),
			value: [now, memoryUsage],
			other: 'Nada'
		};
	}

	function formatData(data_endpoint) {
		if (idapp && data_endpoint?.idapp == idapp) {
			let now = new Date(data_endpoint.dateTime || Date.now());
			return {
				name: now.toISOString(),
				value: [now, data_endpoint?.responseTime],
				other: 'Nada'
			};
		}
	}

	async function onChangeIdApp() {
		//console.log('Busca por el idapp ' + idapp);
		if (idapp) {
			let data_log_pm = await getLogsRecordsPerMinute({ idapp: idapp, last_hours: 12 });
			data_logs_per_minute = data_log_pm.map((dl) => {
				let now = new Date(dl.minute || Date.now());
				return {
					name: now.toISOString(),
					value: [now, parseInt(dl?.count)],
					other: 'Nada'
				};
			});
		} else {
			data_logs_per_minute = [];
		}
	}

	onMount(() => {
		storeServerDynamicInformation.subscribe((event) => {
			//	console.log(event);
			data_cpu.push(formatDataCPUUsage(event));
			data_cpu = [...data_cpu];
			data_memory.push(formatDataMemoryUsage(event));
			data_memory = [...data_memory];
		});

		storeEndpointOnComplete.subscribe((event) => {
			//	console.log(':::::> ', idapp, event);
			if (idapp) {
				if (Array.isArray(event)) {
					data_request = event.map((log) => {
						return formatData(log);
					});
				} else if (data_request) {
					if (event?.idapp == idapp) {
						//	console.log('Llega -------->');
						data_request.push(formatData(event));
						data_request = [...data_request];
					}
				}
			}
		});
	});
</script>

<div class="columns is-multiline is-mobile">
	<div class="column is-half-desktop is-full-tablet">
		<Chart.TimeSeries title="CPU Usage {cpuUsage}%" bind:data={data_cpu}></Chart.TimeSeries>
	</div>
	<div class="column is-half-desktop is-full-tablet">
		<Chart.TimeSeries title="Memory Usage {memoryUsage}%" bind:data={data_memory}></Chart.TimeSeries>
	</div>
	<div class="column is-half-desktop is-full-tablet">
		{#if data_request}
			<Chart.TimeSeries title="Requests" bind:data={data_request}></Chart.TimeSeries>
		{/if}
	</div>
	<div class="column is-half-desktop is-full-tablet">
		<Chart.TimeSeries title="Request per minute" bind:data={data_logs_per_minute}
		></Chart.TimeSeries>
	</div>
</div>

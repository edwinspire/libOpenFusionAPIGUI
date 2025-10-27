<script>
	import { onMount } from 'svelte';
	import { Chart } from '@edwinspire/svelte-components';
	import { storeEndpointOnComplete, getLogsRecordsPerMinute } from '$lib/OpenFusionAPI/utils.js';
	let { idapp = $bindable() } = $props();
	let data_request = $state([]);
	let title = $derived.by(() => {
		return 'Last Request: ' + data_request.length;
	});

	let data_logs_per_minute = $state([]);

	$effect(() => {
		idapp;
		onChangeIdApp();
	});

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
		console.log('Busca por el idapp ' + idapp);
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
		storeEndpointOnComplete.subscribe((event) => {
			//console.log(':::::> ', event);
			if (idapp) {
				if (Array.isArray(event)) {
					data_request = event.map((log) => {
						return formatData(log);
					});
				} else {
					if (event?.idapp == idapp) {
						data_request.push(formatData(event));
						data_request = [...data_request];
					}
				}
			}
		});
	});
</script>

<div class="columns">
	<div class="column">
		<Chart.TimeSeries bind:title bind:data={data_request}></Chart.TimeSeries>
	</div>
	<div class="column">
		<Chart.TimeSeries title="Request per minute" bind:data={data_logs_per_minute}
		></Chart.TimeSeries>
	</div>
</div>

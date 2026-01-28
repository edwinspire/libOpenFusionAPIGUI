<script>
	import { onMount } from 'svelte';
	import { Table } from '@edwinspire/svelte-components';
	import { url_paths } from '../../../utils/paths.js';
	import uFetch from '@edwinspire/universal-fetch';

	let uF = new uFetch(url_paths.getEndpointBackups);

	let {
		idendpoint = $bindable(),

		onselect = (d) => {}
	} = $props();

	let dataBackups = $state([]);
	let selectionType = $state(1);
	let columns = $state({
		hash: { hidden: true },
		idendpoint: { hidden: true }
	});

	let data_backup = $state();
	let class_search = $derived.by(() => {
		return data_backup && data_backup?.data?.idendpoint == idendpoint ? 'is-link' : '';
	});

	async function fetchData() {
		if (idendpoint) {
			selectionType = 1;
			try {
				let req = await uF.GET({ data: { idendpoint } });
				dataBackups = await req.json();
				console.log('Fetched Backups:', dataBackups);
			} catch (error) {
				console.error('Error fetching logs:', error);
				//dataBackups = [];
			}
		} else {
			dataBackups = [];
		}
	}

	onMount(() => {
		//		defaultValue();
		fetchData();
	});
</script>

<Table
	{columns}
	bind:RawDataTable={dataBackups}
	left_items={[restoreBackup]}
	bind:selectionType
	onsearch={fetchData}
	onselectrows={(selected) => {
		//console.log('Selected backups', selected);
		if (selected.rows && selected.rows.length == 1) {
			data_backup = selected.rows[0];
		} else {
			data_backup = null;
		}
	}}
>
	{#snippet restoreBackup()}
		<button
			class="button is-small {class_search}"
			onclick={() => {
				if (onselect && data_backup && data_backup?.data?.idendpoint == idendpoint && confirm('Are you sure to restore this backup?')) {
					onselect(data_backup.data);
				}
			}}
		>
			<span>Restore Backup {data_backup?.idbackup || ''}</span>
			<span class="icon">
				<i class="fa-regular fa-circle-up"></i>
			</span>
		</button>
	{/snippet}
</Table>

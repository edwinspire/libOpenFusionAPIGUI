<script>
	import { onMount } from 'svelte';
	import { Table, ColumnTypes } from '@edwinspire/svelte-components';

	export let parameters = [];
	let columns = {
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.BooleanIcon,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: true
				}
			}
		},
		key: { label: 'Key', decorator: { component: ColumnTypes.Auto, props: { editInline: true } } },
		value: {
			label: 'Value',
			decorator: { component: ColumnTypes.Auto, props: { editInline: true } }
		}
	};

	function addRowEmpty() {
		if (!parameters || !Array.isArray(parameters)) {
			parameters = [];
			parameters.push({ enabled: false, key: '', value: '' });
			// alert('add000')
		} else if (
			parameters &&
			Array.isArray(parameters) &&
			!parameters.find((p) => {
				return p.key == '';
			})
		) {
			parameters.push({ enabled: true, key: '', value: '' });
			//   alert('add111  ' + parameters.length)
		}
	}

	onMount(() => {
		addRowEmpty();
	});
</script>

<Table
	bind:RawDataTable={parameters}
	{columns}
	ShowNewButton={true}
	ShowDeleteButton={true}
	on:deleterow={(e) => {
//		console.log(e.detail.rows, parameters);

		if (e.detail.rows && e.detail.rows.length > 0) {
			parameters = parameters.filter((item) => {
				return e.detail.rows.find((r) => {
					return r.key != item.key;
				});
			});
		}
	}}
	on:newrow={() => {
		parameters.push({ enabled: true, key: '', value: '' });
	}}
></Table>

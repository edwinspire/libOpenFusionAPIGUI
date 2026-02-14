<script>
	import { Tab, JSONView, Input } from '@edwinspire/svelte-components';
	import { TimeOutChangeValue } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/params_json_selector.svelte';

	let { endpoint = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let cnx_custom = $state({});
	let cnx_appvar = $state('');

	let tabList = $state([
		{
			label: 'Parameters',
			isActive: true,
			classIcon: ' fa-solid fa-database ',
			component: tab_tablename
		},
		{ label: 'Connection Parameters', component: tab_cnx_params }
	]);

	let data_example = $state({
		data: [
			{ field01: 1, field02: 'demo', field03: new Date() },
			{ field01: 2, field02: 'test', field03: new Date() },
			{ field01: 5, field02: 'app', field03: new Date() },
			{ field01: 12, field02: 'red', field03: new Date() },
			{ field01: 20, field02: 'dog', field03: new Date() },
			{ field01: 3, field02: 'edwinspire', field03: new Date() }
		]
	});

	let table_name = $state('');
	let timeoutChange;

	$effect(() => {
		endpoint?.code;
		endpoint?.custom_data;
		timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
	});

	function parseCode() {
		table_name = endpoint.code ?? '';
		cnx_custom = endpoint.custom_data;
		cnx_appvar = endpoint.custom_data;
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = {
			code: table_name,
			custom_data:
				cnx_appvar && typeof cnx_appvar === 'string' && cnx_appvar.trim().length > 0
					? cnx_appvar
					: cnx_custom,
			ignoreDuplicates: endpoint.custom_data?.ignoreDuplicates ?? false,
			data_test: $state.snapshot(endpoint.data_test)
		};
		return data;
	}
</script>

{#snippet tab_tablename()}
	<Input
		label="Table Name"
		type="text"
		bind:value={table_name}
		placeholder="Table Name"
		onchange={() => {
			fnOnChange();
		}}
	></Input>

	<div class="content is-small">
		<h4>Bulk INSERT</h4>
		<div>Performs a bulk insert into a SQL database table.</div>
		<div>
			The necessary parameters are the "table name" and an array with the data.<br />
			The data you send must contain a JSON where the key must contain the exact name of the database
			field.
			<br />

			<details>
				<summary>For example, the following JSON represents a list of rows to be inserted:</summary>
				<JSONView bind:jsonObject={data_example}></JSONView>
			</details>
		</div>

		<div>
			<span class="icon-text">
				<span class="icon has-text-warning">
					<i class="fas fa-exclamation-triangle fa-fade"></i>
				</span>
				<span class="label is-small"
					>Depending on the database engine you may have a <strong> lock </strong> on the table during
					the bulk insert process.</span
				>
			</span>
		</div>
	</div>
{/snippet}

{#snippet tab_cnx_params()}
	<div>
		<div class="content is-small">
			Configuration parameters used by sequelize, visit <a href="https://sequelize.org/"
				>https://sequelize.org/</a
			>
			for more information.
		</div>
		<div>
			<span class="icon-text">
				<span class="icon has-text-warning">
					<i class="fas fa-exclamation-triangle fa-fade"></i>
				</span>
				<span class="label is-small"
					>ignoreDuplicates parameter only: MySQL, MariaDB, SQLite >= 3.24.0 & Postgres >= 9.5</span
				>
			</span>
		</div>
	</div>

	<AppVarsSelector
		bind:custom={cnx_custom}
		bind:appvar={cnx_appvar}
		bind:environment={endpoint.environment}
		onselect={(selected) => {
			fnOnChange();
		}}
	></AppVarsSelector>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

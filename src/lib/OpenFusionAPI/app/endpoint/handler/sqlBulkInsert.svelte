<script>
	import { onMount } from 'svelte';
	import { Tab, RESTTester, JSONView, Input } from '@edwinspire/svelte-components';
	import AppVars from '$lib/OpenFusionAPI/app/app_vars.svelte';
	import AppVarsSelector from '$lib/OpenFusionAPI/app/endpoint/widgets/params_json_selector.svelte';

	let { row = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let cnx_param_json = $state({});
	let cnx_param_var = $state('');

	let tabList = $state([
		{
			label: 'Parameters',
			isActive: true,
			classIcon: ' fa-solid fa-database ',
			component: tab_tablename
		},
		{ label: 'Connection Parameters', component: tab_cnx_params },
		{ label: 'App Variables', component: tab_appvars },
		{ label: 'Tester', component: tab_tester }
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
	let ignoreDuplicates = $state(false);

	$effect(() => {
		if (row?.code) {
			timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
		}
	});

	function parseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

			if (params && params.table_name) {
				table_name = params.table_name;
			}

			if (params && params.ignoreDuplicates) {
				ignoreDuplicates = params.ignoreDuplicates;
			}

			if (params && params.config) {
				cnx_param_var = params.config;
			}
		} catch (error) {
			cnx_param_json = {};
			cnx_param_var = '';
			table_name = '';
			ignoreDuplicates = false;
			console.error('Error', error);
		}
	}

	function getData() {
		return { code: $state.snapshot(getCode()), data_test: $state.snapshot(row.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getCode() {
		let conf = {};
		let outcode = {};

		conf = cnx_param_var;

		try {
			outcode.config = conf;
			outcode.table_name = table_name;
			outcode.ignoreDuplicates = ignoreDuplicates;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.warn(error);
			return outcode;
		}
	}

	onMount(() => {
		parseCode();
	});
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

	<Input
		label="ignoreDuplicates"
		type="boolean"
		bind:value={ignoreDuplicates}
		placeholder="ignoreDuplicates"
		onchange={() => {
			fnOnChange();
		}}
	></Input>

	<div class="content is-small">
		<strong>ignoreDuplicates only:</strong>
		{'MySQL, MariaDB, SQLite >= 3.24.0 & Postgres >= 9.5'}
	</div>

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
	</div>

	<AppVarsSelector
		bind:value={cnx_param_var}
		bind:environment={row.environment}
		onselect={(selected) => {
			fnOnChange();
		}}
	></AppVarsSelector>
{/snippet}

{#snippet tab_appvars()}
	<AppVars environment={row.environment} isReadOnly={true}></AppVars>
{/snippet}

{#snippet tab_tester()}
	<div>
		<RESTTester
			bind:data={row.data_test}
			method={row.method}
			url={row.endpoint}
			methodDisabled={true}
			onchange={(c) => {
				fnOnChange();
			}}
		></RESTTester>
	</div>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

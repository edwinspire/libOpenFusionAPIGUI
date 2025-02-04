<script>
	import { onMount } from 'svelte';
	import {
		Tab,
		EditorCode,
		RESTTester,
		JSONView,
		PredictiveInput
	} from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import { listAppVars } from '../../../utils.js';

	let { row = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let use_var_cnx = $state(false);
	let cnx_param_json = $state({});
	let cnx_param_var = $state('');

	let tabList = $state([
		{
			label: 'Table Name',
			isActive: true,
			classIcon: ' fa-solid fa-database ',
			component: tab_tablename
		},
		{ label: 'Connection Parameters', component: tab_cnx_params },
		{ label: 'App Variables', component: tab_appvars },
		{ label: 'Tester', component: tab_tester }
	]);

	let options_app_vars = $state([]);

	listAppVars.subscribe((value) => {
		options_app_vars = Object.keys(value[row.environment]).map((item) => {
			return { name: item, value: item };
		});
	});

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

	$inspect(row.code).with((type) => {
		if (type === 'update' || type === 'init') {
			parseCode();
		}
	});

	function parseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

			if (params && params.table_name) {
				table_name = params.table_name;
			}

			if (params && params.config) {
				if (typeof params.config === 'object') {
					cnx_param_json = params.config;
					use_var_cnx = false;
				} else {
					cnx_param_var = params.config;
					use_var_cnx = true;
				}
			}
		} catch (error) {
			cnx_param_json = {};
			cnx_param_var = '';
			table_name = '';
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

		try {
			if (use_var_cnx) {
				conf = cnx_param_var;
			} else {
				conf = JSON.parse(cnx_param_json);
			}

			//return JSON.stringify(c, null, 2);
		} catch (error) {
			console.warn('No se pudo parsear getCode SQL', error, cnx_param_var, cnx_param_json);
			conf = '';
			//return code;
		}

		try {
			outcode.config = conf;
			outcode.table_name = table_name;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.warn(error);
			return code;
		}
	}

	onMount(() => {
		parseCode();
	});
</script>

{#snippet tab_tablename()}
	<div>
		<br />
		<div class="control">
			<input
				class="input is-small"
				type="text"
				placeholder="Table name"
				bind:value={table_name}
				onchange={() => {
					fnOnChange();
				}}
			/>
		</div>
		<br />
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
			<br />
			You can also use the name of an application variable to use it, for example
			<strong>$_VAR_NAME</strong>.
		</div>
	</div>

	<div class="box">
		<div class="buttons has-addons">
			<button
				class="button is-small {use_var_cnx ? '' : 'is-active is-primary'}"
				onclick={() => {
					use_var_cnx = false;
				}}>JSON Parameters</button
			>
			<button
				class="button is-small {use_var_cnx ? 'is-active is-primary' : ''}"
				onclick={() => {
					use_var_cnx = true;
				}}>Use Variable</button
			>
		</div>

		{#if !use_var_cnx}
			<EditorCode
				isReadOnly={false}
				lang="json"
				bind:code={cnx_param_json}
				onchange={(c) => {
					fnOnChange();
				}}
			></EditorCode>
		{:else}
			<div class="content is-small">Select an application variable.</div>

			<PredictiveInput
				placeholder="$_VAR_NAME"
				options={options_app_vars}
				bind:selectedValue={cnx_param_var}
				onselect={(selected) => {
					fnOnChange();
				}}
			></PredictiveInput>
		{/if}
	</div>
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

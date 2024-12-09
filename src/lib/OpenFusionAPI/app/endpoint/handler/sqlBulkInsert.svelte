<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import {
		Tab,
		EditorCode,
		RESTTester,
		JSONView,
		BasicSelect
	} from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import WarnPrd from './warning_production.svelte';
	import Endpoint from './endpoint.svelte';
	//import ParamsVarJSON from '../widgets/parameters_var_json.svelte';

	/**
	 * @type {any}
	 */
	//let code;
	export let row = { endpoint: '', method: '', environment: '' };

	let fnApiTester;
	let use_var_cnx = false;
	let cnx_param_json = {};
	let cnx_param_var = '';

	let tabList = [
		{ label: 'Table Name', isActive: true, classIcon: ' fa-solid fa-database ' },
		{ label: 'Connection Parameters' },
		{ label: 'App Variables' },
		{ label: 'Tester' }
	];

	let data_example = {
		data: [
			{ field01: 1, field02: 'demo', field03: new Date() },
			{ field01: 2, field02: 'test', field03: new Date() },
			{ field01: 5, field02: 'app', field03: new Date() },
			{ field01: 12, field02: 'red', field03: new Date() },
			{ field01: 20, field02: 'dog', field03: new Date() },
			{ field01: 3, field02: 'edwinspire', field03: new Date() }
		]
	};

	let table_name = '';
	let internal_data_test;

	$: row.code, ParseCode();
	$: row.data_test, setDataTest();

	function setDataTest() {
		internal_data_test = { ...row.data_test };
		//console.log('internal_data_test', internal_data_test);
	}

	export function reset() {
		ParseCode();
	}

	function ParseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

			if (params && params.table_name) {
				table_name = params.table_name;
			}

			if (params && params.config) {
				//console.log('>>> ParseCode >> ', typeof params.config, params.config);

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

	export function getData() {
		let data = { code: getCode(), data_test: internal_data_test };
		//	console.log('> getData > SQL', data);
		return data;
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
		//	console.log(code);
		ParseCode();
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<div>
			<div class="control">
				<input
					class="input is-small"
					type="text"
					placeholder="Table name"
					bind:value={table_name}
				/>
			</div>
		</div>
		<WarnPrd bind:environment={row.environment}></WarnPrd>
		<br />

		<div class="content is-small">
			<h4>Bulk INSET</h4>
			<div>Performs a bulk insert into a SQL database table.</div>
			<div>
				The necessary parameters are the "table name" and an array with the data.<br />
				The data you send must contain a JSON where the key must contain the exact name of the database
				field.
				<br />

				For example, the following JSON represents a list of rows to be inserted:<br />
				<JSONView bind:jsonObject={data_example}></JSONView>
			</div>

			<div>
				<span class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle fa-fade"></i>
					</span>
					<span class="label is-small"
						>Depending on the database engine you may have a <strong> lock </strong> on the table during the bulk insert process.</span
					>
				</span>
			</div>

		</div>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
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
					on:click={() => {
						use_var_cnx = false;
					}}>JSON Parameters</button
				>
				<button
					class="button is-small {use_var_cnx ? 'is-active is-primary' : ''}"
					on:click={() => {
						use_var_cnx = true;
					}}>Use Variable</button
				>
			</div>

			{#if !use_var_cnx}
				<EditorCode isReadOnly={false} lang="json" bind:code={cnx_param_json}></EditorCode>
			{:else}
				<div class="control has-icons-left">
					<input
						class="input is-small"
						type="text"
						placeholder="$_VAR_NAME"
						bind:value={cnx_param_var}
					/>
					<span class="icon is-small is-left">
						<i class="fa-regular fa-keyboard"></i>
					</span>
				</div>
			{/if}
		</div>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<AppVars environment={row.environment} isReadOnly={true}></AppVars>
	</div>

	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<WarnPrd bind:environment={row.environment}></WarnPrd>

		<RESTTester
			bind:this={fnApiTester}
			bind:data={internal_data_test}
			bind:method={row.method}
			url={row.endpoint}
			methodDisabled={true}
		></RESTTester>
	</div>
</Tab>

<script>
	import { onMount, onDestroy } from 'svelte';
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

	/**
 SELECT = 'SELECT',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  BULKUPDATE = 'BULKUPDATE',
  DELETE = 'DELETE',
  UPSERT = 'UPSERT',
  SHOWINDEXES = 'SHOWINDEXES',
  DESCRIBE = 'DESCRIBE',
  RAW = 'RAW',
  SHOWCONSTRAINTS = 'SHOWCONSTRAINTS',
  */

	let options_app_vars = $state([]);

	listAppVars.subscribe((value) => {
		let keys_list = value[row.environment];

		console.log(value, row.environment, keys_list);

		if (keys_list) {
			options_app_vars = Object.keys(keys_list).map((item) => {
				return { name: item, value: item };
			});
		}
	});

	let sample_bind_post = $state({
		bind: {
			your_param_01: '0002081614',
			your_param_02: 123,
			your_param_03: 'ABC'
		}
	});

	let sample_replace_post = $state({
		replacements: {
			your_param_01: ['0002081614', '986535OKE']
		}
	});

	let tabList = $state([
		{ label: 'Query', isActive: true, classIcon: ' fa-solid fa-database ', component: tab_query },
		{ label: 'Pass Parameters', component: tab_pass_params },
		{ label: 'Connection Parameters', component: tab_cnx_params },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
	]);

	let query_code = $state('SELECT 1+1;');

	let timeoutChange;

	$effect(() => {
		if (row?.code) {
			clearTimeout(timeoutChange);
			timeoutChange = setTimeout(() => {
				parseCode();
			}, 750);
		}
	});

	function parseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

			if (params && params.query) {
				query_code = params.query;
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
			query_code = 'SELECT 1;';
			console.error('Error', error);
		}
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = { code: getCode(), data_test: $state.snapshot(row.data_test) };

		return data;
	}

	function getCode() {
		let conf = {};
		let outcode = {};

		try {
			if (use_var_cnx) {
				conf = cnx_param_var;
			} else {
				conf = typeof cnx_param_json === 'object' ? cnx_param_json : JSON.parse(cnx_param_json);
			}

			//return JSON.stringify(c, null, 2);
		} catch (error) {
			console.warn('No se pudo parsear getCode SQL', error, cnx_param_var, cnx_param_json);
			conf = '';
			//return code;
		}

		try {
			outcode.config = conf;
			outcode.query = query_code;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.warn(error);
			return code;
		}
	}

	onMount(() => {
		parseCode();
		//	sample_bind_post_string = JSON.stringify(sample_bind_post);
	});
	onDestroy(() => {
		clearTimeout(timeoutChange);
	});
</script>

{#snippet tab_query()}
	<div>
		<div>
			<div class="content is-small">
				The parameters must have a name like <span style="font-style: oblique; font-weight: bold;"
					>$nameparameter</span
				>
				to bind, or <span style="font-style: oblique; font-weight: bold;">:nameparameter</span> to
				replacements. The values ​​you send in the request. For more information you can consult the
				<a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/#bind-parameter"
					>sequelize</a
				>
				documentation.
			</div>
		</div>
	</div>

	<EditorCode
		isReadOnly={false}
		title={'Query to be executed'}
		lang="sql"
		showFormat={true}
		bind:code={query_code}
		onchange={(c) => {
			fnOnChange();
		}}
	></EditorCode>
{/snippet}

{#snippet tab_pass_params()}
	<div class="content is-small">
		<p>
			In sequelize you can pass parameters using <strong>"bind"</strong> or
			<strong>"replacements"</strong>
			depending on the case. You can refer to
			<a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/#bind-parameter"
				>Sequelize Parameters</a
			> for more details.
		</p>

		{#if row.method === 'GET'}
			<div class="block">
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span>GET Method - Warning</span>
				</div>

				<p class="block">
					The GET method is recommended only for simple requests where there is no input parameters,
					or failing that the parameters are key-value on query request, which will be used to join
					with the variables of the SQL query.
				</p>

				<div class="block">
					If you send a parameter that is not present in the query you will get an error similar to: <code
						>Column index out of range</code
					>
				</div>
			</div>
		{:else if row.method === 'POST'}
			<div class="block">
				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-circle-exclamation"></i>
					</span>
					<span
						>When you use the POST method, the input parameters must be sent in the BODY in JSON
						format, using the following example:</span
					>
				</div>
				<br />

				<JSONView bind:jsonObject={sample_bind_post} />

				<br />

				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-circle-exclamation"></i>
					</span>
					<span>You can also use "replacements" used by sequelize., for example:</span>
				</div>
				<br />

				<JSONView bind:jsonObject={sample_replace_post} />
			</div>

			<div class="icon-text">
				<span class="icon has-text-warning">
					<i class="fa-solid fa-circle-exclamation"></i>
				</span>
				<span>Only "bind" or "replacements" can be used at the same time.</span>
			</div>
		{/if}
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
				onchange={() => {
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

{#snippet tab_app_vars()}
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

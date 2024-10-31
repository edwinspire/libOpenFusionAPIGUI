<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester, JSONView } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import WarnPrd from './warning_production.svelte';
	import Endpoint from '../handler/endpoint.svelte';

	/**
	 * @type {any}
	 */
	//let code;
	export let row = { endpoint: '', method: '', environment: '' };

	let sample_bind_post_string = '{}';
	let fnApiTester;
	let use_var_cnx = false;
	let cnx_param_json = {};
	let cnx_param_var = '';

	let sample_bind_post = {
		bind: {
			your_param_01: '0002081614',
			your_param_02: 123,
			your_param_03: 'ABC'
		}
	};

	let tabList = [
		{ label: 'Query', isActive: true },
		{ label: 'Connection Parameters' },
		{ label: 'Bind Parameters' },
		{ label: 'App Variables' },
		{ label: 'Tester' }
	];

	let query_code = 'SELECT 1+1;';
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

			if (params && params.query) {
				query_code = params.query;
			}

			if (params && params.config) {
				//console.log('>>> ParseCode >> ', typeof params.config, params.config);

				if (typeof params.config === 'object') {
					use_var_cnx = false;
					cnx_param_json = params.config;
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
			outcode.query = query_code;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.warn(error);
			return code;
		}
	}

	onMount(() => {
		//	console.log(code);
		ParseCode();
		sample_bind_post_string = JSON.stringify(sample_bind_post);
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<div>
			<div>
				<div class="content is-small">
					The parameters must have a name like <span style="font-style: oblique; font-weight: bold;"
						>$nameparameter</span
					>
					which bind to the values ​​you send in the request. For more information you can consult the
					<a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/#bind-parameter"
						>sequelize</a
					>
					documentation.
				</div>
			</div>
		</div>
		<WarnPrd bind:environment={row.environment}></WarnPrd>
		<EditorCode isReadOnly={false} title={'Query to be executed'} lang="sql" bind:code={query_code}
		></EditorCode>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<div>
			<div class="content is-small">
				Configuration parameters used by sequelize, visit <a href="https://sequelize.org/"
					>https://sequelize.org/</a
				>
				for more information.
				<br />
				You can also use the name of an application variable enclosed in double quotes to use it, for
				example <strong>"$_VAR_NAME"</strong>.
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
		<div class="content is-small">
			For more information you can consult the
			<a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/#bind-parameter">sequelize</a
			>
			documentation.

			{#if row.method === 'GET'}
				<div class="block">
					<div class="icon-text">
						<span class="icon has-text-warning">
							<i class="fas fa-exclamation-triangle"></i>
						</span>
						<span>GET Method - Warning</span>
					</div>

					<p class="block">
						The GET method is recommended only for simple requests where there is no input
						parameters, or failing that the parameters are key-value on query request, which will be
						used to join with the variables of the SQL query.
					</p>

					<div class="block">
						If you send a parameter that is not present in the query you will get an error similar
						to: <code>Column index out of range</code>
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
				</div>
			{/if}
		</div>
	</div>

	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<AppVars environment={row.environment} isReadOnly={true}></AppVars>
	</div>

	<div class={tabList[4].isActive ? '' : 'is-hidden'}>
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

<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, EditorCode, JSONView } from '@edwinspire/svelte-components';

	//import AppVarsSelector from '../../../../../app/endpoint/widgets/params_json_selector.svelte';
	import AppVarsSelector from '../params_json_selector.svelte';
	import { TimeOutChangeValue } from '../../../../utils/utils.js';

	let { endpoint = $bindable({}), onchange = () => {} } = $props();

	let cnx_param_json = $state({});
	let cnx_param_var = $state('');

	let cnx_sample = $state({
		host: '<host-name>',
		port: '<port>',
		user: 'SYSTEM',
		password: 'manager',
		pooling: true
	});

	let query_sample_get = 'SELECT * FROM YOUR_TABLE WHERE FIELD_01 = $value_01;';
	let query_sample_get_result = 'SELECT * FROM YOUR_TABLE WHERE FIELD_01 = ?;';
	let query_sample_post =
		'SELECT * FROM YOUR_TABLE WHERE FIELD_01 = $value_01 AND FIELD_02 IN (:list_your_values);';
	let query_sample_post_result =
		'SELECT * FROM YOUR_TABLE WHERE FIELD_01 = ? AND FIELD_02 IN (?, ?);';

	let sample_bind_post = $state({bind:{ value_01: 1234, list_your_values: ['0002000157', '0002000158'] }});

	let tabList = $state([
		{ label: 'Query', isActive: true, classIcon: ' fa-solid fa-database ', component: tab_query },
		{ label: 'Pass Parameters', component: tab_pass_params },
		{ label: 'Connection Parameters', component: tab_cnx_params }
	]);

	let query_code = $state('');
	let timeoutChange;

	$effect(() => {
		if (endpoint?.code) {
			timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
		}
	});

	function getCode() {
		let conf = {};
		let outcode = {};

		conf = cnx_param_var;

		try {
			outcode.config = conf;
			outcode.query = query_code;
			//console.log(outcode);
			return JSON.stringify(outcode);
		} catch (error) {
			return code;
		}
	}

	function parseCode() {
		try {
			let params = JSON.parse(endpoint.code || '{}');

			if (params && params.query) {
				query_code = params.query;
			}

			if (params && params.config) {
				cnx_param_var = params.config;
			}

			console.log('parseCode query_code', query_code);
		} catch (error) {
			cnx_param_json = {};
			cnx_param_var = '';
			query_code = 'SELECT 2;';
			console.error('Error', $state.snapshot(error));
		}
	}

	function fnOnChange() {
		console.log('fnOnChange HANA');
		onchange(getData());
	}

	function getData() {
		let data = { code: getCode(), data_test: $state.snapshot(endpoint.data_test) };
		//console.log('getData >>>>>>>>>>>>>>> ', data);
		return data;
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
			<div>
				<div class="content is-small">
					<span style="font-style: oblique; font-weight: bold;">$nameparameter</span>
					to bind, or <span style="font-style: oblique; font-weight: bold;">:nameparameter</span> to use
					array bind. The values ​​you send in the request. For more information go to the "Pass parameters"
					tab.
				</div>
			</div>
		</div>
		<EditorCode
			isReadOnly={false}
			lang="sql"
			showFormat={true}
			bind:code={query_code}
			onchange={(c) => {
				fnOnChange();
			}}
		></EditorCode>
	</div>
{/snippet}

{#snippet tab_pass_params()}
	<div>
		<div class="content is-small">
			<p>
				This "handler" uses <a
					href="https://help.sap.com/docs/HANA_SERVICE_CF/1efad1691c1f496b8b580064a6536c2d/a5c332936d9f47d8b820a4ecc427352c.html"
					>@sap/hana-client internally</a
				>. However, the way the parameters are passed is a little different in order to facilitate
				its use.
			</p>

			<div class="block">
				<h4>Parameter name</h4>

				<div class="block">
					If in the query you use the parameter with the prefix <strong>"$"</strong> (<code
						>$param_name</code
					>), it is expected that this variable corresponds to a value that will be injected into
					the query.
					<br />
					<div class="block">
						For example the following query: <br /> <code>{query_sample_get}</code>
						<br />
						Internally the query becomes:: <br /> <code>{query_sample_get_result}</code>
					</div>
				</div>

				<div class="block">
					If in the query you use the parameter with the prefix <strong>":"</strong> (<code
						>:param_name</code
					>), this variable is expected to contain an array of values ​​that will be injected into
					the query.
					<br />
					<div class="block">
						For example the following query: <br /> <code>{query_sample_post}</code>
						<br />
						The parameters you must send should look like the following example:
						<br />
						<JSONView bind:jsonObject={sample_bind_post} />
						<br />
						Internally the query becomes: <br /> <code>{query_sample_post_result}</code>
					</div>
				</div>

				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fa-solid fa-circle-exclamation"></i>
					</span>
					<span
						>Note that parameter names when sent in the request should not include the prefix.</span
					>
				</div>
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span
						>If you send a parameter that is not present in the query you will get an error similar
						to: <code>There are missing parameters.</code></span
					>
				</div>
			</div>

			{#if endpoint.method === 'GET'}
				<div class="block">
					<div class="icon-text">
						<span class="icon has-text-warning">
							<i class="fas fa-exclamation-triangle"></i>
						</span>
						<span>GET Method - Warning</span>
					</div>

					<div class="block">
						The GET method is recommended only for simple requests where there is no input
						parameters, or failing that the parameters are key-value on query request, which will be
						used to bind with the variables of the SQL query.
					</div>
				</div>
			{:else if endpoint.method === 'POST'}
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
{/snippet}

{#snippet tab_cnx_params()}
	<div>
		<div>
			<div class="content is-small">
				Configuration parameters used by @sap/hana-client, visit <a
					href="https://help.sap.com/docs/HANA_SERVICE_CF/1efad1691c1f496b8b580064a6536c2d/4fe9978ebac44f35b9369ef5a4a26f4c.html"
					>@sap/hana-client</a
				>
				for more information.

				<div class="content is-small">
					<details>
						<summary
							>By example, in most cases the following connection parameters are sufficient:</summary
						>
						<JSONView bind:jsonObject={cnx_sample} />
					</details>
				</div>
			</div>
		</div>

		<AppVarsSelector
			bind:value={cnx_param_var}
			bind:environment={endpoint.environment}
			onselect={(selected) => {
				//console.log('AppVarsSelector Editor', c);
				fnOnChange();
			}}
		></AppVarsSelector>
	</div>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

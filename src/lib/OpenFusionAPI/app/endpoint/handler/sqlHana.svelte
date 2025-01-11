<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, EditorCode, RESTTester, JSONView } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';

	let { row = $bindable({}), onchange = () => {} } = $props();

	let use_var_cnx = $state(false);
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

	let sample_bind_post = $state({
		params: { value_01: 1234, list_your_values: ['0002000157', '0002000158'] }
	});

	let sample_replace_post = {
		replacements: {
			your_param_01: ['0002081614', '986535OKE']
		}
	};

	let tabList = $state([
		{ label: 'Query', isActive: true, classIcon: ' fa-solid fa-database ', component: tab_query },
		{ label: 'Pass Parameters', component: tab_pass_params },
		{ label: 'Connection Parameters', component: tab_cnx_params },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
	]);

	let query_code = $state('');
	let timeoutChange;

	$inspect(row.code).with((type) => {
		//console.log('row.code >>>>>>>>>>>>> ', type, row);
		if (type === 'update' || type === 'init') {
			clearTimeout(timeoutChange);
			timeoutChange = setTimeout(() => {
				parseCode();
			}, 750);
		}
	});

	function parseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

			//console.log('parseCode: >', params);

			if (params && params.query) {
				query_code = params.query;
				console.log('>>>>>> PARSE', params.query, query_code);
			}

			if (params && params.config) {
				//console.log('>>> parseCode >> ', typeof params.config, params.config);

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
			console.log('outcode.query >>>> ', outcode.query);
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.warn(error);
			return code;
		}
	}

	onMount(() => {
		//	console.log(code);
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
					to bind, or <span style="font-style: oblique; font-weight: bold;">:nameparameter</span> to
					use array bind. The values ​​you send in the request. For more information go to the "Pass
					parameters" tab.
				</div>
			</div>
		</div>
		<EditorCode isReadOnly={false} lang="sql" bind:code={query_code}></EditorCode>
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

			{#if row.method === 'GET'}
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
				<div class="content is-small">
					<details>
						<summary
							>By example, in most cases the following connection parameters are sufficient:</summary
						>
						<JSONView bind:jsonObject={cnx_sample} />
					</details>
				</div>

				<EditorCode isReadOnly={false} lang="json" bind:code={cnx_param_json}></EditorCode>
			{:else}
				<div class="content is-small">
					You can also use the name of an application variable to use it, for example <strong
						>$_VAR_NAME</strong
					>.
				</div>

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

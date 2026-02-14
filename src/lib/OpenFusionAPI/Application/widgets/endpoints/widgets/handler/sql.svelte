<script>
	import { Tab, EditorCode, JSONView } from '@edwinspire/svelte-components';

	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/params_json_selector.svelte';
	import { TimeOutChangeValue } from '$lib/OpenFusionAPI/Application/utils/utils.js';

	let { endpoint = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let cnx_custom = $state({});
	let cnx_appvar = $state('');
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
		{ label: 'Connection Parameters', component: tab_cnx_params }
	]);

	let query_code = $state('SELECT 1;');

	let timeoutChange;

	$effect(() => {
		// Rastrear cambios en code y custom_data
		endpoint?.code;
		endpoint?.custom_data;
		timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
	});

	function parseCode() {
		query_code = endpoint.code ?? 'SELECT 1;';
		cnx_custom = endpoint.custom_data;
		cnx_appvar = endpoint.custom_data;
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = {
			code: query_code,
			custom_data:
				cnx_appvar && typeof cnx_appvar === 'string' && cnx_appvar.trim().length > 0
					? cnx_appvar
					: cnx_custom,
			data_test: $state.snapshot(endpoint.data_test)
		};
		console.log(data);
		return data;
	}
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
		lang="sql"
		showFormat={true}
		bind:code={query_code}
		onchange={(c) => {
			//	console.log('onchange Editor', c);
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

		{#if endpoint.method === 'GET'}
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
		</div>
	</div>

	<br />

	<AppVarsSelector
		bind:custom={cnx_custom}
		bind:appvar={cnx_appvar}
		bind:environment={endpoint.environment}
		onselect={(selected) => {
			console.log('SQL AppVarsSelector Editor', selected, cnx_custom, cnx_appvar);
			fnOnChange();
		}}
	></AppVarsSelector>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

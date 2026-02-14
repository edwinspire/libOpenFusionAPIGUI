<script>
	import { Tab, EditorCode, JSONView } from '@edwinspire/svelte-components';
	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/params_json_selector.svelte';
	import PredefinedVars from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/js_predefined_vars.svelte';
	import { TimeOutChangeValue } from '$lib/OpenFusionAPI/Application/utils/utils.js';

	let { endpoint = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let cnx_custom = $state({});
	let cnx_appvar = $state('');

	let tabList = $state([
		{ label: 'Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Modules and functions', component: tab_pred_vars },
		{ label: 'Connection Parameters', component: tab_cnx_params }
	]);

	let js_code = $state('// JS Code');

	let timeoutChange;

	let cnx_param_sample = {
		host: 'localhost',
		port: 27017,
		dbName: 'my_db',
		user: '',
		pass: '',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	};

	$effect(() => {
		endpoint?.code;
		endpoint?.custom_data;
		timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
	});

	function parseCode() {
		js_code = endpoint.code ?? '// JS Code';
		cnx_custom = endpoint.custom_data;
		cnx_appvar = endpoint.custom_data;
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = {
			code: js_code,
			custom_data:
				cnx_appvar && typeof cnx_appvar === 'string' && cnx_appvar.trim().length > 0
					? cnx_appvar
					: cnx_custom,
			data_test: $state.snapshot(endpoint.data_test)
		};
		return data;
	}
</script>

{#snippet tab_code()}
	<div>
		<div>
			<div class="content is-small">
				For more information you can consult the
				<a href="https://mongoosejs.com/">MONGOOSE</a> and
				<a href="https://www.mongodb.com/products/updates/version-release">MongoDB</a>
				documentation.
			</div>
		
			
			<div class="content is-small">The mongose ​​instance with the connection is called <code>mongooseInstance</code> and you can use it within the code.</div>
		</div>
	</div>

	<EditorCode
		isReadOnly={false}
		lang="js"
		showFormat={true}
		bind:code={js_code}
		onchange={(c) => {
			fnOnChange();
		}}
	></EditorCode>
{/snippet}

{#snippet tab_cnx_params()}
	<div>
		<div class="content is-small">
			Configuration parameters used by mongoosejs, visit <a href="https://mongoosejs.com/"
				>Mongoose</a
			>
			for more information.
			<br />
			<details>
				<summary>Example of configuration parameters:</summary>
				<JSONView jsonObject={cnx_param_sample}></JSONView>
			</details>

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
		</div>
	</div>
{/snippet}

{#snippet tab_pred_vars()}
	<PredefinedVars></PredefinedVars>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

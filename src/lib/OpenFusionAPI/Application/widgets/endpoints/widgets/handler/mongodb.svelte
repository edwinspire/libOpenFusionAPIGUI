<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, EditorCode, JSONView } from '@edwinspire/svelte-components';

	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/app_vars_selector.svelte';
	import PredefinedVars from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/js_predefined_vars.svelte';
	import { TimeOutChangeValue } from '$lib/OpenFusionAPI/Application/utils/utils.js';

	let { endpoint = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let cnx_param_var = $state('');

	let tabList = $state([
		{ label: 'Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Predefined Variables', component: tab_pred_vars },
		{ label: 'Connection Parameters', component: tab_cnx_params }
	]);

	let js_code = $state('let test = 1;');

	let timeoutChange;

	let cnx_param_sample = {
		host: 'localhost', // Dirección del servidor MongoDB
		port: 27017, // Puerto por defecto de MongoDB
		dbName: 'my_db', // Nombre de la base de datos
		user: '', // Usuario (opcional, si la autenticación está habilitada)
		pass: '', // Contraseña (opcional)
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	};

	$effect(() => {
		if (endpoint?.code) {
			timeoutChange = TimeOutChangeValue(timeoutChange, parseCode);
		}
	});

	function parseCode() {
		try {
			let params = JSON.parse(endpoint.code || '{}');

			if (params && params.code) {
				js_code = params.code;
			}

			if (params && params.config) {
				cnx_param_var = params.config;
			}
		} catch (error) {
			//	cnx_param_json = {};
			cnx_param_var = '';
			js_code = '// Js Code';
			console.error('Error', error);
		}
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = { code: getCode(), data_test: $state.snapshot(endpoint.data_test) };

		return data;
	}

	function getCode() {
		let conf = {};
		let outcode = {};

		conf = cnx_param_var;

		try {
			outcode.config = conf;
			outcode.code = js_code;
			return JSON.stringify(outcode);
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

{#snippet tab_code()}
	<div>
		<div>
			<div class="content is-small">
				For more information you can consult the
				<a href="https://mongoosejs.com/">MONGOOSE</a> and
				<a href="https://www.mongodb.com/products/updates/version-release">MongoDB</a>
				documentation.
			</div>
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
				bind:value={cnx_param_var}
				bind:environment={endpoint.environment}
				onselect={(selected) => {
					//console.log('AppVarsSelector Editor', c);
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

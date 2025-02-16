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
	import PredefinedVars from '../widgets/js_predefined_vars.svelte';
	import AppVarsSelector from '../widgets/params_selector.svelte';

	let { row = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let cnx_param_var = $state('');

	let tabList = $state([
		{ label: 'Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Predefined Variables', component: tab_pred_vars },
		{ label: 'Connection Parameters', component: tab_cnx_params },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
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
		let data = { code: getCode(), data_test: $state.snapshot(row.data_test) };

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
				bind:environment={row.environment}
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

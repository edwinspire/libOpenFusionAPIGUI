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

	let use_var_cnx = $state(false);
	let cnx_param_json = $state({});
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
			js_code = 'SELECT 1;';
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
			outcode.code = js_code;
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
				showFormat={true}
				bind:code={cnx_param_json}
				onchange={() => {
					fnOnChange();
				}}
			></EditorCode>
		{:else}
			<div class="content is-small">Select an application variable.</div>
			<AppVarsSelector
				bind:value={cnx_param_var}
				bind:environment={row.environment}
				onselect={(selected) => {
					fnOnChange();
				}}
			></AppVarsSelector>
		{/if}
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

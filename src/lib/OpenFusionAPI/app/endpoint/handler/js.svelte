<script>
	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';

	let { row = $bindable({}), onchange = () => {} } = $props();
	let internal_code = $state('');

	$inspect(row).with((type) => {
		//	console.log('row >>>>>>>>>>>>> ', type, row);
		if (type === 'init') {
			defaultValues();
		}
	});

	$inspect(row.code).with((type) => {
		//console.log('row.code >>>>>>>>>>>>> ', type, row);
		if (type === 'update' || type === 'init') {
			parseCode();
		}
	});

	function defaultValues() {
		if (!row) {
			row = { code: {} };
		}

		if (row && !row.code) {
			row.code = {};
		}
	}

	function parseCode() {
		internal_code = row.code;
	}

	function getData() {
		return { code: $state.snapshot(internal_code), data_test: $state.snapshot(row.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	let tabList = $state([
		{ label: 'Code', isActive: true, component: tab_code },
		{ label: 'Predefined Variables', component: tab_pred_vars },
		{ label: 'App Variables', component: tab_appvars },
		{ label: 'Tester', component: tab_tester }
	]);

	onMount(() => {
		defaultValues();
	});
</script>

{#snippet tab_code()}
	<EditorCode
		lang="js"
		bind:code={internal_code}
		onchange={(c) => {
			//console.log('++++++++++++++++ ', c);
			fnOnChange();
		}}
	></EditorCode>
{/snippet}

{#snippet tab_pred_vars()}
	<div class="content is-small">
		<h3>Predefined variables</h3>
		<ul>
			<li>
				<strong>$_RETURN_DATA_:</strong> Variable that returns the return of the function
			</li>
			<li>
				<strong>$_UFETCH_:</strong> Instance of the uFetch class. More information at
				<a href="https://github.com/edwinspire/universal-fetch">universal-fetch</a>
			</li>
			<li>
				<strong>$_REQUEST_:</strong> Represents the HTTP request received by the server. Contains information
				about the request made by the client, such as URL parameters, headers, body data, and more.
			</li>
			<li>
				<strong>$_GET_INTERNAL_URL_:</strong> Function that allows obtaining the full path of an
				OFAPI endpoint.
				<br /> Example:
				<code
					>let relative_path = '/api/test/ap001';
					<br />let fullURL = $_GET_INTERNAL_URL_(relative_path);
					<br />// $_GET_INTERNAL_URL_ return 'http://localhost:3000/api/test/ap001'
				</code>
			</li>
			<li>
				<strong>$_FETCH_OFAPI_:</strong> Build a
				<a href="https://github.com/edwinspire/universal-fetch/">uFetch </a>
				intance.
				<br />
				The url can be absolute or relative. When it is relative, it internally repoints to the port
				used by OFAPI.
				<br />Example:
				<code>
					let url = 'http://example.net/api/test';
					<br />
					let fetch_instance = $_FETCH_OFAPI_(url);
				</code>
			</li>
			<li>
				<strong>$_SECUENTIAL_PROMISES_:</strong> PromiseSequence class. More information at
				<a href="https://github.com/edwinspire/sequential-promises">sequential-promises</a>.
			</li>
		</ul>
	</div>
{/snippet}

{#snippet tab_appvars()}
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
				//console.log('++++++++++++++++ ', c);
				fnOnChange();
			}}
		></RESTTester>
	</div>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import WarnPrd from './warning_production.svelte';

	export let row;
	let internal_code = '';
	let fnApiTester;
	let internal_data_test;

	$: row.code, parseCode();
	$: row.data_test, setDataTest();

	function setDataTest() {
		if (row.data_test) {
			internal_data_test = { ...row.data_test };
		} else {
			internal_data_test = {};
		}

		//	console.log('internal_data_test', internal_data_test);
	}

	function parseCode() {
		internal_code = row.code;
	}

	export function reset() {
		parseCode();
	}

	let tabList = [
		{ label: 'Code', isActive: true },
		{ label: 'Predefined Variables' },
		{ label: 'App Variables' },
		{ label: 'Tester' }
	];

	function getCode() {
		//    console.log(">> getCode en JS.SVELTE ", );
		return internal_code;
	}

	export function getData() {
		let data = { code: getCode(), data_test: internal_data_test };
		//	console.log('> getData > SQL', data);
		return data;
	}

	onMount(() => {});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<EditorCode lang="js" bind:code={internal_code}></EditorCode>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
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
					<strong>$_FETCH_OFAPI_:</strong> Build a <a href="https://github.com/edwinspire/universal-fetch/">uFetch </a> intance. 
					<br/>
					The url can be absolute or relative. When it is relative, it internally repoints to the port used by OFAPI.
					<br />Example:
					<code>
						
						let url = 'http://example.net/api/test';
						<br />
						let fetch_instance =  $_FETCH_OFAPI_(url);
						
						</code
					>
				</li>
				<li>
					<strong>$_SECUENTIAL_PROMISES_:</strong> PromiseSequence class. More information at
					<a href="https://github.com/edwinspire/sequential-promises">sequential-promises</a>.
				</li>
			</ul>
		</div>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<AppVars bind:environment={row.environment} isReadOnly={true}></AppVars>
	</div>

	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
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

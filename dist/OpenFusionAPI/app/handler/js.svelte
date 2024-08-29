<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab, EditorCode } from '@edwinspire/svelte-components';
	import AppVars from '../app_vars.svelte';
	import { parse } from 'svelte/compiler';
	import ApiTester from '../../widgets/ApiTester/index.svelte';

	export let code;
	export let environment;
	export let row;
	let internal_code = code;
	let fnApiTester;
	let internal_data_test;

	$: code, parseCode();
	$: row.data_test, setDataTest();

	function setDataTest() {
		internal_data_test = { ...row.data_test };
		console.log('internal_data_test', internal_data_test);
	}

	function parseCode() {
		internal_code = code;
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

	export function getCode() {
		//    console.log(">> getCode en JS.SVELTE ", );
		return internal_code;
	}

	onMount(() => {});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<div>
			<h3 class="subtitle is-5">
				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-link"></i>
					</span>
					<span>{row.endpoint}</span>
				</div>
			</h3>
		</div>
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
					<strong>$_SECUENTIAL_PROMISES_:</strong> PromiseSequence class. More information at
					<a href="https://github.com/edwinspire/sequential-promises">sequential-promises</a>.
				</li>
			</ul>
		</div>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<AppVars {environment} isReadOnly={true}></AppVars>
	</div>

	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<ApiTester
			bind:this={fnApiTester}
			bind:data={internal_data_test}
			bind:method={row.method}
			url={row.endpoint}
		></ApiTester>
	</div>
</Tab>

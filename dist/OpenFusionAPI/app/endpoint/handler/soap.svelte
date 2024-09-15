<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester, JSONView } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import WarnPrd from './warning_production.svelte';

	export let row;

	let initial_code = '';
	let code_desc = JSON.stringify({ 'describe()': true });
	let fnApiTester;
	let internal_data_test;

	$: row.code, parseCode();
	$: row.data_test, setDataTest();

	function setDataTest() {
		internal_data_test = { ...row.data_test };
		//console.log('internal_data_test', internal_data_test);
	}
	export function reset() {
		//		fnEditorCode.reset();
		parseCode();
	}

	function parseCode() {
		initial_code = row.code;
	}

	let tabList = [
		{ label: 'Parameters', isActive: true },
		{ label: 'Information', isActive: false },
		{ label: 'App Variables' },
		{ label: 'Tester' }
	];

	let jsonParams = {
		wsdl: 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL',
		functionName: 'NumberToDollars',
		BasicAuthSecurity: {
			User: 'any',
			Password: 'any'
		},
		RequestArgs: { dNum: 236.08 }
	};

	function getCode() {
		//fnEditorCode.apply();
		//return fnEditorCode.getCode();
		return initial_code;
	}

	export function getData() {
		let data = { code: getCode(), data_test: internal_data_test };
		//	console.log('> getData > SQL', data);
		return data;
	}

	onMount(() => {
		// console.log(code);
	});
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
			<div>Service connection parameters.</div>
		</div>

		<EditorCode lang="json" bind:code={initial_code}></EditorCode>

		{#if row.method === 'GET'}
			<div class="block">
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamationcode-triangle"></i>
					</span>
					<span>Warning</span>
				</div>

				<p class="block">
					The GET method is recommended only for simple requests where there are no input
					parameters, or failing which the parameters are key-value.
				</p>
			</div>
		{/if}
	</div>
	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		Enter the parameters in json format like the following example:
		<JSONView bind:jsonObject={jsonParams} />
		<div style="margin-top: 1em;">
			The variables with the following:
			<ul class="list_params">
				<li>
					<strong>wsdl:</strong> url where the wsdl is located. (Required)
				</li>

				<li>
					<strong>functionName:</strong> Function or method to call. Required when the method used
					is <strong>GET</strong>, in the <strong>POST</strong> method it can be passed as a parameter.
				</li>
				<li>
					<strong>BasicAuthSecurity:</strong> Only if required. BearerSecurity is also supported.
				</li>
				<li>
					<strong>RequestArgs:</strong> When you use the <strong>GET</strong> method, this parameter
					is replaced by the data sent in the Query. When using <strong>POST</strong> the parameter can
					be sent directly in the Body.
				</li>
			</ul>
			<br />
			<div class="block">
				If you want to <strong>get description</strong> of the SOAP service, you can send the
				following JSON request:
				<code>
					{code_desc}
				</code>
			</div>
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

<style>
	.list_params {
		margin-left: 2em;
		list-style: disc;
	}
</style>

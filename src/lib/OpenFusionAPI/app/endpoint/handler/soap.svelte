<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, RESTTester, JSONView } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	//	import { listAppVars } from '../../../utils.js';
	import AppVarsSelector from '../widgets/params_json_selector.svelte';

	let { row = {}, onchange = () => {} } = $props();

	let internal_code = $state('');
	let code_desc = JSON.stringify({ 'describe()': true });

	let code_sample_options = $state({
		wsdl_options: {
			strictSSL: true,
			rejectUnauthorized: false
			//secureOptions: constants.SSL_OP_NO_TLSv1_2,
		}
	});

	let timeoutChange;

	function parseCode() {
		internal_code = row.code;
		//	console.log('parseCode SOAP', row, internal_code);
	}

	let tabList = $state([
		{
			label: 'Parameters',
			isActive: true,
			classIcon: ' fa-solid fa-soap ',
			component: tab_parameters
		},
		{ label: 'Information', isActive: false, component: tab_infor },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
	]);

	let jsonParams = $state({
		wsdl: 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL',
		functionName: 'NumberToDollars',
		BasicAuthSecurity: {
			User: 'any',
			Password: 'any'
		},
		RequestArgs: { dNum: 236.08 }
	});

	function getCode() {
		return internal_code;
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = { code: getCode(), data_test: $state.snapshot(row.data_test) };

		return data;
	}

	onMount(() => {
		parseCode();
	});

	onDestroy(() => {
		clearTimeout(timeoutChange);
	});
</script>

{#snippet tab_parameters()}
	<div>
		<div>
			<div>Service connection parameters.</div>
		</div>

		<AppVarsSelector
			bind:value={internal_code}
			environment={row.environment}
			onselect={(selected) => {
				//console.log('AppVarsSelector Editor', selected);
				fnOnChange();
			}}
		></AppVarsSelector>

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
{/snippet}

{#snippet tab_infor()}
	<div>
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
				<li>
					<strong>options:</strong> additional options passed to soap client. By example:
					<JSONView bind:jsonObject={code_sample_options} />
				</li>
			</ul>
			<br />

			<div class="block">
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span
						>Warning: The parameters configured here will override those that the user sends through
						the service.</span
					>
				</div>
			</div>

			<br />
			<div class="block">
				<div class="icon-text">
					<span class="icon has-text-success">
						<i class="fas fa-info-circle"></i>
					</span>
					<span
						>If you want to <strong>get description</strong> of the SOAP service, you can send the
						following JSON request:
						<code>
							{code_desc}
						</code></span
					>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet tab_app_vars()}
	<AppVars environment={row.environment} isReadOnly={true}></AppVars>
{/snippet}

{#snippet tab_tester()}
	{#if row}
		<div>
			<RESTTester
				bind:data={row.data_test}
				method={row.method}
				url={row.endpoint}
				methodDisabled={true}
				onchange={(c) => {
					//console.log('RESTTester Editor', c, row.data_test);
					fnOnChange();
				}}
			></RESTTester>
		</div>
	{/if}
{/snippet}

<Tab bind:tabs={tabList}></Tab>

<style>
	.list_params {
		margin-left: 2em;
		list-style: disc;
	}
</style>

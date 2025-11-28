<script>
	import { onMount, onDestroy } from 'svelte';
	import { Tab, JSONView } from '@edwinspire/svelte-components';
	import AppVarsSelector from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/params_json_selector.svelte';

	let { endpoint = {}, onchange = () => {} } = $props();

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
		internal_code = endpoint.code;
		//	console.log('parseCode SOAP', endpoint, internal_code);
	}

	let tabList = $state([
		{
			label: 'Parameters',
			isActive: true,
			classIcon: ' fa-solid fa-soap ',
			component: tab_parameters
		},
		{ label: 'Information', isActive: false, component: tab_infor }
	]);

	let jsonParams = $state({
		wsdl: 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL',
		endpoint: 'https://www.dataaccess.com/webservicesserver/numberconversion.wso',
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
		//let data = { code: getCode(), data_test: $state.snapshot(endpoint.data_test) };
		let data = { code: getCode() };

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
			environment={endpoint.environment}
			onselect={(selected) => {
				//console.log('AppVarsSelector Editor', selected);
				fnOnChange();
			}}
		></AppVarsSelector>

		{#if endpoint.method === 'GET'}
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
					<strong>wsdl:</strong> URL where the wsdl is located. (Required)
				</li>
				<li>
					<strong>endpoint:</strong> URL of the actual endpoint. This is not usually required except
					in specific cases. (Optional)
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

<Tab bind:tabs={tabList}></Tab>

<style>
	.list_params {
		margin-left: 2em;
		list-style: disc;
	}
</style>

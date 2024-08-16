<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import EditorCode from '../../widgets/editorCodeDecrepted.svelte';
	import { Tab } from '@edwinspire/svelte-components';
	import Vars from '../vars.svelte';
	import CodeHTML from '../../widgets/codeHTML.svelte';

	/**
	 * @type {any}
	 */
	export let code;
	export let environment;

	export function reset() {
		fnEditorCode.reset();
	}

	let code_desc = JSON.stringify({ 'describe()': true });

	let tabList = [
		{ label: 'Parameters', isActive: true },
		{ label: 'Information', isActive: false },
		{ label: 'App Variables' }
	];

	/**
	 * @type {EditorCode}
	 */
	let fnEditorCode;
	let jsonParams = {
		wsdl: 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL',
		functionName: 'NumberToDollars',
		BasicAuthSecurity: {
			User: 'any',
			Password: 'any'
		},
		RequestArgs: { dNum: 236.08 }
	};

	export let row;

	export function getCode() {
		//fnEditorCode.apply();
		return fnEditorCode.getCode();
	}

	onMount(() => {
		// console.log(code);
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<EditorCode lang="json" bind:code bind:this={fnEditorCode}>
			<div slot="message">
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
		</EditorCode>

		{#if row.method === 'GET'}
			<div class="block">
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle"></i>
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
		<CodeHTML bind:jsonObject={jsonParams} />
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
		<Vars bind:environment />
	</div>
</Tab>

<style>
	.list_params {
		margin-left: 2em;
		list-style: disc;
	}
</style>

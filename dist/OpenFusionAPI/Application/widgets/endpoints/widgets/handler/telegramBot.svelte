<script>
	import { onMount } from 'svelte';
	import { Tab, EditorCode, Input } from '@edwinspire/svelte-components';

	//	import PredefinedVars from '../../../../../app/endpoint/widgets/js_predefined_vars.svelte';
	import PredefinedVars from '../js_predefined_vars.svelte';

	let { endpoint = $bindable({}), onchange = () => {} } = $props();
	let internal_code = $state('');

	$effect(() => {
		if (!endpoint) {
			endpoint = { code: {}, custom_data: {} };
		}
		if (endpoint && !endpoint.code) {
			endpoint.code = {};
		}
		if (endpoint && !endpoint.custom_data) {
			endpoint.custom_data = {};
		}

		if (endpoint?.code) {
			parseCode();
		}
	});

	function parseCode() {
		internal_code = endpoint.code;
	}

	function getData() {
		return { code: $state.snapshot(internal_code), data_test: $state.snapshot(endpoint.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	let tabList = $state([
		{ label: 'Bot Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Modules and functions', component: tab_pred_vars }
	]);
</script>

{#snippet inputToken()}
	<span>The constant $BOT is an instance of Grammy.</span>
{/snippet}

{#snippet tab_code()}
	{#if endpoint?.custom_data}
		<Input
			label="Telegram Bot Token"
			bind:value={endpoint.custom_data.token}
			placeholder="Telegram Bot Token"
			onchange={(v) => {
				endpoint.custom_data.token = v;
				onchange(endpoint);
			}}
		></Input>
	{/if}

	<EditorCode
		left={inputToken}
		lang="js"
		showFormat={true}
		bind:code={internal_code}
		onchange={(c) => {
			fnOnChange();
		}}
	></EditorCode>
{/snippet}

{#snippet tab_pred_vars()}
	<PredefinedVars></PredefinedVars>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

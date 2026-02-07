<script>
	import { onMount } from 'svelte';
	import { Tab, EditorCode } from '@edwinspire/svelte-components';

	//	import PredefinedVars from '$lib/OpenFusionAPI/app/endpoint/widgets/js_predefined_vars.svelte';
	import PredefinedVars from '$lib/OpenFusionAPI/Application/widgets/endpoints/widgets/js_predefined_vars.svelte';

	let { endpoint = $bindable({}), onchange = () => {} } = $props();
	let internal_code = $state('');

	$effect(() => {
		if (endpoint?.code) {
			parseCode();
		}
	});

	function defaultValues() {
		if (!endpoint) {
			endpoint = { code: {} };
		}

		if (endpoint && !endpoint.code) {
			endpoint.code = {};
		}
	}

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
		{ label: 'Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Modules and functions', component: tab_pred_vars }
	]);

	onMount(() => {
		defaultValues();
	});
</script>

{#snippet tab_code()}
	<EditorCode
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

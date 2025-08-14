<script>
	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '$lib/OpenFusionAPI/app/app_vars.svelte';
	import PredefinedVars from '$lib/OpenFusionAPI/app/endpoint/widgets/js_predefined_vars.svelte';

	let { row = $bindable({}), onchange = () => {} } = $props();
	let internal_code = $state('');

	

	$effect(() => {
		if (row?.code) {
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
		{ label: 'Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Predefined Variables', component: tab_pred_vars },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
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

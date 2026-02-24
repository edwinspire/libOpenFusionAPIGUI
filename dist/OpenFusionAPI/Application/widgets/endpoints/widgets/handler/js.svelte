<script>
	import { Tab, EditorCode } from '@edwinspire/svelte-components';
	import PredefinedVars from '../js_predefined_vars.svelte';

	let { endpoint = $bindable({}), onchange = () => {} } = $props();

	let internal_code = $state(endpoint?.code ?? '');

	// Sync parent → internal cuando endpoint.code cambie externamente
	$effect(() => {
		const code = endpoint?.code;
		if (code !== undefined && code !== internal_code) {
			internal_code = code;
		}
	});

	function getData() {
		return { code: internal_code, data_test: $state.snapshot(endpoint.data_test) };
	}

	function fnOnChange() {
		endpoint.code = internal_code;
		onchange(getData());
	}

	let tabList = $state([
		{ label: 'Code', isActive: true, classIcon: ' fa-brands fa-node-js ', component: tab_code },
		{ label: 'Modules and functions', component: tab_pred_vars }
	]);
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

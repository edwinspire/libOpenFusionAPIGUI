<script>
	import { onMount } from 'svelte';
	import { Tab, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '$lib/OpenFusionAPI/app/app_vars.svelte';
	import AppVarsSelector from '$lib/OpenFusionAPI/app/endpoint/widgets/app_vars_selector.svelte';

	let { row = $bindable({}), onchange = () => {} } = $props();

	let tabList = $state([
		{ label: 'Url', isActive: true, component: tab_url },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
	]);

	function getData() {
		return { code: $state.snapshot(row.code), data_test: $state.snapshot(row.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	onMount(() => {});
</script>

{#snippet tab_url()}
	<div>
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">Url to make the request. The operation is similar to a proxy</label>
		<AppVarsSelector
			freeTyping={true}
			placeholder={'http://your.url/path'}
			classIcon={'fa-solid fa-globe'}
			label={'Url'}
			environment={row.environment}
			bind:value={row.code}
			onselect={(selected) => {
				fnOnChange();
			}}
		></AppVarsSelector>
	</div>
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

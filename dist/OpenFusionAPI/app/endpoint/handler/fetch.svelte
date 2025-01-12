<script>
	import { onMount } from 'svelte';
	import { Tab, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';

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
	<div class="field">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">Url to make the request. The operation is similar to a proxy</label>
		<div class="control has-icons-right">
			<input
				class="input is-small"
				type="text"
				placeholder="http://your.url/path"
				bind:value={row.code}
				onchange={() => {
					fnOnChange();
				}}
			/>
			<span class="icon is-small is-right">
				<i class="fa-solid fa-globe"></i>
			</span>
		</div>
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

<script>
	import { onMount } from 'svelte';
	import { Tab } from '@edwinspire/svelte-components';

	//import AppVarsSelector from '../../../../../app/endpoint/widgets/app_vars_selector.svelte';
	import AppVarsSelector from '../app_vars_selector.svelte';

	let { endpoint = $bindable({}), onchange = () => {} } = $props();

	let tabList = $state([{ label: 'Url', isActive: true, component: tab_url }]);

	function getData() {
		return { code: $state.snapshot(endpoint.code), data_test: $state.snapshot(endpoint.data_test) };
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
			environment={endpoint.environment}
			bind:value={endpoint.code}
			onselect={(selected) => {
				fnOnChange();
			}}
		></AppVarsSelector>
	</div>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

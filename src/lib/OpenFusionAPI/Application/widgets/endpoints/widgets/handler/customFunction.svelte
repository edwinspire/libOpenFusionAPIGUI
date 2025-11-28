<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		listFunctionStoreDev,
		listFunctionStoreQA,
		listFunctionStorePRD
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import SelectFns from '$lib/OpenFusionAPI/Application/widgets/common/Select.svelte';
	import { Tab } from '@edwinspire/svelte-components';

	let { endpoint = $bindable({}), onchange = () => {} } = $props();
	let functions = $state([]);

	/**
	 * @type {any[]}
	 */
	let functionsDev = [];

	/**
	 * @type {any[]}
	 */
	let functionsQa = [];

	/**
	 * @type {any[]}
	 */
	let functionsPrd = [];

	let tabList = $state([{ label: 'Function', isActive: true, component: tab_fn }]);

	function defaultValues() {
		if (!endpoint) {
			endpoint = { data_test: {}, method: 'GET', url: '' };
		}

		if (!endpoint?.data_test) {
			endpoint.data_test = {};
		}

		if (!endpoint?.method) {
			endpoint.method = 'GET';
		}
		if (!endpoint?.url) {
			endpoint.url = '';
		}
	}

	function getData() {
		return { code: $state.snapshot(endpoint.code), data_test: $state.snapshot(endpoint.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	const unsubscribe_dev = listFunctionStoreDev.subscribe((value) => {
		// @ts-ignore
		functionsDev = value;
	});

	const unsubscribe_qa = listFunctionStoreQA.subscribe((value) => {
		// @ts-ignore
		functionsQa = value;
	});

	const unsubscribe_prd = listFunctionStorePRD.subscribe((value) => {
		// @ts-ignore
		functionsPrd = value;
	});

	onDestroy(unsubscribe_dev);
	onDestroy(unsubscribe_qa);
	onDestroy(unsubscribe_prd);

	onMount(() => {
		defaultValues();

		switch (endpoint.environment) {
			case 'dev':
				functions = functionsDev;
				break;
			case 'qa':
				functions = functionsQa;
				break;
			case 'prd':
				functions = functionsPrd;
				break;
		}
	});
</script>

{#snippet tab_fn()}
	<div class="content is-small">Use the selected function to return a response.</div>

	<div class="field is-horizontal">
		<div class="field-label is-normal">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label is-small">Function</label>
		</div>
		<div class="field-body">
			<div class="field is-narrow">
				<SelectFns
					bind:options={functions}
					bind:option={endpoint.code}
					onchange={(s) => {
						fnOnChange();
					}}
				/>
			</div>
		</div>
	</div>
{/snippet}

<svelte:boundary onerror={(e) => console.error(e)}><Tab bind:tabs={tabList}></Tab></svelte:boundary>

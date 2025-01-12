<script>
	import { onMount } from 'svelte';
	import { listFunctionStoreDev } from '../../../utils';
	import { listFunctionStoreQA } from '../../../utils';
	import { listFunctionStorePRD } from '../../../utils';
	import SelectFns from '../../../widgets/Select.svelte';
	import { Tab, RESTTester } from '@edwinspire/svelte-components';

	let { row = $bindable({}), onchange = () => {} } = $props();
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

	let tabList = $state([
		{ label: 'Function', isActive: true, component: tab_fn },
		{ label: 'Tester', component: tab_tester }
	]);

	function getData() {
		return { code: $state.snapshot(row.code), data_test: $state.snapshot(row.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	listFunctionStoreDev.subscribe((value) => {
		// @ts-ignore
		functionsDev = value;
	});

	listFunctionStoreQA.subscribe((value) => {
		// @ts-ignore
		functionsQa = value;
	});

	listFunctionStorePRD.subscribe((value) => {
		// @ts-ignore
		functionsPrd = value;
	});

	onMount(() => {
		switch (row.environment) {
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

		//		console.warn('CUSTOM FN: ', row.environment, functions);
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
					bind:option={row.code}
					onchange={(s) => {
						fnOnChange();
					}}
				/>
			</div>
		</div>
	</div>
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

<script>
	import { onMount } from 'svelte';
	import { listFunctionStoreDev } from '../../../utils';
	import { listFunctionStoreQA } from '../../../utils';
	import { listFunctionStorePRD } from '../../../utils';
	import SelectFns from '../../../widgets/Select.svelte';
	import { Tab, RESTTester } from '@edwinspire/svelte-components';
	import WarnPrd from './warning_production.svelte';

	let fnApiTester;

	/**
	 * @type {any[]}
	 */
	let functions = [];

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
	let internal_data_test = {};
	let selection = '';

	let tabList = [{ label: 'Function', isActive: true }, { label: 'Tester' }];

	/**
	 * @type {{ endpoint: any; }}
	 */
	export let row;

	export function getData() {
		let data = { code: getCode(), data_test: internal_data_test };
		//	console.log('> getData > SQL', data);
		return data;
	}

	function getCode() {
		//fnEditorCode.apply();
		return selection;
	}

	export function reset() {
		selection = row.code;
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

	function setCode() {
		selection = row.code;
	}

	$: row.code, setCode();

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

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<div class="content is-small">Use the selected function to return a response.</div>

		<div class="field is-horizontal">
			<div class="field-label is-normal">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label is-small">Function</label>
			</div>
			<div class="field-body">
				<div class="field is-narrow">
					<SelectFns bind:options={functions} bind:option={selection} />
				</div>
			</div>
		</div>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<WarnPrd bind:environment={row.environment}></WarnPrd>

		<RESTTester
			bind:this={fnApiTester}
			bind:data={internal_data_test}
			bind:method={row.method}
			url={row.endpoint}
			methodDisabled={true}
		></RESTTester>
	</div>
</Tab>

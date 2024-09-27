<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Tab, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import { parse } from 'svelte/compiler';
	import WarnPrd from './warning_production.svelte';
	//import Endpoint from '../handler/endpoint.svelte';

	export let row;
	let internal_code = '';
	let fnApiTester;
	let internal_data_test;

	let tabList = [{ label: 'Url', isActive: true }, { label: 'App Variables' }, { label: 'Tester' }];

	$: row.code, parseCode();
	$: row.data_test, setDataTest();

	function setDataTest() {
		internal_data_test = { ...row.data_test };
		//console.log('internal_data_test', internal_data_test);
	}

	export function reset() {
		//	fnEditorCode.reset();
		internal_code = row.code;
	}

	export function getData() {
		let data = { code: getCode(), data_test: internal_data_test };
	//	console.log('> getData > SQL', data);
		return data;
	}

	function getCode() {
		//fnEditorCode.apply();
		return internal_code;
	}

	function parseCode() {
		internal_code = row.code;
		//	console.log('>>>>>>>>', code, internal_code);
	}

	onMount(() => {
		//	console.log(code);
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		
		<div class="field">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">Url to make the request. The operation is similar to a proxy</label>
			<div class="control has-icons-right">
				<input
					class="input is-small"
					type="text"
					placeholder="http://your.url/path"
					bind:value={internal_code}
				/>
				<span class="icon is-small is-right">
					<i class="fa-solid fa-globe"></i>
				</span>
			</div>
		</div>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<AppVars bind:environment={row.environment} isReadOnly={true}></AppVars>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
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

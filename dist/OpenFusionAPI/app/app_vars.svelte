<script>
	import { onMount } from 'svelte';
	import { listAppVars } from '../utils';
	import CodeHTML from '../widgets/codeHTML.svelte';
	import { EditorCode, Tab } from '@edwinspire/svelte-components';

	export let isReadOnly = false;
	export let showCode = false;
	export let environment = '*';
	let Datavars = {};

	listAppVars.subscribe((value) => {
		console.log('>>>>> listAppVars ->>>>', value);
		// @ts-ignore
		Datavars = value || {};
		//setCode();
	});

	let tabList = [
		{ label: 'Development', isActive: true },
		{ label: 'Quality' },
		{ label: 'Production' }
	];

	export function getCode() {
		console.log('getCode >>>> ', Datavars);
		return Datavars;
	}

	onMount(() => {
		//setCode();
	});
</script>

<Tab bind:tabs={tabList}>
	{#if environment == 'dev' || environment == '*'}
		<div class={tabList[0].isActive ? '' : 'is-hidden'}>
			{#if Datavars && Datavars.dev}
				<div class="box">
					{#each Object.keys(Datavars.dev) as varname}
						<EditorCode
							{showCode}
							bind:isReadOnly
							bind:title={varname}
							bind:code={Datavars.dev[varname]}
						></EditorCode>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	{#if environment == 'qa' || environment == '*'}
		<div class={tabList[1].isActive ? '' : 'is-hidden'}>
			{#if Datavars && Datavars.qa}
				<div class="box">
					{#each Object.keys(Datavars.qa) as varname}
						<EditorCode
							{showCode}
							bind:isReadOnly
							bind:title={varname}
							bind:code={Datavars.qa[varname]}
						></EditorCode>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	{#if environment == 'prd' || environment == '*'}
		<div class={tabList[2].isActive ? '' : 'is-hidden'}>
			{#if Datavars && Datavars.prd}
				<div class="box">
					{#each Object.keys(Datavars.prd) as varname}
						<EditorCode
							{showCode}
							bind:isReadOnly
							bind:title={varname}
							bind:code={Datavars.prd[varname]}
						></EditorCode>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</Tab>

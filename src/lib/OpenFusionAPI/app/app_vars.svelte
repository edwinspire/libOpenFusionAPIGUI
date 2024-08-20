<script>
	import { onMount } from 'svelte';
	import { listAppVars } from '../utils';
	import {  Tab } from '@edwinspire/svelte-components';
	import VarEnv from './vars/vars.svelte';

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
				<VarEnv bind:appVars={Datavars.dev}></VarEnv>
			{/if}
		</div>
	{/if}

	{#if environment == 'qa' || environment == '*'}
		<div class={tabList[1].isActive ? '' : 'is-hidden'}>
			{#if Datavars && Datavars.qa}
				<VarEnv bind:appVars={Datavars.qa}></VarEnv>
			{/if}
		</div>
	{/if}

	{#if environment == 'prd' || environment == '*'}
		<div class={tabList[2].isActive ? '' : 'is-hidden'}>
			{#if Datavars && Datavars.prd}
				<VarEnv bind:appVars={Datavars.prd}></VarEnv>
			{/if}
		</div>
	{/if}
</Tab>

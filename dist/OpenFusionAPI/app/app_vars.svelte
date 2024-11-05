<script>
	import { onMount } from 'svelte';
	import { listAppVars } from '../utils';
	import VarEnv from './vars/vars.svelte';

	export let isReadOnly = false;
	//export let showCode = false;
	export let environment = '*';
	let Datavars = {};

	listAppVars.subscribe((value) => {
//		console.log('>>>>> listAppVars ->>>>', value);
		// @ts-ignore
		Datavars = value || {};
		//setCode();
	});

	let tabList = [
		{ label: 'Development', isActive: true },
		{ label: 'Quality' },
		{ label: 'Production' }
	];

	$: environment, setTabs();

	function setTabs() {
		//console.log(environment, tabList);
		/*
		if (environment && tabList) {
			
			tabList = [{ label: 'Development', isActive: true }];
			
		}
		*/
		tabList = tabList.map((tab) => {
			let tabItem = { ...tab };
			tabItem.isActive = false;

			switch (tab.label) {
				case 'Development':
					tabItem.isActive = environment == 'dev' || environment == '*';
					break;
				case 'Quality':
					tabItem.isActive = environment == 'qa';
					break;
				case 'Production':
					tabItem.isActive = environment == 'prd';
					break;
			}

			return tabItem;
		});
	}

	export function getCode() {
//		console.log('getCode >>>> ', Datavars);
		return Datavars;
	}


	onMount(() => {
		//setCode();
	});
</script>

<div  >
	{#if environment == 'dev' || environment == '*'}
		{#if Datavars && Datavars.dev}
			<div class="column"><VarEnv bind:appVars={Datavars.dev} bind:isReadOnly title={'DEVELOPMENT'}></VarEnv></div>
		{/if}
	{/if}

	{#if environment == 'qa' || environment == '*'}
		{#if Datavars && Datavars.qa}
			<div class="column">
				<VarEnv bind:appVars={Datavars.qa} bind:isReadOnly title={'QUALITY'}></VarEnv>
			</div>
		{/if}
	{/if}

	
	{#if environment == 'prd' || environment == '*'}
		{#if Datavars && Datavars.prd}
			<div class="column">
				<VarEnv bind:appVars={Datavars.prd} bind:isReadOnly title={'PRODUCTION'}></VarEnv>
			</div>
		{/if}
	{/if}

</div>


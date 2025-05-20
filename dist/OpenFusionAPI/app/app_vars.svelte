<script>
	import { onMount } from 'svelte';
	import { listAppVars } from '../utils';
	import VarEnv from './vars/vars.svelte';

	let {
		environment = $bindable('*'),
		isReadOnly = $bindable(false),
		onchange = () => {}
	} = $props();

	let Datavars = $state({});

	listAppVars.subscribe((value) => {
		//			console.log('listAppVars', value);
		Datavars = value || {};

		Datavars.dev = Datavars.dev || {};
		Datavars.qa = Datavars.qa || {};
		Datavars.prd = Datavars.prd || {};
	});

	function internalOnchange() {
		onchange($state.snapshot(Datavars));
	}

	onMount(() => {});
</script>

<div>
	{#if environment == 'dev' || environment == '*'}
		{#if Datavars && Datavars.dev}
			<div class="column">
				<VarEnv
					bind:appVars={Datavars.dev}
					{isReadOnly}
					title={'DEVELOPMENT'}
					onchange={(x) => {
						internalOnchange();
					}}
				></VarEnv>
			</div>
		{/if}
	{/if}

	{#if environment == 'qa' || environment == '*'}
		{#if Datavars && Datavars.qa}
			<div class="column">
				<VarEnv
					appVars={Datavars.qa}
					{isReadOnly}
					title={'QUALITY'}
					onchange={() => {
						internalOnchange();
					}}
				></VarEnv>
			</div>
		{/if}
	{/if}

	{#if environment == 'prd' || environment == '*'}
		{#if Datavars && Datavars.prd}
			<div class="column">
				<VarEnv
					appVars={Datavars.prd}
					{isReadOnly}
					title={'PRODUCTION'}
					onchange={() => {
						internalOnchange();
					}}
				></VarEnv>
			</div>
		{/if}
	{/if}
</div>

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
		console.log('listAppVars', value);
		Datavars = value || {};

		if (Datavars) {
			if (Datavars.dev == null) {
				Datavars.dev = {};
			}
			if (Datavars.qa == null) {
				Datavars.qa = {};
			}
			if (Datavars.prd == null) {
				Datavars.prd = {};
			}
		}

		console.log('Datavars', Datavars);
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

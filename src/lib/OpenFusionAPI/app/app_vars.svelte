<script>
	import { onMount } from 'svelte';
	import { listAppVars } from '$lib/OpenFusionAPI/utils.js';
	import VarEnv from './vars/vars.svelte';

	let {
		environment = $bindable('*'),
		isReadOnly = $bindable(false),
		environment_list = $bindable([]),
		onchange = () => {}
	} = $props();

	let Datavars = $state({});

	listAppVars.subscribe((value) => {
		//console.log('listAppVars', value);
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

	function internalOncopy(var_to_copy) {
		console.log('COPY VAR REQUESTED >>>> ', Datavars, var_to_copy);

		if(Datavars && !Datavars[var_to_copy.env_destination]){
			Datavars[var_to_copy.env_destination] = {};
		}

		if(Datavars && Datavars[var_to_copy.env_destination] && var_to_copy.varname){
			Datavars[var_to_copy.env_destination][var_to_copy.varname] = var_to_copy.value;
			internalOnchange();
		}
		//internalOnchange();
	}

	onMount(() => {});
</script>

<div>
	{#if environment == 'dev' || environment == '*'}
		{#if Datavars && Datavars.dev}
			<div class="column">
				<VarEnv
					bind:appVars={Datavars.dev}
					environment="dev"
					bind:environment_list
					{isReadOnly}
					title={'DEVELOPMENT'}
					onchange={(x) => {
						internalOnchange();
					}}
					oncopy={(x) => {
						internalOncopy(x);
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
					environment="qa"
					bind:environment_list
					{isReadOnly}
					title={'QUALITY'}
					onchange={() => {
						internalOnchange();
					}}
					oncopy={(x) => {
						internalOncopy(x);
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
					environment="prd"
					bind:environment_list
					{isReadOnly}
					title={'PRODUCTION'}
					onchange={() => {
						internalOnchange();
					}}
					oncopy={(x) => {
						internalOncopy(x);
					}}
				></VarEnv>
			</div>
		{/if}
	{/if}
</div>

<script>
	import { onMount } from 'svelte';
	import { listAppVars } from '../utils';
	import VarEnv from './vars/vars.svelte';

	let {
		environment = $bindable('*'),
		isReadOnly = $bindable(false),
		onchanged = () => {}
	} = $props();

	let Datavars = $state({});

	listAppVars.subscribe((value) => {
		Datavars = value || {};
	});

	let timeoutChangeDatavars;

	$inspect(Datavars).with((type) => {
		if (type === 'update') {
			clearTimeout(timeoutChangeDatavars);
			timeoutChangeDatavars = setTimeout(() => {
				onchanged($state.snapshot(Datavars));
			}, 500);
		}
	});

	onMount(() => {});
</script>

<div>
	{#if environment == 'dev' || environment == '*'}
		{#if Datavars && Datavars.dev}
			<div class="column">
				<VarEnv appVars={Datavars.dev} {isReadOnly} title={'DEVELOPMENT'}></VarEnv>
			</div>
		{/if}
	{/if}

	{#if environment == 'qa' || environment == '*'}
		{#if Datavars && Datavars.qa}
			<div class="column">
				<VarEnv appVars={Datavars.qa} {isReadOnly} title={'QUALITY'}></VarEnv>
			</div>
		{/if}
	{/if}

	{#if environment == 'prd' || environment == '*'}
		{#if Datavars && Datavars.prd}
			<div class="column">
				<VarEnv appVars={Datavars.prd} {isReadOnly} title={'PRODUCTION'}></VarEnv>
			</div>
		{/if}
	{/if}
</div>

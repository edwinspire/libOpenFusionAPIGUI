<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import VarEnv from './variable.svelte';
	import { isNewApp } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { onMount } from 'svelte';

	let uf = new uFetch();

	let {
		idapp = $bindable(0),
		environment = $bindable('*'),
		isReadOnly = $bindable(false),
		onchange = () => {}
	} = $props();

	let deploying = $state({ show: false, message: '', error: false });
	let app = $state({idapp:0, app: '', enabled: false, description: '' });

	let Datavars = $state({});

	userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	$effect(async () => {
		//idapp;
		if (isNewApp(idapp)) {
		//	console.log('Resetear variables');
			resetValues();
		} else {
		//	console.log('Cargar datos de la app');
			//	await GetListEnvironment();
			resetValues();
			await GetApp();
		}
	});

	function resetValues() {
		app = {idapp:0, vars: {} };
	}

	export async function Save() {
		if (idapp && app.idapp == idapp) {
			try {
				let request = await uf.POST({
					url: url_paths.app,
					data: $state.snapshot(app)
				});

				let response = await request.json();

				if (request.status == 200 && response) {
					app = { ...response };
					deploying.show = false;
					console.log(response);
				} else {
					deploying.error = true;
					deploying.message = `Error: ${response.message || request.statusText}`;
					// No se obtuvieron datos
					clearDataVars();
				}
			} catch (error) {
				console.error(error);
				deploying.error = true;
				deploying.message = `Error: ${error.message}`;
			}
		}
		return app;
	}

	async function GetApp() {
		try {
			let request = await uf.GET({
				url: url_paths.app,
				data: { idapp: idapp }
			});

			let response = await request.json();

			if (response) {
				app = { ...response };

				console.log(response);
			} else {
				// No se obtuvieron datos
				clearDataVars();
			}
		} catch (error) {
			console.error(error);
		}
	}

	function internalOnchange() {
		onchange($state.snapshot(Datavars));
	}

	function internalOncopy(var_to_copy) {
		//console.log('COPY VAR REQUESTED >>>> ', Datavars, var_to_copy);

		if (app?.vars && !app?.vars[var_to_copy.env_destination]) {
			app.vars[var_to_copy.env_destination] = {};
		}

		if (app?.vars && app?.vars[var_to_copy.env_destination] && var_to_copy.varname) {
			app.vars[var_to_copy.env_destination][var_to_copy.varname] = var_to_copy.value;
			internalOnchange();
		}
		//internalOnchange();
	}

	onMount(async () => {
		//await GetListEnvironment();
	});
</script>

<div>
	{#if environment == 'dev' || environment == '*'}
		{#if app?.vars?.dev}
			<div class="column">
				<VarEnv
					bind:appVars={app.vars.dev}
					environment="dev"
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
		{#if app?.vars?.qa}
			<div class="column">
				<VarEnv
					bind:appVars={app.vars.qa}
					environment="qa"
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
		{#if app?.vars?.prd}
			<div class="column">
				<VarEnv
					bind:appVars={app.vars.prd}
					environment="prd"
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

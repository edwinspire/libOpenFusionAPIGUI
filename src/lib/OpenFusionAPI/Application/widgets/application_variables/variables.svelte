<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { GetAppVars, UpsertAppVar } from '$lib/OpenFusionAPI/Application/utils/request.js';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import VarEnv from './variable.svelte';
	import { isNewApp } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { DialogModal } from '@edwinspire/svelte-components';
	import SelectEnvironment from '$lib/OpenFusionAPI/widgets/Select.svelte';
	import { Environment as environment_list } from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import { onDestroy, onMount } from 'svelte';

	let uf = new uFetch();

	let {
		idapp = $bindable(0),
		environment = $bindable('*'),
		isReadOnly = $bindable(false),
		onchange = () => {}
	} = $props();

	let app = $state({ idapp: 0, app: '', enabled: false, description: '' });
	let ShowDialogCopyEndpoint = $state(false);
	let var_replace_copy = $state(false);
	let var_to_copy = $state({});
	let Datavars = $state({});
	let DataAppVars = $state([]);

	const unsubscribe = userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	let env_dev = $derived.by(() => {
		return DataAppVars.filter((item) => {
			return item.environment == 'dev';
		});
	});

	let env_qa = $derived.by(() => {
		return DataAppVars.filter((item) => {
			return item.environment == 'qa';
		});
	});

	let env_prd = $derived.by(() => {
		return DataAppVars.filter((item) => {
			return item.environment == 'prd';
		});
	});

	let available_environments_list = $derived.by(() => {
		return environment_list.filter((el) => {
			//console.log('>>>>>>>>>>>>><', el, environment);
			return el.id != var_to_copy.environment;
		});
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
			await GetData();
		}
	});

	function resetValues() {
		app = { idapp: 0, vars: {} };
	}

	async function SaveAppVarCopyReplace() {
		let var_to_save = { ...var_to_copy };
		if (var_to_save.idvar_destination) {
			var_to_save.idvar = var_to_save.idvar_destination;
			delete var_to_save.idvar_destination;
		} else {
			var_to_save.idvar = undefined;
		}
		var_to_save.environment = var_to_save.env_destination;
		delete var_to_save.env_destination;

		let avr = await UpsertAppVar(var_to_save);

		if (avr && avr.idvar) {
			noty.push({
				message: `Variable ${avr.name} successfully saved in the ${avr.environment} environment`,
				color: 'success'
			});
		} else {
			noty.push({
				message: `Variable ${avr.name} could not be saved successfully in the ${avr.environment} environment`,
				color: 'danger'
			});
		}

		await GetData();
	}

	async function GetData() {
		try {
			DataAppVars = await GetAppVars(idapp, $userStore.token);
		} catch (error) {
			console.error(error);
			DataAppVars = [];
		}
	}

	function internalOnchange() {
		onchange($state.snapshot(Datavars));
	}

	function internalOncopy(v) {
		ShowDialogCopyEndpoint = true;
		var_to_copy = v;
	}

	onMount(async () => {
		//await GetListEnvironment();
	});
	onDestroy(unsubscribe);
</script>

<div>
	{#if environment == 'dev' || environment == '*'}
		<div class="column">
			<VarEnv
				bind:appVars={env_dev}
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

	{#if environment == 'qa' || environment == '*'}
		<div class="column">
			<VarEnv
				bind:appVars={env_qa}
				environment="qa"
				{isReadOnly}
				title={'QUALITY'}
				onchange={(x) => {
					internalOnchange();
				}}
				oncopy={(x) => {
					internalOncopy(x);
				}}
			></VarEnv>
		</div>
	{/if}

	{#if environment == 'prd' || environment == '*'}
		<div class="column">
			<VarEnv
				bind:appVars={env_prd}
				environment="prd"
				{isReadOnly}
				title={'PRODUCTION'}
				onchange={(x) => {
					internalOnchange();
				}}
				oncopy={(x) => {
					internalOncopy(x);
				}}
			></VarEnv>
		</div>
	{/if}
</div>

<DialogModal
	bind:show={ShowDialogCopyEndpoint}
	title={titleModal}
	body={bodyDialogModal}
	onaccept={async () => {
		//
		await SaveAppVarCopyReplace();
	}}
	oncancel={() => {
		var_to_copy = {};
	}}
>
	{#snippet titleModal()}
		<span>{`Copy ${var_to_copy.name}`}</span>
	{/snippet}

	{#snippet bodyDialogModal()}
		<div>Copy or replace the variable to another environment.</div>
		<br />

		<div class="field has-addons">
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> Copy to: </a>
			</p>

			<p class="control">
				<SelectEnvironment
					options={available_environments_list}
					onchange={(e) => {
						//console.log('SELECCIONADO TO COPY >>>> ', e);
						var_to_copy.env_destination = e;
						// Validar si no existe la variable en el nuevo destino
						if (DataAppVars && Array.isArray(DataAppVars)) {
							let var_exists = DataAppVars.find((item) => {
								return (
									item.name == var_to_copy.name && item.environment == var_to_copy.env_destination
								);
							});

							if (var_exists && var_exists.idvar) {
								var_to_copy.idvar_destination = var_exists.idvar;
							}
						}
					}}
				/>
			</p>
		</div>

		{#if !var_to_copy.env_destination || var_to_copy.env_destination == ''}
			<div class="icon-text">
				<span class="icon has-text-warning">
					<i class="fas fa-exclamation-triangle"></i>
				</span>
				<span> Select an environment to copy. </span>
			</div>
		{/if}

		<!-- svelte-ignore block_empty -->
		{#if var_to_copy && var_to_copy.idvar_destination}
			<label class="checkbox">
				<input type="checkbox" bind:checked={var_replace_copy} />
				I agree to copy and/or replace the application variable to the
				<strong>{var_to_copy.env_destination}</strong> environment.
			</label>

			{#if !var_replace_copy}
				<br />
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span> You must agree to continue. </span>
				</div>
			{/if}
		{/if}
	{/snippet}
</DialogModal>

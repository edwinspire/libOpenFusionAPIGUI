<script>
	import { GetAppVars, UpsertAppVar, migrateAppVars } from '$lib/OpenFusionAPI/Application/utils/request.js';
	import { userStore, storeServerModelChanged } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import VarEnv from './variable.svelte';
	import { isNewApp } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	import { DialogModal, Notifications } from '@edwinspire/svelte-components';
	import SelectEnvironment from '$lib/OpenFusionAPI/Application/widgets/common/Select.svelte';
	import { Environment as environment_list } from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import { onDestroy, onMount } from 'svelte';

	let noty = new Notifications();

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

	let env_dev = $derived.by(() => {
		return DataAppVars && Array.isArray(DataAppVars)
			? DataAppVars.filter((item) => {
					return item.environment == 'dev';
				})
			: [];
	});

	let env_qa = $derived.by(() => {
		return DataAppVars && Array.isArray(DataAppVars)
			? DataAppVars.filter((item) => {
					return item.environment == 'qa';
				})
			: [];
	});

	let env_prd = $derived.by(() => {
		return DataAppVars && Array.isArray(DataAppVars)
			? DataAppVars.filter((item) => {
					return item.environment == 'prd';
				})
			: [];
	});

	let available_environments_list = $derived.by(() => {
		return environment_list && Array.isArray(environment_list)
			? environment_list.filter((el) => {
					//console.log('>>>>>>>>>>>>><', el, environment);
					return el.id != var_to_copy.environment;
				})
			: [];
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

	let reloadVarsTimeout;
	function handleServerModelChanged(change) {
		if (change && change.model === 'ofapi_appvars' && change.idapp === idapp) {
			clearTimeout(reloadVarsTimeout);
			reloadVarsTimeout = setTimeout(async () => {
				await GetData();
			}, 300);
		}
	}

	onDestroy(() => {
		clearTimeout(reloadVarsTimeout);
	});

	$effect(() => {
		handleServerModelChanged($storeServerModelChanged);
	});

	function resetValues() {
		app = { idapp: 0, vars: {} };
	}

	async function SaveAppVarCopyReplace() {
		try {
			let payload = [
				{
					idappvar: var_to_copy.idvar,
					target_env: var_to_copy.env_destination
				}
			];

			let migrate_data = await migrateAppVars(payload);

			if (Array.isArray(migrate_data) && migrate_data.length > 0) {
				let result = migrate_data[0];
				if (result.status === 'success') {
					noty.push({
						message: result.message || `Variable ${var_to_copy.name} successfully migrated/replaced in the ${var_to_copy.env_destination} environment`,
						color: 'success'
					});
				} else if (result.status === 'ignored') {
					noty.push({
						message: result.message || `Variable ${var_to_copy.name} is already in the ${var_to_copy.env_destination} environment`,
						color: 'info'
					});
				} else {
					noty.push({
						message: `Variable ${var_to_copy.name} could not be migrated: ${result.message || result.status}`,
						color: 'danger'
					});
				}
			} else {
				noty.push({
					message: `Unexpected response migrating variable ${var_to_copy.name}`,
					color: 'danger'
				});
			}
		} catch (error) {
			console.error(error);
			noty.push({
				message: `Error migrating variable: ${error.message}`,
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
</script>

<div>
	{#if environment == 'dev' || environment == '*'}
		<div class="column">
			<VarEnv
				bind:idapp
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
				bind:idapp
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
				bind:idapp
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
		if (var_to_copy.idvar_destination && !var_replace_copy) {
			noty.push({
				message: 'You must agree to replace the variable.',
				color: 'danger'
			});
			return;
		}
		//
		await SaveAppVarCopyReplace();
		ShowDialogCopyEndpoint = false;
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

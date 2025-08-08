<script>
	import { onMount } from 'svelte';
	import { BasicSelect, DialogModal, Level, Input } from '@edwinspire/svelte-components';
	import SelectEnvironment from '../../../widgets/Select.svelte';
	import MethodSelect from '$lib/OpenFusionAPI/app/widgets/methods_select.svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import {
		url_paths,
		userStore,
		validateURL,
		listHandlerStore,
		createEndpoint,
		listAccessMethod
	} from '../../../utils.js';

	let {
		environment_list = $bindable([]),
		row = $bindable({ method: 'X', access: 0 }),
		app = $bindable({}),
		validateResource = $bindable(false),
		availableURL = $bindable(false),
		oncopy = () => {}
	} = $props();

	let handlers = $state([]);

	let uf = new uFetch();

	let ShowDialogCopyEndpoint = $state(false);
	//let ShowDialogCopyEndpointError = $state('');

	function defaultValues() {
		if (!row) {
			row = { method: 'X', access: 0 };
		}

		if (row && row.access == undefined) {
			row.access = 0;
		}
	}

	let available_environments_list = $derived.by(() => {
		return environment_list.filter((el) => {
			//console.log(el, row.environment);
			return el.id != row.environment;
		});
	});

	let endpoint_copied = $state();
	let endpoint_env_copy = $state('');
	let endpoint_replace_copy = $state(false);

	listHandlerStore.subscribe((/** @type {any[]} */ value) => {
		handlers = value;
	});

	userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	$effect(() => {
		// console.log('::::::::::..> Row', row);
		validateResource = validateURL(row.resource);

		availableURL = checkEndpointConstraint();

		row.endpoint = createEndpoint(row.method, app.app, row.resource, row.environment);
	});

	function checkEndpointConstraint() {
		let check = false;
		if (app?.endpoints) {
			check = app.endpoints.some((r) => {
				return (
					row.resource == r.resource &&
					row.environment == r.environment &&
					row.method == r.method &&
					row.idendpoint != r.idendpoint
				);
			});
		}
		return !check;
	}

	async function getEnvList() {
		// Lógica de autenticación aquí

		try {
			let env_list_resp = await uf.GET({ url: url_paths.listEnv });
			let env_list = await env_list_resp.json();

			if (env_list && Array.isArray(env_list) && env_list.length > 0) {
				environment_list = env_list.map((item) => {
					return { id: item.id, value: item.text };
				});
			} else {
				environment_list = [];
			}
		} catch (error) {
			alert(error.message);
		}
	}

	onMount(async () => {
		console.log('onMount endpoint');
		endpoint_copied = {};
		defaultValues();
		await getEnvList();
	});
</script>

<div>
	<Level left={[enabled_endpoint]} right={[copy_endpoint]}>
		{#snippet enabled_endpoint()}
			<Input label="Enabled" type="checkbox" bind:value={row.enabled} placeholder="Enabled" />
		{/snippet}

		{#snippet copy_endpoint()}
			{#if row.idendpoint && row.idendpoint.length > 0}
				<div class="field has-addons">
					<p class="control">
						<button
							class="button is-small is-warning"
							onclick={() => {
								//console.log('<<<<<<<<<<<<---- ', $state.snapshot(app));
								ShowDialogCopyEndpoint = true;
							}}
						>
							<span class="icon is-small">
								<i class="fa-solid fa-copy"></i>
							</span>
							<span>Copy endpoint to</span>
						</button>
					</p>
				</div>
			{/if}
		{/snippet}
	</Level>

	<input class="input" type="hidden" placeholder="Name" bind:value={row.idendpoint} />

	<div class="field is-expanded">
		<div class="field has-addons">
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> API Resource: </a>
			</p>
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static">
					{row.method == 'WS' ? '/ws/' : '/api/'}{app.app}
				</a>
			</p>
			<p class="control is-expanded">
				<input
					class="input is-small"
					type="text"
					placeholder="Resourse"
					bind:value={row.resource}
				/>
			</p>
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> / </a>
			</p>
			<p class="control">
				{#if row && row.environment}
					<SelectEnvironment
						bind:options={environment_list}
						bind:option={row.environment}
						onselect={(e) => {}}
					/>
				{/if}
			</p>
		</div>
		<div class="help">
			{#if validateResource}
				<div class="icon-text is-small">
					<span class="icon has-text-success">
						<i class="fas fa-check-square"></i>
					</span>
					<span>Url Success</span>
				</div>
			{:else}
				<div class="icon-text is-small">
					<span class="icon has-text-danger">
						<i class="fas fa-ban"></i>
					</span>
					<span>Url Invalid</span>
				</div>
			{/if}

			{#if validateResource && availableURL}
				<div class="icon-text is-small">
					<span class="icon has-text-success">
						<i class="fas fa-check-square"></i>
					</span>
					<span>Available URL</span>
				</div>
			{:else if validateResource && !availableURL}
				<div class="icon-text is-small">
					<span class="icon has-text-danger">
						<i class="fas fa-ban"></i>
					</span>
					<span>Url not available</span>
				</div>
			{/if}
		</div>
	</div>

	<hr class="" />

	<div class="fixed-grid has-2-cols">
		<div class="grid">
			<div class="cell">
				{#if row?.method}
					<MethodSelect bind:option={row.method}></MethodSelect>
				{/if}
			</div>

			<div class="cell">
				{#if row}
					<BasicSelect
						label="Access"
						options={listAccessMethod}
						bind:option={row.access}
						onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('Row', row);
						}}
					/>
				{/if}
			</div>

			<div class="cell">
				{#if row?.handler}
					<BasicSelect
						label="Handler"
						bind:options={handlers}
						bind:option={row.handler}
						onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('Row', e);
							if (e.value == 'MCP') {
								row.method = 'POST';
							}
						}}
					/>
				{/if}
			</div>

			<div class="cell">
				<div class="field">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field is-expanded">
								<div class="field has-addons">
									<p class="control">
										<!-- svelte-ignore a11y_missing_attribute -->
										<a class="button is-small is-static"> Timeout Cache: </a>
									</p>
									<p class="control">
										<input
											class="input is-small"
											type="number"
											min="0"
											step="1"
											bind:value={row.cache_time}
										/>
									</p>
									<p class="control">
										<!-- svelte-ignore a11y_missing_attribute -->
										<a class="button is-small is-static"> seconds. </a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="field">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label is-small">Description</label>
		<div class="control">
			<textarea class="textarea is-small" placeholder="Textarea" bind:value={row.description}
			></textarea>
		</div>
	</div>
</div>

<DialogModal
	bind:show={ShowDialogCopyEndpoint}
	title={titleModal}
	body={bodyDialogModal}
	onaccept={() => {
		//console.log(app);
		let eps = [...app.endpoints];

		if (endpoint_copied && endpoint_copied.idendpoint) {
			// Se reemplaza en endpoint
			eps = eps.map((ep) => {
				if (ep.idendpoint == endpoint_copied.idendpoint) {
					//console.log('----------------------------', endpoint_copied);
					ep = { ...endpoint_copied };
				}
				return ep;
			});
		} else {
			// Se agrega el endpoint
			eps.push(endpoint_copied);
		}

		if (endpoint_env_copy != '') {
			//	console.log('>>>>< ', eps.length);
			oncopy($state.snapshot(eps));
			ShowDialogCopyEndpoint = false;
		}
	}}
>
	{#snippet titleModal()}
		<span>Copy endpoint to...</span>
	{/snippet}

	{#snippet bodyDialogModal()}
		<div>
			Copy the endpoint to another environment including all configuration and testing parameters.
		</div>
		<br />

		<div class="field has-addons">
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> Copy to: </a>
			</p>

			<p class="control">
				<SelectEnvironment
					options={available_environments_list}
					bind:option={endpoint_env_copy}
					onchange={(e) => {
						//			console.log('SSSSSSSSSSSS> ', $state.snapshot(app));
						if (app && app.endpoints) {
							let endpoint_find = app.endpoints.find((ep) => {
								//console.log('-------> ', ep.environment, endpoint_env_copy);
								return (
									ep.environment == endpoint_env_copy &&
									ep.handler == row.handler &&
									ep.method == row.method &&
									ep.resource == row.resource
								);
							}); //

							endpoint_copied = { ...row };
							endpoint_copied.environment = endpoint_env_copy;
							endpoint_copied.idendpoint = null;
							endpoint_copied.endpoint = createEndpoint(
								endpoint_copied.method,
								app.app,
								endpoint_copied.resource,
								endpoint_copied.environment
							);
							if (endpoint_find) {
								// Existe ya un endpoint, avisar al usuario si lo quiere reemplazar
								//endpoint_copied.environment = endpoint_env_copy;
								endpoint_copied.idendpoint = endpoint_find.idendpoint;
							}
							//	console.log('zzzzzzzzzzzzzzz ', endpoint_copied);
							//console.log($state.snapshot(endpoint_copied));
						} else {
							endpoint_copied = {};
						}
					}}
				/>
			</p>
		</div>

		<!-- svelte-ignore block_empty -->
		{#if endpoint_copied && endpoint_copied.idendpoint && endpoint_copied.idendpoint.length > 0}
			<label class="checkbox">
				<input type="checkbox" bind:checked={endpoint_replace_copy} />
				I agree to replace all data on the endpoint.
			</label>

			{#if !endpoint_replace_copy}
				<br />
				<div class="icon-text">
					<span class="icon has-text-warning">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span>You are required to accept the replacement in order to continue. </span>
				</div>
			{/if}
		{/if}

		{#if endpoint_env_copy == ''}
			<div class="icon-text">
				<span class="icon has-text-warning">
					<i class="fas fa-exclamation-triangle"></i>
				</span>
				<span>Select an environment to copy. </span>
			</div>
		{/if}

		<br />
		<div class="">If you use application variables you must copy or create them individually.</div>
	{/snippet}
</DialogModal>

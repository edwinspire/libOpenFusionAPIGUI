<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		BasicSelect,
		DialogModal,
		Level,
		Input,
		Notifications
	} from '@edwinspire/svelte-components';
	import SelectEnvironment from '$lib/OpenFusionAPI/Application/widgets/common/Select.svelte';
	import MethodSelect from '$lib/OpenFusionAPI/Application/widgets/common/methods_select.svelte';
	import { listHandlerStore, userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { validateURL, createEndpoint } from '$lib/OpenFusionAPI/Application/utils/utils.js';
	//import SaveDeploy from '$lib/OpenFusionAPI/Application/widgets/common/saveDeploy.svelte';
	import {
		listAccessMethod,
		Environment
	} from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import { EndpointSave } from '$lib/OpenFusionAPI/Application/utils/request.js';

	let {
		endpoint = $bindable({ method: 'X', access: 0, handler: '?', environment: '?' }),
		app = $bindable({}),
		validateResource = $bindable(false),
		availableURL = $bindable(false),
		oncopy = () => {}
	} = $props();

	let notify = new Notifications();
	let environment_list = $state(Environment);
	let handlers = $state([]);
	let new_keyword = $state('');

	let ShowDialogCopyEndpoint = $state(false);
	//let ShowDialogCopyEndpointError = $state('');

	let list_keywords = $derived.by(() => {
		return endpoint && endpoint.keywords ? endpoint.keywords.split(',') : [];
	});

	function defaultValues() {
		if (!endpoint) {
			endpoint = { method: 'X', access: 0 };
		}

		if (endpoint && endpoint.access == undefined) {
			endpoint.access = 0;
		}
	}

	let available_environments_list = $derived.by(() => {
		return environment_list && Array.isArray(environment_list)
			? environment_list.filter((el) => {
					//console.log(el, endpoint.environment);
					return el.id != endpoint.environment;
				})
			: [];
	});

	let endpoint_copied = $state();
	let endpoint_env_copy = $state('');
	let endpoint_replace_copy = $state(false);

	const unsubscribe = listHandlerStore.subscribe((/** @type {any[]} */ value) => {
		handlers = value;
	});

	$effect(() => {
		endpoint;
		// console.log('::::::::::..> endpoint', endpoint);
		validateResource = validateURL(endpoint.resource);
		availableURL = checkEndpointConstraint();
		endpoint.endpoint = createEndpoint(
			endpoint.method,
			app.app,
			endpoint.resource,
			endpoint.environment
		);
	});

	onDestroy(unsubscribe);

	function checkEndpointConstraint() {
		let check = false;
		if (app?.endpoints) {
			check = app.endpoints.some((r) => {
				return (
					endpoint.resource == r.resource &&
					endpoint.environment == r.environment &&
					endpoint.method == r.method &&
					endpoint.idendpoint != r.idendpoint
				);
			});
		}
		return !check;
	}

	onMount(async () => {
		console.log('onMount endpoint');
		endpoint_copied = {};
		defaultValues();
		//await getEnvList();
	});
</script>

<div>
	<Level left={[enabled_endpoint]} right={[copy_endpoint]}>
		{#snippet enabled_endpoint()}
			<Input label="Enabled" type="checkbox" bind:value={endpoint.enabled} placeholder="Enabled" />
			<Input label="Title" type="text" bind:value={endpoint.title} placeholder="Title" />
		{/snippet}

		{#snippet copy_endpoint()}
			{#if endpoint.idendpoint && endpoint.idendpoint.length > 0}
				<div class="field has-addons">
					<p class="control">
						<button
							class="button is-small is-info"
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

	<input class="input" type="hidden" placeholder="Name" bind:value={endpoint.idendpoint} />

	<div class="field is-expanded">
		<div class="field has-addons">
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> API Resource: </a>
			</p>
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static">
					{endpoint.method == 'WS' ? '/ws/' : '/api/'}{app.app}
				</a>
			</p>
			<p class="control is-expanded">
				<input
					class="input is-small"
					type="text"
					placeholder="Resourse"
					disabled={endpoint.handler == 'MCP'}
					bind:value={endpoint.resource}
				/>
			</p>
			<p class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> / </a>
			</p>
			<p class="control">
				{#if endpoint && endpoint.environment}
					<SelectEnvironment
						bind:options={environment_list}
						bind:option={endpoint.environment}
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
				{#if endpoint?.handler}
					<BasicSelect
						label="Handler"
						bind:options={handlers}
						bind:option={endpoint.handler}
						onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('endpoint', e);
							if (e.value == 'MCP') {
								endpoint.method = 'POST';
								endpoint.resource = '/mcp/server';
							} else if (e.value == 'AGENT_IA') {
								endpoint.method = 'POST';
							} else if (e.value == 'TELEGRAM_BOT') {
								endpoint.method = 'POST';
							}
						}}
					/>
				{/if}
			</div>

			<div class="cell">
				{#if endpoint && endpoint.access !== undefined}
					<BasicSelect
						label="Access"
						options={listAccessMethod}
						bind:option={endpoint.access}
						onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('endpoint', endpoint);
						}}
					/>
				{/if}
			</div>

			<div class="cell">
				{#if endpoint?.method}
					<MethodSelect bind:option={endpoint.method}></MethodSelect>
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
											bind:value={endpoint.cache_time}
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

			<div class="cell">
				<div class="field">
					<div class="field is-horizontal">
						<div class="field-body">
							<div class="field is-expanded">
								<div class="field has-addons">
									<p class="control">
										<!-- svelte-ignore a11y_missing_attribute -->
										<a class="button is-small is-static"> Timeout Endpoint: </a>
									</p>
									<p class="control">
										<input
											class="input is-small"
											type="number"
											min="0"
											step="1"
											bind:value={endpoint.timeout}
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

	<hr class="" />

	<div class="field">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label is-small">Keywords</label>
		<div class="control">
			<Input
				bind:value={new_keyword}
				label="Add Keyword"
				onchange={() => {
					//alert('add keyword ' + new_keyword);
					if (new_keyword && new_keyword.trim().length > 0) {
						let keywords_array = endpoint.keywords
							? endpoint.keywords.split(',').map((k) => k.trim())
							: [];
						if (!keywords_array.includes(new_keyword.trim())) {
							keywords_array.push(new_keyword.trim());
							endpoint.keywords = keywords_array.join(',');
						}
						new_keyword = '';
					}
				}}
			></Input>
			<div class="field is-grouped is-grouped-multiline">
				{#each list_keywords as kw}
					<div class="control">
						<div class="tags has-addons">
							<!-- svelte-ignore a11y_missing_attribute -->
							<a class="tag">{kw}</a>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<!-- svelte-ignore a11y_missing_attribute -->
							<a
								class="tag is-delete is-danger"
								onclick={() => {
									let keywords_array = endpoint.keywords
										? endpoint.keywords.split(',').map((k) => k.trim())
										: [];

									keywords_array = keywords_array.filter((k) => k != kw);
									endpoint.keywords = keywords_array.join(',');
								}}
							></a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<hr class="" />

	<div class="field">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label is-small">Description</label>
		<div class="control">
			<textarea class="textarea is-small" placeholder="Textarea" bind:value={endpoint.description}
			></textarea>
		</div>
	</div>
</div>

<DialogModal
	bind:show={ShowDialogCopyEndpoint}
	title={titleModal}
	body={bodyDialogModal}
	onaccept={async () => {
		//console.log($state.snapshot(endpoint), $state.snapshot(endpoint_copied));
		//let eps = [...app.endpoints];
		if (endpoint_replace_copy) {
			if ((endpoint_env_copy = !'')) {
				try {
					let result = await EndpointSave(endpoint_copied);
					//console.log('EndpointSave result:', result, app);
					if (result && result.result && result.result.idapp == app.idapp) {
						oncopy(result.result);
						notify.push({
							message: 'Copied successfully to ' + endpoint_env_copy,
							color: 'success'
						});
					} else {
						notify.push({
							message: 'Error copying endpoint: ' + (result.message || 'Unknown error'),
							color: 'danger'
						});
					}
				} catch (error) {
					console.error('Error copying endpoint: ', error);
					notify.push({ message: 'Error copying endpoint: ' + error.message, color: 'danger' });
				}

				ShowDialogCopyEndpoint = false;
			}
		} else {
			notify.push({
				message: 'You must accept overwriting the endpoint data.',
				color: 'success'
			});
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
									ep.handler == endpoint.handler &&
									ep.method == endpoint.method &&
									ep.resource == endpoint.resource
								);
							}); //

							endpoint_copied = { ...endpoint };
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

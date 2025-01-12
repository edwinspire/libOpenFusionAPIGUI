<script>
	import { onMount } from 'svelte';
	import { BasicSelect } from '@edwinspire/svelte-components';
	import SelectEnvironment from '../../../widgets/Select.svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import {
		url_paths,
		userStore,
		validateURL,
		listHandlerStore,
		createEndpoint,
		listMethodStore,
		listAccessMethod
	} from '../../../utils.js';

	let {
		environment_list = $bindable([]),
		row = $bindable({ method: 'X', access: 0 }),
		app = $bindable({}),
		validateResource = $bindable(false),
		availableURL = $bindable(false)
	} = $props();

	let handlers = $state([]);
	let methods = $state([]);

	let uf = new uFetch();
	let timeoutResource;

	$inspect(row).with((type) => {
		if (type === 'init') {
			defaultValues();
		}
	});

	$inspect(row.resource).with((type) => {
		if (type === 'update') {
			clearTimeout(timeoutResource);
			timeoutResource = setTimeout(() => {
				checkResource();
			}, 500);
		}
	});

	function defaultValues() {
		if (!row) {
			row = { method: 'X', access: 0 };
		}

		if (row && row.access == undefined) {
			row.access = 0;
		}
	}

	listHandlerStore.subscribe((/** @type {any[]} */ value) => {
		handlers = value;
	});

	userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	listMethodStore.subscribe((value) => {
		methods = value;
	});

	function checkResource() {
		validateResource = validateURL(row.resource);

		availableURL = checkEndpointConstraint();

		row.endpoint = createEndpoint(row.method, app.app, row.resource, row.environment);
	}

	function checkEndpointConstraint() {
		let check = app.endpoints.some((r) => {
			return (
				row.resource == r.resource &&
				row.environment == r.environment &&
				row.method == r.method &&
				row.idendpoint != r.idendpoint
			);
		});
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
		await getEnvList();
	});
</script>

<div>
	<input class="input" type="hidden" placeholder="Name" bind:value={row.idendpoint} />

	<div class="field is-horizontal">
		<div class="field-label is-small">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label">Enabled</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" bind:checked={row.enabled} />
					</label>
				</div>
			</div>
		</div>
	</div>

	<div class="field is-horizontal">
		<div class="field-label is-small">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label">Method</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					{#if row && row.method}
						<BasicSelect
							bind:options={methods}
							bind:option={row.method}
							onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
								console.log('Row', row);
							}}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="field is-horizontal">
		<div class="field-label is-small">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label">Access</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					{#if row}
						<BasicSelect
							options={listAccessMethod}
							bind:option={row.access}
							onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
								console.log('Row', row);
							}}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="field is-horizontal">
		<div class="field-label is-small">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="label">Handler</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					{#if row && row.handler}
						<BasicSelect
							bind:options={handlers}
							bind:option={row.handler}
							onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
								console.log('Row', row);
							}}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="field">
		<div class="field is-horizontal">
			<div class="field-label is-small"><strong> API Resource: </strong></div>
			<div class="field-body">
				<div class="field is-expanded">
					<div class="field has-addons">
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

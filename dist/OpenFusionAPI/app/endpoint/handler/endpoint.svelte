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

	export let row = {};
	export let app = {};
	export let environment_list = [];
	export let endpoints = [];

	//const dispatch = createEventDispatcher();
	export let validateResource = false;
	export let availableURL = false;
	let handlers = [];
	let methods = [];

	let uf = new uFetch();

	$: row.resource, checkResource();

	listHandlerStore.subscribe((/** @type {any[]} */ value) => {
		//console.log('listMethodStore ->>>>', value);
		// @ts-ignore
		handlers = value;
	});

	userStore.subscribe((value) => {
		// console.log('tokenStore ->>>>', value);
		// @ts-ignore
		uf.setBearerAuthorization(value.token);
	});

	listMethodStore.subscribe((value) => {
		//console.log('listMethodStore ->>>>', value);
		// @ts-ignore
		methods = value;
	});

	function checkResource() {
		// @ts-ignore
		validateResource = validateURL(row.resource);
		//		console.log('validateURL: ', SelectedRow.resource, validateResource);

		availableURL = checkEndpointConstraint();

		row.endpoint = createEndpoint(row.method, app.app, row.resource, row.environment);
	}

	function checkEndpointConstraint() {
		//console.log('checkEndpointConstraint => ', endpoints, row, app);

		let check = endpoints.some((r) => {
			//	console.log(endpoint_value, row);
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
			//      console.log("getListApps > ", $userStore, uf);

			let env_list_resp = await uf.GET({ url: url_paths.listEnv });
			let env_list = await env_list_resp.json();
			//console.log(apps);

			if (env_list && Array.isArray(env_list) && env_list.length > 0) {
				environment_list = env_list.map((item) => {
					return { id: item.id, value: item.text };
				});
			} else {
				environment_list = [];
			}
		} catch (error) {
			// @ts-ignore
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
			<!-- svelte-ignore a11y-label-has-associated-control -->
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
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">Method</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					<BasicSelect
						bind:options={methods}
						bind:option={row.method}
						on:select={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('Row', row);
						}}
					/>
				</div>
			</div>
		</div>
	</div>


	<div class="field is-horizontal">
		<div class="field-label is-small">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">Access</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					<BasicSelect
						options={listAccessMethod}
						bind:option={row.access}
						on:select={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('Row', row);
						}}
					/>
				</div>
			</div>
		</div>
	</div>



	<div class="field is-horizontal">
		<div class="field-label is-small">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">Handler</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control">
					<BasicSelect
						bind:options={handlers}
						bind:option={row.handler}
						on:select={(/** @type {{ detail: { value: string; }; }} */ e) => {
							console.log('Row', row);
						}}
					/>
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
							<!-- svelte-ignore a11y-missing-attribute -->
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
							<!-- svelte-ignore a11y-missing-attribute -->
							<a class="button is-small is-static"> / </a>
						</p>
						<p class="control">
							<SelectEnvironment
								bind:options={environment_list}
								bind:option={row.environment}
								on:select={(e) => {
									//	console.log(e);
								}}
							/>
						</p>
					</div>
					<p class="help">
						{#if validateResource}
							<div class="icon-text is-small">
								<span class="icon has-text-success">
									<i class="fas fa-check-square" />
								</span>
								<span>Url Success</span>
							</div>
						{:else}
							<div class="icon-text is-small">
								<span class="icon has-text-danger">
									<i class="fas fa-ban" />
								</span>
								<span>Url Invalid</span>
							</div>
						{/if}

						{#if validateResource && availableURL}
							<div class="icon-text is-small">
								<span class="icon has-text-success">
									<i class="fas fa-check-square" />
								</span>
								<span>Available URL</span>
							</div>
						{:else if validateResource && !availableURL}
							<div class="icon-text is-small">
								<span class="icon has-text-danger">
									<i class="fas fa-ban" />
								</span>
								<span>Url not available</span>
							</div>
						{/if}
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="field">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label is-small">Description</label>
		<div class="control">
			<textarea class="textarea is-small" placeholder="Textarea" bind:value={row.description} />
		</div>
	</div>
</div>

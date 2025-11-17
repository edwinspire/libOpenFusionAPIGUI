<script>
	import { AppBase } from '@edwinspire/svelte-components';
	import { onDestroy, onMount } from 'svelte';
	import Logo from '$lib/OpenFusionAPI/img/favicon.png';
	import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';
	import {
		userStore,
		storeCacheSize,
		storeEndpointOnComplete,
		storeCountResponseStatusCode,
		storeEndpointOnStart,
		storeServerDynamicInformation
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import uFetch from '@edwinspire/universal-fetch';
	import {
		PredictiveInput,
		OpenFusionWebsocketClient,
		Notifications
	} from '@edwinspire/svelte-components';

	import AppScreen from '$lib/OpenFusionAPI/Application/widgets/basic/basic.svelte';
	import DashBoardScreen from '$lib/OpenFusionAPI/Application/widgets/dashboard/dashboard.svelte';
	import AppVars from '$lib/OpenFusionAPI/Application/widgets/application_variables/index.svelte';
	import Endpoints from '$lib/OpenFusionAPI/Application/widgets/endpoints/index.svelte';
	import IntervalTasks from '$lib/OpenFusionAPI/Application/widgets/interval_tasks/index.svelte';

	let notify = new Notifications();
	let idapp = $state(0);
	let options = $state([]);
	let menu_item_selected = $state('');
	let uf = new uFetch();
	//let AppScreenWidget = $state();
	const wsClient = new OpenFusionWebsocketClient(url_paths.wsServerEvents);

	let menu = $state([
		{
			title: 'Application',
			items: [
				{
					label: 'New',
					icon: ' fa-solid fa-plus ',
					onclick: () => {
						idapp = 0;
						menu_item_selected = '/basic';
						// Aqui resetear todas las variables para evitar que se mesclen los codigos entre aplicaciones
					}
				},
				{
					label: 'Dashboard',
					icon: ' fa-solid fa-chart-area ',
					onclick: () => {
						menu_item_selected = '/dashboard';
					}
				},

				{
					label: 'Basic',
					icon: ' fa-solid fa-file ',
					onclick: () => {
						menu_item_selected = '/basic';
					}
				},
				{
					label: 'Endpoints',
					icon: ' fa-solid fa-share-nodes ',
					onclick: () => {
						menu_item_selected = '/endpoints';
					}
				},
				{
					label: 'Variables',
					icon: ' fa-solid fa-square-root-variable ',
					onclick: () => {
						menu_item_selected = '/appvars';
					}
				},
				{
					label: 'Tasks',
					icon: ' fa-solid fa-list-check ',
					onclick: () => {
						menu_item_selected = '/interval_tasks';
					}
				}
			]
		}
	]);

	userStore.subscribe((value) => {
		uf.setBearerAuthorization(value.token);
	});

	async function getListApps() {
		// Lógica de autenticación aquí

		try {
			let apps_res = await uf.GET({ url: url_paths.apps_get_list });
			let apps = await apps_res.json();

			if (apps && Array.isArray(apps) && apps.length > 0) {
				options = apps.map((item) => {
					return { name: item.app, value: item.idapp };
				});
			} else {
				options = [];
			}
		} catch (error) {
			//alert(error.message);
			console.error(error);
			notify.push({ message: error.message, color: 'danger' });
		}
	}

	onMount(async () => {
		await getListApps();

		notify.push({ message: 'Welcome ', color: 'success' });

		wsClient.connect();
		wsClient.on('open', () => {
			//console.log('WebSocket connected');
			wsClient.subscribe('/server/events');
		});

		wsClient.on('message', (m) => {
			//console.log('WebSocket message', m);

			if (m && m.data?.idapp == idapp) {
				if (m && (m.event_name == 'cache_set' || m.event_name == 'cache_released')) {
				//	console.log('> cache_set ', m);
					storeCacheSize.update((value) => {
						value[m.data.idendpoint] = m.data.cache_size;

						return value;
					});
				} else if (m && m.event_name == 'request_completed') {
					//	console.log('> request_completed ', m);
					let data1 = m.data;
					data1.dateTime = m.timestamp;

					storeEndpointOnComplete.set(data1);
					storeCountResponseStatusCode.update((value) => {
						let new_value = {};
						new_value[m.data.statusCode] = 1;
						if (value[m.data.idendpoint]) {
							new_value[m.data.statusCode] = value[m.data.idendpoint][m.data.statusCode] + 1;
						}

						value[m.data.idendpoint] = new_value;

						//console.log(':::: storeCountResponseStatusCode ', value, m.data);
						return value;
					});
				} else if (m && m.event_name == 'request_start') {
					storeEndpointOnStart.set({ idendpoint: m.data?.idendpoint, ts: new Date() });
				}
			} else if (m && m.event_name == 'system_information') {
				storeServerDynamicInformation.set(m.data);
			}
		});
	});

	onDestroy(() => {
		wsClient.disconnect();
	});
</script>

{#snippet logoIcon()}
	<img src={Logo} alt="Open Fusion API" />
{/snippet}

{#snippet user()}
	<div class="dropdown is-hoverable">
		<div class="dropdown-trigger">
			<button
				class="button is-small is-success is-outlined"
				aria-haspopup="true"
				aria-controls="dropdown-menu3"
			>
				<span class="icon is-small">
					<i class="fa-solid fa-user"></i>
				</span>
				<span> {$userStore?.user?.username}</span>
				<span class="icon is-small">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</button>
		</div>
		<div class="dropdown-menu" role="menu">
			<div class="dropdown-content">
				<a href="https://github.com/edwinspire/OpenFusionAPI" target="_blank" class="dropdown-item">
					<div class="icon-text">
						<span class="icon">
							<i class="fa-brands fa-github"></i>
						</span>
						<span>Github</span>
					</div>
				</a>
				<hr class="dropdown-divider" />

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="dropdown-item"
					onclick={() => {
						location.reload();
					}}
				>
					<div class="icon-text">
						<span class="icon has-text-danger">
							<i class="fa-solid fa-arrow-right-from-bracket"></i>
						</span>
						<span>Logout</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet select_app()}
	<PredictiveInput
		label="Application"
		classLabel="is-small"
		classInput="is-small"
		bind:options
		onselect={async (e) => {
			if ($userStore) {
				idapp = e.value;
				//		alert(e.value);
				//await AppScreenWidget.setData(idapp);
			} else {
				//alert('You do not have authorization');
				notify.push({ message: 'You do not have authorization', color: 'warning' });
			}
		}}
	/>
{/snippet}

<AppBase
	{logoIcon}
	logoText="OpenFusionAPI"
	bind:menu
	topLeftNavBar={[select_app]}
	topRightNavBar={[user]}
>
	{#if menu_item_selected == '/basic'}
		<AppScreen
			{idapp}
			onsavedeploy={async () => {
				await getListApps();
			}}
		></AppScreen>
	{:else if menu_item_selected == '/appvars'}
		<AppVars {idapp}></AppVars>
	{:else if menu_item_selected == '/endpoints'}
		<Endpoints {idapp}></Endpoints>
	{:else if menu_item_selected == '/interval_tasks'}
		<IntervalTasks {idapp}></IntervalTasks>
	{:else}
		<DashBoardScreen {idapp}></DashBoardScreen>
	{/if}</AppBase
>

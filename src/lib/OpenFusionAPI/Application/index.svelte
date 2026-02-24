<script>
	import { AppBase, DialogModal, Input } from '@edwinspire/svelte-components';
	import { onDestroy, onMount } from 'svelte';
	import Logo from '$lib/OpenFusionAPI/img/favicon.png';
	import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';

	import {
		userStore,
		storeCacheSize,
		storeEndpointOnComplete,
		storeCountResponseStatusCode,
		storeEndpointOnStart,
		storeServerDynamicInformation,
		statusSystemEndpointsStore
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';

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
	import ApiKeys from '$lib/OpenFusionAPI/Application/widgets/apikeys/index.svelte';
	import {
		getListApps,
		changeUserPassword,
		restoreSystemEndpoints
	} from '$lib/OpenFusionAPI/Application/utils/request.js';

	let notify = new Notifications();
	let idapp = $state(0);
	let options = $state([]);
	let menu_item_selected = $state('');
	let show_dialog_change_pwd = $state(false);
	const wsClient = new OpenFusionWebsocketClient(url_paths.wsServerEvents);
	const defaultPasswordChange = {
		username: '',
		oldPassword: '',
		newPassword: '',
		repeatNewPassword: ''
	};

	let password_change = $state(defaultPasswordChange);

	let changepwd_compare_verify = $derived.by(() => {
		return password_change.newPassword == password_change.repeatNewPassword;
	});

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
					icon: ' fa-solid fa-network-wired ',
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
					label: 'API Keys',
					icon: ' fa-solid fa-key ',
					onclick: () => {
						menu_item_selected = '/apikeys';
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

	async function getListAppsInternal() {
		try {
			let apps = await getListApps($userStore.token);
			if (apps && Array.isArray(apps) && apps.length > 0) {
				options = apps.map((item) => {
					return { name: item.app, value: item.idapp };
				});
			} else {
				options = [];
			}

			let status_sys_endp = await restoreSystemEndpoints(false, $userStore.token);
			statusSystemEndpointsStore.set(status_sys_endp);
		} catch (error) {
			console.error(error);
			notify.push({ message: error.message, color: 'danger' });
		}
	}

	onMount(async () => {
		await getListAppsInternal();

		notify.push({ message: 'Welcome ', color: 'success' });

		wsClient.connect();
		wsClient.on('open', () => {
			wsClient.subscribe('/server/events');
		});

		wsClient.on('message', (m) => {
			if (m && m.data?.idapp == idapp) {
				if (m && (m.event_name == 'cache_set' || m.event_name == 'cache_released')) {
					storeCacheSize.update((value) => {
						value[m.data.idendpoint] = m.data.size.endpoint;

						return value;
					});
				} else if (m && m.event_name == 'request_completed') {
					let data1 = m.data;
					data1.dateTime = m.timestamp;

					storeEndpointOnComplete.set(data1);

					storeCountResponseStatusCode.update((value) => {
						if (value[m.data.idendpoint] === undefined) {
							value[m.data.idendpoint] = {};
						}

						let current = value?.[m.data.idendpoint]?.[m.data.statusCode];
						value[m.data.idendpoint][m.data.statusCode] =
							current !== undefined && current !== null ? Number(current) + 1 : 1;

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
		wsClient.close();
	});
</script>

{#snippet logoIcon()}
	<img src={Logo} alt="Open Fusion API" />
{/snippet}

{#snippet user()}
	<div class="dropdown is-hoverable">
		<div class="dropdown-trigger">
			<button
				title={$statusSystemEndpointsStore.message}
				class="button is-small {$statusSystemEndpointsStore.valid ? '' : 'is-danger'} "
				aria-haspopup="true"
				aria-controls="dropdown-menu3"
			>
				<span class="icon is-small">
					{#if $statusSystemEndpointsStore.valid}
						<i class="fa-solid fa-check"></i>
					{:else}
						<i class="fa-solid fa-triangle-exclamation fa-fade"></i>
					{/if}
				</span>
				<span> System Endpoints {$statusSystemEndpointsStore.valid ? 'Ready' : 'Error'} </span>
				<span class="icon is-small">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</button>
		</div>
		<div class="dropdown-menu" role="menu">
			<div class="dropdown-content">
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					href="#"
					class="dropdown-item"
					onclick={async () => {
						let status_sys_endp = await restoreSystemEndpoints(true, $userStore.token);
						statusSystemEndpointsStore.set(status_sys_endp);
					}}
				>
					<div class="icon-text">
						<span class="icon">
							<i class="fa-solid fa-rotate-left"></i>
						</span>
						<span> Restore </span>
					</div>
				</a>
			</div>
		</div>
	</div>
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
				<!-- svelte-ignore a11y_invalid_attribute -->
				<a
					href="#"
					class="dropdown-item"
					onclick={() => {
						show_dialog_change_pwd = true;
						password_change = { ...defaultPasswordChange };
						password_change.username = $userStore?.user?.username || '';
					}}
				>
					<div class="icon-text">
						<span class="icon">
							<i class="fa-solid fa-key"></i>
						</span>
						<span>Password</span>
					</div>
				</a>

				<hr class="dropdown-divider" />

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
			} else {
				notify.push({ message: 'You do not have authorization', color: 'warning' });
			}
		}}
	/>
{/snippet}

<AppBase
	{logoIcon}
	logoText="OpenFusionAPI"
	{menu}
	topLeftNavBar={[select_app]}
	topRightNavBar={[user]}
>
	{#if menu_item_selected == '/basic'}
		<AppScreen
			{idapp}
			onsavedeploy={async () => {
				await getListAppsInternal();
			}}
		></AppScreen>
	{:else if menu_item_selected == '/appvars'}
		<AppVars {idapp}></AppVars>
	{:else if menu_item_selected == '/endpoints'}
		<Endpoints {idapp}></Endpoints>
	{:else if menu_item_selected == '/interval_tasks'}
		<IntervalTasks {idapp}></IntervalTasks>
	{:else if menu_item_selected == '/apikeys'}
		<ApiKeys bind:idapp={idapp}></ApiKeys>
	{:else}
		<DashBoardScreen {idapp}></DashBoardScreen>
	{/if}</AppBase
>

<DialogModal
	title={titleModal}
	body={bodyDialogModal}
	onaccept={async () => {
		if (password_change.newPassword == password_change.repeatNewPassword) {
			let result = await changeUserPassword(password_change, $userStore.token);
			if (result.success) {
				password_change = { ...defaultPasswordChange };
				show_dialog_change_pwd = false;
				notify.push({ message: 'Successful update', color: 'success' });
			} else {
				notify.push({ message: result.error, color: 'danger' });
			}
		} else {
			notify.push({ message: 'You must repeat the new password twice.', color: 'danger' });
		}
	}}
	oncancel={() => {
		password_change = { ...defaultPasswordChange };
	}}
	bind:show={show_dialog_change_pwd}
>
	{#snippet titleModal()}
		<span>{`Change Password: ${password_change.username}`}</span>
	{/snippet}

	{#snippet bodyDialogModal()}
		<Input label="Current password" type="password" bind:value={password_change.oldPassword}
		></Input>
		<Input label="New Password" type="password" bind:value={password_change.newPassword}></Input>
		<Input
			label="Repeat new Password"
			type="password"
			bind:value={password_change.repeatNewPassword}
		></Input>
		<div>
			{#if !changepwd_compare_verify}
				<span class="icon-text has-text-warning is-small">
					<span class="icon">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
					<span>You must repeat the new password twice.</span>
				</span>
			{/if}
		</div>
	{/snippet}
</DialogModal>

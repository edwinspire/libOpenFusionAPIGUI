<script>
	import { storeUsersList } from '../../../utils.js';
	//	import uFetch from '@edwinspire/universal-fetch';
	import { onMount, createEventDispatcher } from 'svelte';
	import { Table, ColumnTypes } from '@edwinspire/svelte-components';
	import EndpointLabel from '../widgets/endpoint_label.svelte';

	export let row = {};
	export let users = {};
	let table_users = [];
	let data_users = [];

	let columns = {
		auth: {
			label: 'Authorization',
			decorator: {
				component: ColumnTypes.BooleanIcon,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: true
				}
			}
		},
		iduser: { label: 'iduser', hidden: true },
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.BooleanIcon,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: true
				}
			}
		},
		name: { label: 'name' },
		username: { label: 'username' },
		email: { label: 'email' }
	};
	$: users, getUsers();
	$: table_users, authChange();

	storeUsersList.subscribe((value) => {
		//	console.log('storeUsersList >>>>>> ', value);
		data_users = value;
	});

	function defaultValue() {
		if (!users) {
			users = [];
		}
	}

	function authChange() {
		defaultValue();

		if (users) {
			//	console.log('authChange > ', table_users, row);

			users = table_users
				.filter((u) => {
					return u.auth;
				})
				.map((u) => {
					return u.iduser;
				});

			//	console.log('auth_enabled >> ', row.ctrl.users);
		}
	}

	function getUsers() {
		defaultValue();
		if (data_users && Array.isArray(data_users)) {
			table_users = data_users.map((u) => {
				return { auth: users.includes(u.iduser), ...u };
			});
		}
	}

	onMount(async () => {
		//		await getEnvList();
		//	await getUsers();
	});
</script>

<EndpointLabel bind:endpoint={row.endpoint}></EndpointLabel>
<Table bind:RawDataTable={table_users} bind:columns></Table>

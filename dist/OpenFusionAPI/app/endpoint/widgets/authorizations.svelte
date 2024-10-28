<script>
	import { url_paths, storeUsersList } from '../../../utils.js';
	import uFetch from '@edwinspire/universal-fetch';
	import { onMount, createEventDispatcher } from 'svelte';
	import { Table, ColumnTypes } from '@edwinspire/svelte-components';

	export let row = {};
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
		iduser: { label: 'iduser' },
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
	$: row.crtl, getUsers();
	$: table_users, authChange();

	storeUsersList.subscribe((value) => {
		console.log('storeUsersList >>>>>> ', value);
		data_users = value;
	});

	function defaultValue() {
		if (row) {
			if (!row.ctrl) {
				row.ctrl = { users: [] };
			}

			if (!row.ctrl.users) {
				row.ctrl = { users: [] };
			}
		}
	}

	function authChange() {
		if (row) {
			defaultValue();
			console.log('authChange > ', table_users, row);

			row.ctrl.users = table_users
				.filter((u) => {
					return u.auth;
				})
				.map((u) => {
					return u.iduser;
				});

			console.log('auth_enabled >> ', row.ctrl.users);
		}
	}

	function getUsers() {
		defaultValue();
		if (data_users && Array.isArray(data_users)) {
			table_users = data_users.map((u) => {
				return { auth: row.ctrl.users.includes(u.iduser), ...u };
			});
		}
	}

	onMount(async () => {
		//		await getEnvList();
		//	await getUsers();
	});
</script>

<div>{row.endpoint}</div>

<Table bind:RawDataTable={table_users} bind:columns></Table>

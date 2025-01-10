<script>
	import { onMount, onDestroy } from 'svelte';
	import { storeUsersList } from '$lib/OpenFusionAPI/utils.js';
	import { Table, ColumnTypes } from '@edwinspire/svelte-components';

	let { users = $bindable({}) } = $props();

	let table_users = $state([]);
	let data_users = [];

	let columns = $state({
		auth: {
			label: 'Authorization',
			decorator: {
				component: ColumnTypes.Boolean,
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
				component: ColumnTypes.Boolean,
				props: {
					ontrue: { label: 'Enabled' },
					onfalse: { label: 'Unabled' },
					editInline: false
				}
			}
		},
		name: { label: 'name' },
		username: { label: 'username' },
		email: { label: 'email' }
	});

	let timeoutChageAuth;

	$inspect(table_users).with((type) => {
		//console.log('row.code >>>>>>>>>>>>> ', type, row);
		if (type === 'update') {
			clearTimeout(timeoutChageAuth);
			timeoutChageAuth = setTimeout(() => {
				setUsers();
			}, 750);
		}
	});

	storeUsersList.subscribe((value) => {
		//console.log('storeUsersList >>>>>> ', value);
		data_users = value;
		buildTableUsers();
	});

	function defaultValue() {
		if (!users) {
			users = [];
		}
	}

	function setUsers() {
		defaultValue();

		if (users) {
			//	console.log('setUsers > ', table_users, row);

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

	function buildTableUsers() {
		defaultValue();
		//	console.log('buildTableUsers: ', data_users, table_users);
		if (data_users && Array.isArray(data_users)) {
			table_users = data_users.map((u) => {
				return { auth: users.includes(u.iduser), ...u };
			});
			//	console.log('buildTableUsers 2: ', data_users, table_users);
		}
	}

	onMount(() => {
		defaultValue();
	});

	onDestroy(() => {
		clearTimeout(timeoutChageAuth);
	});
</script>

<Table bind:RawDataTable={table_users} bind:columns></Table>

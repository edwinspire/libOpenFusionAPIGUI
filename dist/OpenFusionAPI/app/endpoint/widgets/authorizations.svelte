<script>
	import { onMount, onDestroy } from 'svelte';
	import { storeUsersList } from '../../../utils.js';
	import { Table, ColumnTypes } from '@edwinspire/svelte-components';
	//import { TimeOutChangeValue } from '../../utils.js';

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
/*
	$effect(() => {
		if (table_users) {
			timeoutChageAuth = TimeOutChangeValue(timeoutChageAuth, parseCode);
		}
	});
*/

	storeUsersList.subscribe((value) => {
		data_users = value;
		buildTableUsers();
	});

	function defaultValue() {
		if (users == null) {
			users = [];
		}
	}

	function setUsers() {
		defaultValue();

		if (users) {
			users = table_users
				.filter((u) => {
					return u.auth;
				})
				.map((u) => {
					return u.iduser;
				});
		}
	}

	function buildTableUsers() {
		defaultValue();

		if (data_users && Array.isArray(data_users)) {
			table_users = data_users.map((u) => {
				return { auth: users.includes(u.iduser), ...u };
			});
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

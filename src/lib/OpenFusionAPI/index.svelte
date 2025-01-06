<script>
	import { onMount } from 'svelte';
	import Login from './login/index.svelte';
	import Main from './main/index.svelte';

	let page = 'login';

	onMount(() => {
		//
	});
</script>

{#if page == 'main'}
	<Main
		onexit={() => {
			page = 'login';
		}}
	/>
{:else}
	<Login
		onlogin={(login) => {
			console.log('LOGIN', login);

			if (login) {
				page = 'main';
			} else {
				page = '?';
			}
		}}
	/>
{/if}

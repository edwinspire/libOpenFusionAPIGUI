<script>
	import { onMount } from 'svelte';
	import Login from './login/index.svelte';
	import Main from './main/index.svelte';
	import {Notify} from "@edwinspire/svelte-components";

	let page = 'login';

//let noty = new Notifications();

	onMount(() => {
		//noty.push({message: 'Welcome'});
	});
</script>

<Notify></Notify>

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

<script>

	import { onMount } from 'svelte';
	import App from '../app/index.svelte';

	/**
	 * @type {{ name: any; value: any; }[]}
	 */
	//  let options = [];

	/**
	 * @type {any}
	 */
	let app = {};

	let mainTab = 'app';

	onMount(() => {
		// uf.addHeader(tokenStore.);
		// console.log(userStore);
		// getListApps();
	});
</script>

<div class="box">
	<div class={mainTab == 'app' ? '' : 'is-hidden'}>
		<App bind:idapp={app.idapp} />
	</div>
</div>

<style>
</style>

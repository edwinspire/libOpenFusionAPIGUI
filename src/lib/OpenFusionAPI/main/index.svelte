<script>

	import { onMount } from 'svelte';
	import App from '../app/index.svelte';

	/**
	 * @type {any}
	 */
	let app = $state({idapp: 0});

	let mainTab = $state('app');

	onMount(() => {
		
	});
</script>

<div class="box">
	<div class={mainTab == 'app' ? '' : 'is-hidden'}>
		<App bind:idapp={app.idapp} />
	</div>
</div>


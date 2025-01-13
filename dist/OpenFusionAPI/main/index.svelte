<script>
	import { onMount } from 'svelte';
	import App from '../app/index.svelte';

	/**
	 * @type {any}
	 */
	let app = $state({ idapp: 0 });

	onMount(() => {});
</script>

<div class="box">
	<App bind:idapp={app.idapp} />
</div>

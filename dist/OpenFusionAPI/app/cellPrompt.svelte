<script>
	'use strict';
	import { onMount } from 'svelte';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {
		//	setCSS(value);
	});
</script>

<td>
	<textarea bind:value class="textarea is-small" placeholder="Prompt" rows="2"></textarea>
</td>

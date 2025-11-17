<script>
	'use strict';
	import { onMount } from 'svelte';

	let { value = $bindable(), row = $bindable(), onchangecell = () => {} } = $props();

	onMount(() => {
		//	setCSS(value);
	});
</script>

<td>
	<textarea bind:value class="textarea is-small" placeholder="Prompt" rows="2" onchange={onchangecell}
	></textarea>
</td>

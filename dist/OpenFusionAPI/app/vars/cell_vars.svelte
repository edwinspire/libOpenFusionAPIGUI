<script>
	'use strict';
	
	import { onMount } from 'svelte';
	import { EditorCode } from '@edwinspire/svelte-components';

	let { value = $bindable(), row = $bindable() } = $props();

	onMount(() => {
		//	setCSS(value);
	});
</script>

<td>
	<EditorCode bind:code={value} lang={'json'}></EditorCode>
</td>

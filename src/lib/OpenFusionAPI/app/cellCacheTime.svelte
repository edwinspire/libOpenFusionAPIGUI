<script>
	// @ts-nocheck

	'use strict';
	import { onMount } from 'svelte';

	/**
	 * @type {any}
	 */
	export let value;
	export let row = {};
	export let props = {};

	onMount(() => {});
</script>

<td>
	<div class="field has-addons">
		<div class="control is-small">
			<input
				class="input is-small"
				type="number"
				placeholder="Cache time"
				bind:value
				step="1"
				min="0"
			/>
		</div>
		<div class="control">
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="button is-small"> seg. </a>
		</div>
		<div class="control">
			{#if row && row.cache_size &&  row.cache_size > 0}
				<!-- svelte-ignore a11y-missing-attribute -->
			<a class="button is-small has-text-success"> <span class="icon">
				
				<i class="fa-solid fa-hourglass-end fa-spin"></i>
			  </span>
			  <span>{row.cache_size} KB</span> </a>
			

			{:else}
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="button is-small"> 0 KB </a>
			{/if}
		</div>
	</div>
</td>

<script>
	// @ts-nocheck

	'use strict';
	import { onMount } from 'svelte';
	import { storeCacheSize } from '../utils.js';

	/**
	 * @type {any}
	 */
	export let value;
	export let row = {};
	export let props = {};
	let value_cache = {};

	storeCacheSize.subscribe((cache_data) => {
		//	console.log('>>>>> storeCacheSize ->>>>', cache_data);

		if (cache_data && Array.isArray(cache_data)) {
			if (cache_data.length > 0) {
				let data = cache_data.find((item) => {
					return item.url == row.endpoint;
				});

				if (data) {
					value_cache = data;
				}
			} else {
				value_cache.bytes = 0;
			}
		}
	});

	onMount(() => {});
</script>

<td>
	{#if row.method !== 'WS'}
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
				{#if row && value_cache && value_cache.bytes && value_cache.bytes > 0}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="button is-small has-text-success">
						<span class="icon">
							<i class="fa-solid fa-sync fa-spin"></i>
						</span>
						<span>{value_cache.bytes} KB</span>
					</a>
				{:else}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="button is-small">
						<span class="icon">
							<i class="fa-solid fa-sync"></i>
						</span>
						<span> 0.0000 KB </span>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</td>

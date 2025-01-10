<script>
	// @ts-nocheck

	'use strict';
	import { onMount } from 'svelte';
	import { storeCacheSize } from '../utils.js';

	let { value = $bindable(), row = $bindable() } = $props();

	let value_cache = $state({});

	storeCacheSize.subscribe((cache_data) => {
			//console.log('>>>>> storeCacheSize ->>>>', cache_data, row);

		if (cache_data && Array.isArray(cache_data)) {
			if (cache_data.length > 0 && row) {
				let data = cache_data.find((item) => {
					//	console.log('>>>>>', item, row.endpoint, row.method);
					return item.url.toLowerCase() == `${row.endpoint}|${row.method}`.toLowerCase();
				});

				if (data) {
					value_cache = data;
				} else {
					value_cache.bytes = 0;
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
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small"> seg. </a>
			</div>
			<div class="control">
				{#if row && value_cache && value_cache.bytes && value_cache.bytes > 0}
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-small has-text-success">
						<span class="icon">
							<i
								class="fa-solid fa-star bolt fa-beat-fade"
								style="--fa-beat-fade-opacity: 0.1; --fa-beat-fade-scale: 1.25;"
							></i>
						</span>
						<span>{value_cache.bytes} KB</span>
					</a>
				{:else}
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-small">
						<span class="icon">
							<i class="fa-regular fa-star"></i>
						</span>
						<span> 0.0000 KB </span>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</td>

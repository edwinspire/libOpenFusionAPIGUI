<script>
	import { onDestroy, onMount } from 'svelte';
	import { storeCacheSize } from '../../../utils/stores.js';
	let { value = $bindable(), row = $bindable() } = $props();

	let value_cache = $state({});

	const unsubscribe = storeCacheSize.subscribe((cache_data) => {
		if (row && cache_data) {
			if (cache_data[row.idendpoint] > 0) {
				value_cache.bytes = cache_data[row.idendpoint];
			} else {
				value_cache.bytes = 0;
			}
		}
	});

	onMount(() => {});
	onDestroy(unsubscribe);
</script>

<td>
	{#if row.method !== 'WS' && value > 0}
		<div class="field has-addons">
			<!-- <div class="control is-small">
				<input
					class="input is-small"
					type="number"
					placeholder="Cache time"
					bind:value
					step="1"
					min="0"
				/>
			</div> -->
			<div class="control">
				{#if row && value_cache && value_cache.bytes && value_cache.bytes > 0}
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-small has-text-success is-static">
						<span class="icon">
							<i
								class="fa-solid fa-clock bolt fa-beat-fade"
								style="--fa-beat-fade-opacity: 0.1; --fa-beat-fade-scale: 1.25;"
							></i>
						</span>
						<span>{value_cache.bytes} KB</span>
					</a>
				{:else}
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-small is-static">
						<span class="icon">
							<i class="fa-solid fa-clock"></i>
						</span>
						<span> 0 KB </span>
					</a>
				{/if}
			</div>
			<div class="control">
				<!-- svelte-ignore a11y_missing_attribute -->
				<a class="button is-small is-static"> {value} seg. </a>
			</div>
		</div>
	{/if}
</td>

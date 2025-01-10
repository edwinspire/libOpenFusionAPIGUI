<script>
	'use strict';
	import { onMount } from 'svelte';
	import { storeCountResponseStatusCode } from '../utils.js';

	let { value = $bindable(), row = $bindable() } = $props();
	let value_count_status_code = $state({});

	storeCountResponseStatusCode.subscribe((ListCountStatusCode) => {
			//console.log('>>>>> storeCountResponseStatusCode ->>>>', ListCountStatusCode, row);
		if (row) {
			//console.log('>>>>> storeCountResponseStatusCode ->>>>', ListCountStatusCode, row);
			let ep_key = `${row.endpoint.toLowerCase()}|${row.method}`;

			if (ListCountStatusCode && Array.isArray(ListCountStatusCode)) {
				if (ListCountStatusCode.length > 0) {
					let this_list = ListCountStatusCode.find((item) => {
						//		console.log('>>>>>', item, ep_key, item[ep_key]);
						return item[ep_key];
					});

					//console.log('+++++++++++> '), this_list;

					if (this_list && this_list[ep_key]) {
						value_count_status_code = this_list[ep_key];
					} else {
						value_count_status_code = [];
					}
				} else {
					value_count_status_code = [];
				}
			}
		}
	});

	onMount(() => {});
</script>

<td>
	{#if row.method !== 'WS'}
		{#if value_count_status_code}
			<div class="field is-grouped is-grouped-multiline">
				{#each Object.keys(value_count_status_code) as statusCode}
					<div class="control">
						<div class="tags has-addons">
							{#if statusCode >= 100 && statusCode < 200}
								<span class="tag is-info">{statusCode}</span>
							{:else if statusCode >= 200 && statusCode < 300}
								<span class="tag is-success">{statusCode}</span>
							{:else if statusCode >= 300 && statusCode < 400}
								<span class="tag is-primary">{statusCode}</span>
							{:else if statusCode >= 400 && statusCode < 500}
								<span class="tag is-warning">{statusCode}</span>
							{:else if statusCode >= 500 && statusCode < 600}
								<span class="tag is-danger">{statusCode}</span>
							{:else}
								<span class="tag is-dark">{statusCode}</span>
							{/if}
							<span class="tag is-dark">{value_count_status_code[statusCode]}</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</td>

<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { onMount } from 'svelte';
	import { url_paths } from '$lib/OpenFusionAPI/Application/utils/paths.js';

	let uF;
	let vars_js = {};
	let loading = true;
	let activeItems = [];
	let copiedStates = {};

	onMount(async () => {
		uF = new uFetch();
		try {
			let req_uf = await uF.GET({ url: url_paths.getlistFunctionsVarsJS });
			vars_js = await req_uf.json();
		} catch (error) {
			console.error('Error fetching JS predefined vars:', error);
		} finally {
			loading = false;
		}
	});

	function toggleItem(key) {
		if (activeItems.includes(key)) {
			activeItems = activeItems.filter((k) => k !== key);
		} else {
			activeItems = [...activeItems, key];
		}
	}

	function copyToClipboard(event, text, id) {
		event.stopPropagation(); // Prevent toggling when clicking copy
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(
				() => {
					console.log('Copied to clipboard');
					copiedStates = { ...copiedStates, [id]: true };
					setTimeout(() => {
						const newState = { ...copiedStates };
						delete newState[id];
						copiedStates = newState;
					}, 3000);
				},
				(err) => console.error('Could not copy text: ', err)
			);
		}
	}
</script>

{#snippet render_params(params)}
	<div class="table-container mb-2">
		<table
			class="table is-narrow is-fullwidth is-striped is-hoverable"
			style="background-color: transparent;"
		>
			<thead>
				<tr>
					<th class="is-size-7" style="opacity: 0.7;">Name</th>
					<th class="is-size-7" style="opacity: 0.7;">Type</th>
					<th class="is-size-7 has-text-centered" style="opacity: 0.7;">Req</th>
					<th class="is-size-7" style="opacity: 0.7;">Default</th>
					<th class="is-size-7" style="opacity: 0.7;">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each params as param}
					<tr class="is-size-7">
						<td><code class="is-size-7">{param.name}</code></td>
						<td>{param.type}</td>
						<td class="has-text-centered">
							{#if param.required}<span class="has-text-danger">•</span>{:else}<span
									class="has-text-grey-light">•</span
								>{/if}
						</td>
						<td>{param.default !== undefined ? JSON.stringify(param.default) : ''}</td>
						<td>{param.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

<div class="content is-small">
	{#if loading}
		<progress class="progress is-small is-primary" max="100">Loading...</progress>
	{:else}
		<div class="panel is-shadowless" style="border: none;">
			{#each Object.entries(vars_js) as [key, data]}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="panel-block is-block p-0 mb-1"
					style="border: 1px solid var(--bulma-border, #dbdbdb); border-radius: 4px; background-color: transparent;"
				>
					<div
						class="is-flex is-justify-content-space-between is-align-items-center p-2 is-clickable"
						class:is-active-item={activeItems.includes(key)}
						style="cursor: pointer;"
						onclick={() => toggleItem(key)}
					>
						<div class="is-flex is-align-items-center" style="gap: 0.5rem; overflow: hidden;">
							<span class="icon is-small has-text-info">
								<i class="fa-solid {activeItems.includes(key) ? 'fa-angle-down' : 'fa-angle-right'}"
								></i>
							</span>
							<span class="has-text-weight-bold is-size-6 is-family-monospace">{key}</span>
							<button
								class="button is-small is-ghost p-1 is-height-auto"
								style="height: auto; min-height: unset; opacity: {copiedStates['name_' + key]
									? '1'
									: '0.6'};"
								class:has-text-success={copiedStates['name_' + key]}
								title="Copy name"
								onclick={(e) => copyToClipboard(e, key, 'name_' + key)}
							>
								<span class="icon is-small">
									<i
										class="fa-regular {copiedStates['name_' + key] ? 'fa-circle-check' : 'fa-copy'}"
									></i>
								</span>
							</button>
							{#if data.description}
								<span
									class="is-size-7 is-hidden-mobile is-truncated"
									style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; opacity: 0.7;"
								>
									- {data.description}
								</span>
							{/if}
						</div>

						<div class="is-flex is-align-items-center">
							{#if data.return && data.return.type}
								<span class="tag is-info is-light is-rounded is-small mr-2 is-hidden-mobile"
									>{data.return.type}</span
								>
							{/if}
							{#if data.web}
								<a
									href={data.web}
									target="_blank"
									class="icon is-small hover-text-primary"
									style="opacity: 0.6;"
									title="View Documentation"
									aria-label="View Documentation"
									onclick={(e) => e.stopPropagation()}
								>
									<i class="fa-solid fa-external-link-alt is-size-7"></i>
								</a>
							{/if}
						</div>
					</div>

					{#if activeItems.includes(key)}
						<div class="p-3 is-size-7" style="border-top: 1px solid var(--bulma-border, #dbdbdb);">
							{#if data.description}
								<p class="mb-3">{data.description}</p>
							{/if}

							{#if data.params && data.params.length > 0}
								<div class="mb-3">
									<strong style="opacity: 0.8;">Parameters</strong>
									{@render render_params(data.params)}
								</div>
							{/if}

							{#if data.return}
								<div class="mb-3">
									<strong style="opacity: 0.8;">Return</strong>
									<div class="pl-2" style="border-left: 2px solid var(--bulma-info, #3298dc);">
										<span class="has-text-weight-bold">{data.return.type}</span>
										{#if data.return.description}
											- {data.return.description}{/if}
										{#if data.return.object && data.return.object.length > 0}
											<div class="mt-1">
												{#each data.return.object as obj}
													<div class="is-flex" style="gap: 0.5rem;">
														<code class="is-size-7">{obj.name}</code>
														<span style="opacity: 0.7;">{obj.type}</span>
														<span>{obj.description}</span>
													</div>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							{/if}

							{#if data.example}
								<div>
									<div class="is-flex is-justify-content-space-between is-align-items-center mb-1">
										<strong style="opacity: 0.8;">Example</strong>
										<button
											class="button is-small is-ghost p-0 is-height-auto"
											style="height: auto; min-height: unset;"
											class:has-text-success={copiedStates['ex_' + key]}
											onclick={(e) => copyToClipboard(e, data.example, 'ex_' + key)}
										>
											<span class="icon is-small"
												><i
													class="fa-regular {copiedStates['ex_' + key]
														? 'fa-circle-check'
														: 'fa-copy'}"
												></i></span
											>
											<span>{copiedStates['ex_' + key] ? 'Copied!' : 'Copy'}</span>
										</button>
									</div>
									<pre
										class="p-2 is-size-7"
										style="background-color: var(--bulma-pre-background, #f5f5f5); color: var(--bulma-pre, #333); border-radius: 4px;"><code
											>{data.example}</code
										></pre>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Make hover effect visible - Use opacity or filter for theme compatibility */
	.is-clickable:hover {
		filter: brightness(0.95);
		/* For dark mode, brightness might need to go up, but without knowing the mode, generic background shift is hard. */
		/* Using a transparent grey overlay trick */
		background-color: rgba(127, 127, 127, 0.1);
	}

	.is-active-item {
		background-color: rgba(127, 127, 127, 0.05);
	}

	/* Truncate helpers */
	.is-truncated {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Button height auto fix */
	.is-height-auto {
		height: auto !important;
	}

	.hover-text-primary:hover {
		color: var(--bulma-primary, #00d1b2) !important;
		opacity: 1 !important;
	}
</style>

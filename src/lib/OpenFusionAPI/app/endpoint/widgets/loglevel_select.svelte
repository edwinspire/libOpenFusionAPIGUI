<script>
	import { onMount } from 'svelte';

	let { level = $bindable(0), ondata = (d) => {} } = $props();

	let options = $state([
		{ id: 0, value: `Disabled`, enabled: true },
		{ id: 1, value: `Basic`, enabled: true },
		{ id: 2, value: `Normal`, enabled: true },
		{ id: 3, value: `Full`, enabled: true }
	]);

	function defaultValue() {
		if (level == null) {
			level = 0;
		}
	}

	onMount(() => {
		defaultValue();
	});
</script>

<div>
	{#if level >= 0}
		<span>
			<div class="field is-horizontal">
				<div class="field-body">
					<div class="field">
						<div class="control">
							<div class="select is-fullwidth is-small">
								<select bind:value={level}>
									{#if options && options.length > 0}
										{#each options as h}
											<option value={h.id}>
												{h.value}
											</option>
										{/each}
									{/if}
								</select>
							</div>
						</div>
						<span class="help is-success">
							<div>
								{#if level == 0}
									Does not save any log.
								{:else if level == 1}
									Save the minimum data.
								{:else if level == 2}
									Save the most useful data.
								{:else if level == 3}
									Saves all request and response data.
								{/if}
							</div>
						</span>
					</div>
				</div>
			</div>
		</span>
	{/if}
</div>

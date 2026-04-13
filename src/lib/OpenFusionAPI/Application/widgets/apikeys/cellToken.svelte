<script>
	let { value = '' } = $props();
	let isExpanded = $state(false);
	let copied = $state(false);

	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>
<td>
<div class="is-flex is-align-items-center" style="gap: 0.5rem;">
	<span style="word-break: break-all; max-width: 250px;">
		{#if isExpanded}
			{value}
		{:else}
			{#if value && value.length > 20}
				{value.substring(0, 20)}...
			{:else}
				{value}
			{/if}
		{/if}
	</span>

	{#if value && value.length > 10}
		<button class="button is-small is-ghost" onclick={toggleExpand} title={isExpanded ? "Show less" : "View more"} aria-label={isExpanded ? "Show less" : "View more"}>
			<span class="icon is-small has-text-grey">
				<i class="{isExpanded ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}"></i>
			</span>
		</button>
	{/if}

	{#if value}
		<button class="button is-small is-ghost" onclick={copyToClipboard} title="Copy token" aria-label="Copy token">
			<span class="icon is-small {copied ? 'has-text-success' : 'has-text-info'}">
				<i class="{copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}"></i>
			</span>
		</button>
	{/if}
</div>
</td>
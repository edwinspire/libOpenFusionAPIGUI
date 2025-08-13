<script>
	import { onMount } from 'svelte';
	import { Input } from '@edwinspire/svelte-components';

	let { row = $bindable({}), mcp = $bindable({}), ondata = (d) => {} } = $props();

	function defaultValue() {
		if (!mcp || mcp == null) {
			mcp = { enabled: false, name: '', title: '' };
		}

		if (mcp.enabled == null) {
			mcp.enabled = false;
		}

		if (mcp.name == null) {
			mcp.name = '';
		}

		if (mcp.title == null) {
			mcp.title = '';
		}
		//mcp = { ...mcp };
		console.log('MCP', mcp);
	}

	$effect(() => {
		console.log('MCP Effect', mcp);
	});

	onMount(() => {
		defaultValue();
	});
</script>

<Input label="Enabled" type="checkbox" bind:value={mcp.enabled} placeholder="Enabled" />
<Input label="Name" pattern="[a-z0-9_-]+" bind:value={mcp.name} placeholder="Name" />
<Input label="Title" bind:value={mcp.title} placeholder="Title" />

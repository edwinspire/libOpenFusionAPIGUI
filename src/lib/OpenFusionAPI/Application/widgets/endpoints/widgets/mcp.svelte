<script>
	import { onMount } from 'svelte';
	import { Input } from '@edwinspire/svelte-components';

	let { mcp = $bindable({}) } = $props();

	function defaultValue() {
		mcp ??= { enabled: false, name: '', title: '', description: '' };
		mcp.enabled ??= false;
		mcp.name ??= '';
		mcp.title ??= '';
		mcp.description ??= '';
	}

	onMount(() => {
		defaultValue();
	});
</script>

<Input label="Enabled" type="checkbox" bind:value={mcp.enabled} />
<Input label="Name" bind:value={mcp.name} placeholder="Name" required={true} />
<Input label="Title" bind:value={mcp.title} placeholder="Title" />

<div class="field">
	<p class="control label_descrip">
		<!-- svelte-ignore a11y_missing_attribute -->
		<a class="button is-static is-small"> Tool Description </a>
	</p>

	<div class="control">
		<textarea class="textarea is-small" placeholder="Tool description" bind:value={mcp.description}
		></textarea>
	</div>
</div>

<div class="block">
	<div class="content is-small">
		<div class="icon-text">
			<span class="icon has-text-warning">
				<i class="fas fa-exclamation-triangle"></i>
			</span>
			<span>Warning</span>
		</div>

		For the tool to work correctly, you must configure the JSON Schema to validate and indicate to
		the AI what the input parameters are.
	</div>
</div>

<style>
	.label_descrip {
		margin-bottom: inherit;
	}
</style>

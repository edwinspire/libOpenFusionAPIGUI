<script>
	let {
		label = $bindable('Text Area Label'),
		value = $bindable(''),
		placeholder = $bindable('Text area placeholder')
	} = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<div class="tabs is-boxed is-small margin_correct">
	<ul class="">
		<li class="is-active">
			<a class="no_cursor">
				<span>{label}</span>
			</a>
		</li>
	</ul>
</div>

<div class="field">
	<div class="control">
		<textarea class="textarea is-small" {placeholder} bind:value></textarea>
	</div>
</div>

<style>
	.margin_correct {
		margin-bottom: 0px;
	}
	.no_cursor {
		cursor: default !important;
	}
</style>

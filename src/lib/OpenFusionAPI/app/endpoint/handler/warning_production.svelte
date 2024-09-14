<script>
	export let environment;
</script>

{#if environment && environment == 'prd'}
	<div class="icon-text">
		<span class="icon has-text-warning">
			<i class="fas fa-exclamation-triangle fa-fade"></i>
		</span>
		<span class="label is-small">Be careful, you are in a <strong>production</strong> environment.</span>
	</div>
{/if}

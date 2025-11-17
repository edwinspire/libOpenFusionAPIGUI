<script>
	import { Level, Modal } from '@edwinspire/svelte-components';
	let {
		left = $bindable([]),
		onsavedeploy = () => {},
		oncancel = () => {},
		deploying = $bindable({ show: false, error: false, message: '' })
	} = $props();
</script>

<Level {left} right={[r01]}>
	{#snippet r01()}
		<div class="field has-addons">
			<p class="control">
				<button
					class="button is-small is-warning"
					onclick={() => {
						if (
							onsavedeploy &&
							confirm('Are you sure you want to save the changes and deploy the application?')
						) {
							deploying.show = true;
							deploying.message = 'Saving and deploying...';
							onsavedeploy();
						}
					}}
				>
					<span class="icon is-small">
						<i class="fa-solid fa-rocket"></i>
					</span>
					<span>Save & Deploy</span>
				</button>
			</p>
			<p class="control">
				<button
					class="button is-small"
					onclick={() => {
						//console.log('app Actual', app, app_vars);

						if (
							oncancel &&
							confirm(
								'If you cancel, you will lose absolutely all changes made to the app. Do you want to continue?'
							)
						) {
							oncancel();
						}
					}}
				>
					<span class="icon is-small">
						<i class="fa-solid fa-xmark"></i>
					</span>
					<span>Cancel</span>
				</button>
			</p>
		</div>
	{/snippet}
</Level>

<Modal bind:show={deploying.show} bind:showCloseButton={deploying.error}>
	<div class="box">
		<p>{deploying.message}</p>
		<br />
		{#if deploying.error}
			<progress class="progress is-small is-danger" max="100" value="10">Loading...</progress>
		{:else}
			<progress class="progress is-small is-primary" max="100">Loading...</progress>
		{/if}

		<!-- Your content -->
	</div>
</Modal>

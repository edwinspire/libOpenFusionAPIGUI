<script>
	import SaveDeploy from '../common/saveDeploy.svelte';
	import AppVars from './variables.svelte';

	let vars_widget;
	let { idapp = $bindable(0), onsavedeploy = () => {} } = $props();
	let deploying = $state({ show: false, message: '', error: false });
</script>

{#snippet label_appname()}
	<span class="has-text-weight-bold">Variables</span>
{/snippet}

<div class="">
	<SaveDeploy
		bind:deploying
		left={[label_appname]}
		onsavedeploy={async () => {
			try {
				let app = await vars_widget.Save();
				//console.log('Guardado...', app);
				deploying.show = false;
			} catch (error) {
				console.error(error);
				deploying.error = true;
				deploying.message = `Error: ${error.message}`;
			}
		}}
		oncancel={() => {
			alert('No');
		}}
	></SaveDeploy>

	<AppVars bind:this={vars_widget} bind:idapp environment="*" isReadOnly={false}></AppVars>
</div>

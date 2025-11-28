<script>
	import SaveDeploy from '$lib/OpenFusionAPI/Application/widgets/common/saveDeploy.svelte';
	import AppVars from '$lib/OpenFusionAPI/Application/widgets/application_variables/variables.svelte';

	let vars_widget;
	let { idapp = $bindable(0), onsavedeploy = () => {} } = $props();
	let deploying = $state({ show: false, message: '', error: false });
</script>

{#snippet label_appname()}
	<span class="has-text-weight-bold">Variables</span>
{/snippet}

<div class="">
	APP VARIABLES
	<AppVars bind:this={vars_widget} bind:idapp environment="*" isReadOnly={false}></AppVars>
</div>

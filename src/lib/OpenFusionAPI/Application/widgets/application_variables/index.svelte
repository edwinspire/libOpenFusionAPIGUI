<script>
	import AppVars from '$lib/OpenFusionAPI/Application/widgets/application_variables/variables.svelte';
	import {
		userStore,
		statusSystemEndpointsStore
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { restoreSystemEndpoints } from '$lib/OpenFusionAPI/Application/utils/request.js';

	import { onMount } from 'svelte';

	let vars_widget;
	let { idapp = $bindable(0), onsavedeploy = () => {} } = $props();

	onMount(async () => {
		let status_sys_endp = await restoreSystemEndpoints(false, $userStore.token);
		statusSystemEndpointsStore.set(status_sys_endp);
	});
</script>

<div class="">
	APP VARIABLES
	<AppVars bind:this={vars_widget} bind:idapp environment="*" isReadOnly={false}></AppVars>
</div>

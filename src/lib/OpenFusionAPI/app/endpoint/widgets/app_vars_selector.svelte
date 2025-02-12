<script>
	import { onMount } from 'svelte';
	import { PredictiveInput } from '@edwinspire/svelte-components';
	import { listAppVars } from '../../../utils.js';

	let { value = $bindable(''), environment = $bindable(''), onselect = () => {} } = $props();
	let options_app_vars = $state([]);

	listAppVars.subscribe((list) => {
		let env_vars = list[environment] ?? {};

		options_app_vars = Object.keys(env_vars).map((item) => {
			return { name: item, value: item };
		});
        
	});

	onMount(() => {});
</script>

<PredictiveInput
	placeholder="$_VAR_NAME"
	options={options_app_vars}
	bind:selectedValue={value}
	{onselect}
></PredictiveInput>

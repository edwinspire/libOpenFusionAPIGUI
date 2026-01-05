<script>
	import { PredictiveInput, JSONView } from '@edwinspire/svelte-components';
	import { listAppVars } from '../../../utils/stores.js';

	let {
		freeTyping = $bindable(false),
		placeholder = $bindable('$_VAR_NAME'),
		classIcon = $bindable(''),
		label = $bindable('Application Variable'),
		value = $bindable(''),
		environment = $bindable(''),
		onselect = () => {}
	} = $props();

	// --------------------------------------------
	// Options filtered by environment (derived from store)
	// --------------------------------------------
	let options_app_vars = $derived(
		Array.isArray($listAppVars)
			? $listAppVars
					.filter((item) => item.environment === environment)
					.map((item) => ({
						name: item.name,
						value: item.name,
						code: item.value
					}))
			: []
	);

	// --------------------------------------------
	// Selected value (derived)
	// --------------------------------------------
	let value_selected = $derived(options_app_vars.find((item) => item.name === value));

	function onselectInternal(val) {
		value = val;
		onselect(val);
	}
</script>

<PredictiveInput
	{freeTyping}
	{placeholder}
	{classIcon}
	{label}
	options={options_app_vars}
	bind:selectedValue={value}
	onselect={(selected) => {
		onselectInternal(selected.value);
	}}
></PredictiveInput>
{#if value_selected}
	<details class=" ">
		<summary>View value</summary>
		<br />
		<JSONView jsonObject={value_selected.code} />
	</details>
{/if}

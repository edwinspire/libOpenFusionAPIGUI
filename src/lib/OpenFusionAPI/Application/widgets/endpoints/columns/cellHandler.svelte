<script>
	import BLabel from '$lib/OpenFusionAPI/Application/widgets/common/icon_label.svelte';
	import {
		listFunctionStorePRD,
		listFunctionStoreDev,
		listFunctionStoreQA
	} from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { onMount } from 'svelte';
	import { getHandlerParams } from '$lib/OpenFusionAPI/Application/utils/utils.js';

	let { value = $bindable(), row = $bindable() } = $props();

	let label = $state('');

	let css_class = $state('');
	let css_icon = $state('fas fa-home');

	let error_function = $derived.by(() => {
		let r = { valid: true };

		if (row.handler == 'FUNCTION') {
			// Verifica si la función existe
			if (row.environment == 'prd') {
				r.valid = searchFunction(row.code, $listFunctionStorePRD);
			} else if (row.environment == 'qa') {
				r.valid = searchFunction(row.code, $listFunctionStoreQA);
			} else if (row.environment == 'dev') {
				r.valid = searchFunction(row.code, $listFunctionStoreDev);
			}

			r.message = r.valid ? '' : `The function ${row.code} does not exist.`;
		}

		return r;
	});

	function searchFunction(name_function, store_data) {
		let r = false;
		if (store_data && Array.isArray(store_data)) {
			r = store_data.some((item) => {
				return item.id == name_function;
			});
		}
		return r;
	}

	/**
	 * @param {string} handler
	 */
	function setCSS(handler) {
		let css_selected = getHandlerParams(handler);

		console.log('css_selected >>>> ', css_selected);

		if (css_selected) {
			css_class = css_selected.css_class;
			css_icon = css_selected.css_icon;
		} else {
			css_class = '';
			css_icon = '';
		}

		if (css_selected && css_selected.label) {
			label = css_selected.label;
		} else {
			label = value;
		}
	}

	onMount(() => {
		setCSS(value);
	});
</script>

<td>
	{#if row.method !== 'WS'}
		{#if !error_function.valid}
			<div class="icon-text">
				<span class="icon has-text-danger">
					<i class="fas fa-exclamation-triangle fa-beat"></i>
				</span>
				<span>Error: {error_function.message}</span>
			</div>
		{/if}
		<BLabel bind:color={css_class} bind:label bind:icon={css_icon}></BLabel>
	{/if}
</td>

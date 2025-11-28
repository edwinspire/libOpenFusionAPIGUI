<script>
	import BLabel from '../../common/icon_label.svelte';
	import { listHandlers } from '../../../utils/static_values.js';
	import { onMount } from 'svelte';

	let { value = $bindable(), row = $bindable() } = $props();

	let label = $state('');

	let css_class = $state('');
	let css_icon = $state('fas fa-home');

	/**
	 * @param {string} method
	 */
	function setCSS(method) {
		// @ts-ignore
		let css_selected = listHandlers[method];
		if (css_selected) {
			css_class = css_selected.color;
			css_icon = css_selected.icon;
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
		<BLabel bind:color={css_class} bind:label bind:icon={css_icon}></BLabel>
	{/if}
</td>

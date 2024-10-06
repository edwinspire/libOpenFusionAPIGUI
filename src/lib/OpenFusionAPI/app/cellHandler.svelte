<script>
	import BLabel from '../widgets/icon_label.svelte';
	import { listHandlers } from '../utils.js';
	import { onMount } from 'svelte';

	/**
	 * @type {any}
	 */
	export let value;
	export let row = {};
	export let props = {};

	let css_class = '';
	let css_icon = 'fas fa-home';

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
	}

	onMount(() => {
		setCSS(value);
	});
</script>

<td>
	{#if row.method !== 'WS'}
		<BLabel bind:color={css_class} bind:label={value} bind:icon={css_icon}></BLabel>
	{/if}
</td>

<script>
	import BLabel from '../widgets/icon_label.svelte';
	import { listHTTPMethods } from '../utils.js';
	import { onMount } from 'svelte';

	export let value;
	export let row = {};
	export let props = {};

	let css_class_method = '';
	let css_icon = 'fas fa-home';

	/**
	 * @param {string} method
	 */
	function setCSS(method) {
		// @ts-ignore
		let css_selected = listHTTPMethods[method];
		if (css_selected) {
			css_class_method = css_selected.color;
			css_icon = css_selected.icon;
		} else {
			css_class_method = '';
			css_icon = '';
		}
	}

	onMount(() => {
		setCSS(value);
	});
</script>

<td>
	<BLabel bind:color={css_class_method} bind:label={value} bind:icon={css_icon}></BLabel>
</td>

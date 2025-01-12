<script>
	import { BasicSelect } from '@edwinspire/svelte-components';
	import { listHandlerStore, css_handlers } from '../../../utils.js';
	import { onMount } from 'svelte';
	import Code from './code.svelte';

	let { row = $bindable({}), value = $bindable(), ondata = (d) => {} } = $props();

	let handlers = $state([]);
	let css_h = $state(' is-small ');

	listHandlerStore.subscribe((/** @type {any[]} */ value) => {
		handlers = value;
	});

	/**
	 * @param {string } value_handler
	 */
	function setCSS(value_handler) {
		css_h =
			value_handler && css_handlers[value_handler] && css_handlers[value_handler].css
				? ' is-small ' + css_handlers[value_handler].css
				: ' is-small ';
	}

	onMount(() => {
		setCSS(value);
	});
</script>

<div class="field has-addons">
	<div class="control">
		<BasicSelect
			bind:options={handlers}
			bind:option={value}
			bind:css_class={css_h}
			onselect={(/** @type {{ detail: { value: string; }; }} */ e) => {
				setCSS(e.detail.value);
			}}
		/>
	</div>

	<div class="control">
		<Code bind:value={row.code} bind:row></Code>
	</div>
</div>

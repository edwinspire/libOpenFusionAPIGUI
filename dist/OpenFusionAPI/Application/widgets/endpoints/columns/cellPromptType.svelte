<script>
	'use strict';
	import { onMount } from 'svelte';
	import { BasicSelect } from '@edwinspire/svelte-components';

	let { value = $bindable(), row = $bindable() } = $props();

	let ListTypes = [
		{ value: 'AI Message', id: 'ai' },
		{ value: 'Human Message', id: 'human' },
		{ value: 'System Message', id: 'system' },
		{ value: 'Placeholder', id: 'placeholder' },
	//	{ value: 'Tool Message', id: 'tool', enabled: false },
		{ value: 'User Message', id: 'user' }
	];

	onMount(() => {
		//	setCSS(value);
	});
</script>

<td>
	<BasicSelect
		isExpanded={true}
		options={ListTypes}
		bind:option={value}
		onselect={(e) => {
			console.log('Cambia', e, value);
		}}
	/>
</td>

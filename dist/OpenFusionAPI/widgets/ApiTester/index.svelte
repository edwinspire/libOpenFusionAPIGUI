<script>
	import { Tab } from '@edwinspire/svelte-components';
	import Query from './key_value/kv.svelte';
	import Headers from './key_value/kv.svelte';
	import Auth from './auth.svelte';
	import Body from './body.svelte';

	export let url;
	export let method = 'GET';

	let tabList = [
		{ label: 'Query Parameters', isActive: true },
		{ label: 'HTTP Headers' },
		{ label: 'Auth' },
		{ label: 'Body' },
		{ label: 'Result' }
	];

	let data = { query: [], headers: [], auth: {} };
</script>

<div class="is-flex is-justify-content-flex-end">
	<button
		class="button is-success is-small is-outlined"
		on:click={() => {
			console.log(data);
		}}
	>
		<span class="icon is-small">
			<i class="fa-solid fa-play"></i>
		</span>
		<span>Execute</span>
	</button>
</div>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<Query bind:parameters={data.query}></Query>
	</div>
	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<Headers bind:parameters={data.headers}></Headers>
	</div>
	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<Auth bind:parameters={data.auth}></Auth>
	</div>
	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<Body bind:parameters={data.body}></Body>
	</div>
</Tab>

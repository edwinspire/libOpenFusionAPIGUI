<script>
	import { Tab } from '@edwinspire/svelte-components';
	import Query from './key_value/kv.svelte';
	import Headers from './key_value/kv.svelte';
	import Auth from './auth.svelte';
	import Body from './body.svelte';
	import uFetch from '@edwinspire/universal-fetch';

	export let url;
	export let method = 'GET';
	export let data = { query: [], headers: [], auth: {}, body: {} };

	let uF = new uFetch();

	let tabList = [
		{ label: 'Query Parameters', isActive: true },
		{ label: 'HTTP Headers' },
		{ label: 'Auth' },
		{ label: 'Body' },
		{ label: 'Result' }
	];
</script>

<div class="block">
	<div class="is-flex is-justify-content-flex-end">
		<button
			class="button is-success is-small is-outlined"
			on:click={async () => {
				console.log(data, url);

				let res = await uF[method]({ url: url });

				console.log(res);
			}}
		>
			<span class="icon is-small">
				<i class="fa-solid fa-play"></i>
			</span>
			<span>Execute</span>
		</button>
	</div>
</div>

<div class="field has-addons">
	<p class="control">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="button is-static is-small"> Url </a>
	</p>
	<p class="control is-expanded">
		<input
			class="input is-small is-expanded"
			type="text"
			placeholder="Application name"
			bind:value={url}
		/>
	</p>
</div>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<Query bind:data={data.query}></Query>
	</div>
	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<Headers bind:data={data.headers}></Headers>
	</div>
	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<Auth bind:data={data.auth}></Auth>
	</div>
	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<Body bind:data={data.body}></Body>
	</div>
</Tab>

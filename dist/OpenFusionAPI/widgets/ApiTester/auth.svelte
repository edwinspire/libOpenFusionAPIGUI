<script>
	import { onMount } from 'svelte';
	import { Tab } from '@edwinspire/svelte-components';

	export let parameters = { basic: {}, bearer: {} };

	let tabList = [{ label: 'None', isActive: true }, { label: 'Basic' }, { label: 'Bearer' }];

	onMount(() => {
		if (!parameters) {
			parameters = { basic: {}, bearer: {} };
		}

		if (parameters && !parameters.basic) {
			parameters.basic = {};
		}

		if (parameters && !parameters.bearer) {
			parameters.bearer = {};
		}
	});
</script>

<Tab bind:tabs={tabList} >

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<div class="field">
			<label class="label is-small">Username</label>

			{#if parameters.basic}
				<div class="control has-icons-left has-icons-right">
					<input
						class="input is-small"
						type="text"
						placeholder="Username"
						bind:value={parameters.basic.username}
					/>
					<span class="icon is-small is-left">
						<i class="fa-solid fa-user"></i>
					</span>
				</div>
			{/if}
		</div>

		<div class="field">
			<label class="label is-small">Password</label>
			{#if parameters.basic}
				<div class="control has-icons-left has-icons-right">
					<input
						class="input is-small"
						type="text"
						placeholder="Password"
						bind:value={parameters.basic.passsword}
					/>
					<span class="icon is-small is-left">
						<i class="fa-solid fa-key"></i>
					</span>
				</div>
			{/if}
		</div>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<div class="field">
			<label class="label is-small">Token</label>
			<div class="control">
				{#if parameters.bearer}
					<textarea
						class="textarea is-small"
						placeholder="Token"
						bind:value={parameters.bearer.token}
					></textarea>
				{/if}
			</div>
		</div>
	</div>
</Tab>

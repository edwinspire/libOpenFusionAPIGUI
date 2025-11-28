<script>
	import { onMount } from 'svelte';
	import {
		getListMethods,
		getListHandler,
		LoginRequest
	} from '../Application/utils/request.js';
	import { userStore } from '../Application/utils/stores.js';
	import logo from '../img/favicon.png';
	import { Notifications, Modal } from '@edwinspire/svelte-components';
	import { version } from '../version.js';

	let noty = new Notifications();
	let { onlogin = () => {} } = $props();
	let username = $state('');
	let password = $state('');
	let processing = $state({ waiting: false, error: null });

	async function handleSubmit() {
		try {
			processing.waiting = true;
			processing.error = '';

			let data = await LoginRequest(username, password);

			if (data.login) {
				userStore.set(data);

				await getListMethods(data.token);
				await getListHandler(data.token);

				onlogin({
					login: data.login
				});
			} else {
				//	alert('Invalid credentials');
				processing.error = 'Invalid credentials';
				processing.waiting = false;
				noty.push({ message: processing.error, color: 'danger' });
			}
		} catch (error) {
			console.trace(error);
			noty.push({ message: error.message, color: 'danger' });
			processing.waiting = false;
			processing.error = error.message;
		}
	}

	onMount(() => {});
</script>

<Modal show={true}>
	<div class="box">
		<!-- Any other Bulma elements you want -->

		<div class="media t1">
			<div class="media-left">
				<figure class="image is-48x48">
					<img src={logo} alt="OpenFusionAPI" />
				</figure>
			</div>
			<div class="media-content">
				<p class="title is-family-sans-serif">Open Fusion API</p>
			</div>
		</div>

		<div class="field">
			<p class="control has-icons-left has-icons-right">
				<input class="input" type="text" placeholder="Username" bind:value={username} />
				<span class="icon is-small is-left">
					<i class="fa-solid fa-user"></i>
				</span>
			</p>
		</div>
		<div class="field">
			<p class="control has-icons-left">
				<input class="input" type="password" placeholder="Password" bind:value={password} />
				<span class="icon is-small is-left">
					<i class="fas fa-lock"></i>
				</span>
			</p>
		</div>
		<div class="field">
			<p class="control">
				{#if processing.waiting}
					<button
						class="button is-success is-loading"
						onclick={() => {
							handleSubmit();
						}}
					>
						Login
					</button>
				{:else}
					<button
						class="button is-success"
						onclick={() => {
							handleSubmit();
						}}
					>
						Login
					</button>
				{/if}
			</p>
			<div class="content is-small is-flex is-justify-content-flex-end">GUI Version: {version}</div>
		</div>
		{#if !processing.waiting && processing.error}
			<div class="icon-text">
				<span class="icon has-text-warning">
					<i class="fas fa-exclamation-triangle"></i>
				</span>
				<span>{processing.error}</span>
			</div>
		{/if}
	</div>
</Modal>

<style>
	.t1 {
		padding: 1em;
	}
</style>

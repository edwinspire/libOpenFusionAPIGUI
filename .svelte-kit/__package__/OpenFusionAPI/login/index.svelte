<script>
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
				// Solo almacenamos campos necesarios, evitando datos sensibles
				userStore.set({ login: data.login, token: data.token, user: data.user });

				await getListMethods(data.token);
				await getListHandler(data.token);

				processing.waiting = false;

				onlogin({
					login: data.login
				});
			} else {
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
</script>

<Modal show={true}>
	<div class="box">
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

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
						<i class="fa-solid fa-lock"></i>
					</span>
				</p>
			</div>
			<div class="field">
				<p class="control">
					<button
						type="submit"
						class="button is-success"
						class:is-loading={processing.waiting}
						disabled={processing.waiting}
					>
						Login
					</button>
				</p>
				<div class="content is-small is-flex is-justify-content-flex-end">GUI Version: {version}</div>
			</div>
		</form>

		{#if !processing.waiting && processing.error}
			<div class="icon-text">
				<span class="icon has-text-warning">
					<i class="fa-solid fa-triangle-exclamation"></i>
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

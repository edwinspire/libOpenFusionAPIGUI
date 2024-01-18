<script>
	// @ts-ignore
	import uFetch from '@edwinspire/universal-fetch';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { userStore, getListMethods, getListHandler, url_paths } from '../utils.js';

	const dispatch = createEventDispatcher();

	let username = '';
	let password = '';
	// @ts-ignore
	let uf = new uFetch();

	/**
	 * @param {boolean} login
	 */
	function emitSuccess(login) {
		dispatch('login', {
			login: login
		});
	}

	async function handleSubmit() {
		// Lógica de autenticación aquí

		try {
			// @ts-ignore
			let user = await uf.post(url_paths.login, { username, password });
			let data = await user.json();
			console.log(data);

			if (data.login) {
				userStore.set(data);
				await getListMethods(data.token);
				await getListHandler(data.token);
			} else {
				alert('Credenciales inválidas');
			}

			emitSuccess(data.login);
		} catch (error) {
			console.trace(error);
			// @ts-ignore
			alert(error.message);
		}
	}

	onMount(() => {});
</script>

<div class="modal is-active">
	<div class="modal-background"></div>
	<div class="modal-content">
		<div class="box">
			<!-- Any other Bulma elements you want -->

			<div class="media t1">
				<div class="media-left">
					<figure class="image is-48x48">
						<img src="favicon.png" alt="OpenFusionAPI" />
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
					<button
						class="button is-success"
						on:click={() => {
							handleSubmit();
						}}
					>
						Login
					</button>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.t1 {
		padding: 1em;
	}
</style>

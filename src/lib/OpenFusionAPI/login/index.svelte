<script>
	import {
		getListMethods,
		getListHandler,
		LoginRequest
	} from '$lib/OpenFusionAPI/Application/utils/request.js';
	import { userStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import logo from '$lib/OpenFusionAPI/img/favicon.png';
	import { Notifications, Modal } from '@edwinspire/svelte-components';
	import { version } from '$lib/OpenFusionAPI/version.js';

	let noty = new Notifications();
	let { onlogin = () => {} } = $props();
	let username = $state('');
	let password = $state('');
	let processing = $state({ waiting: false, error: null });
	let showPassword = $state(false);
	let mounted = $state(false);

	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => (mounted = true), 50);
	});

	async function handleSubmit() {
		try {
			processing.waiting = true;
			processing.error = '';

			let data = await LoginRequest(username, password);

			if (data.login) {
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
	<div class="login-wrapper" class:is-visible={mounted}>
		<!-- Animated background orbs -->
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>

		<div class="login-card box">
			<!-- Logo & Brand -->
			<div class="brand-header has-text-centered">
				<div class="logo-ring">
					<div class="logo-figure">
						<img src={logo} alt="OpenFusionAPI" class="logo-img" />
					</div>
				</div>
				<h1 class="title is-4 mt-3 brand-title">Open Fusion API</h1>
				<p class="subtitle is-6 brand-subtitle">
					<span class="tag is-dark is-rounded">
						<span class="icon is-small"><i class="fa-solid fa-server"></i></span>
						<span>MCP Server</span>
					</span>
				</p>
			</div>

			<div class="divider-line"></div>

			<!-- Form -->
			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="login-form">
				<div class="field">
					<label class="label has-text-grey-light is-small" for="login-username">Username</label>
					<p class="control has-icons-left">
						<input
							id="login-username"
							class="input is-rounded"
							class:is-danger={processing.error}
							type="text"
							placeholder="Enter your username"
							bind:value={username}
							autocomplete="username"
						/>
						<span class="icon is-small is-left">
							<i class="fa-solid fa-user"></i>
						</span>
					</p>
				</div>

				<div class="field">
					<label class="label has-text-grey-light is-small" for="login-password">Password</label>
					<p class="control has-icons-left has-icons-right">
						<input
							id="login-password"
							class="input is-rounded"
							class:is-danger={processing.error}
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter your password"
							bind:value={password}
							autocomplete="current-password"
						/>
						<span class="icon is-small is-left">
							<i class="fa-solid fa-lock"></i>
						</span>
						<button
							type="button"
							class="icon is-small is-right is-clickable eye-icon"
							onclick={() => (showPassword = !showPassword)}
							title={showPassword ? 'Hide password' : 'Show password'}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							<i class={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
						</button>
					</p>
				</div>

				{#if !processing.waiting && processing.error}
					<div class="notification is-danger is-light error-notification">
						<span class="icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
						<span>{processing.error}</span>
					</div>
				{/if}

				<div class="field mt-4">
					<p class="control">
						<button
							type="submit"
							class="button is-fullwidth is-rounded login-btn"
							class:is-loading={processing.waiting}
							disabled={processing.waiting || !username || !password}
						>
							{#if !processing.waiting}
								<span class="icon"><i class="fa-solid fa-right-to-bracket"></i></span>
								<span>Sign In</span>
							{/if}
						</button>
					</p>
				</div>
			</form>

			<p class="version-tag has-text-centered has-text-grey">
				<span class="icon is-small"><i class="fa-solid fa-code-branch"></i></span>
				v{version}
			</p>
		</div>
	</div>
</Modal>

<style>
	/* ── Wrapper & Entry Animation ─────────────────────────────── */
	.login-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100%;
		overflow: hidden;
		padding: 1.5rem;
	}

	/* ── Animated background orbs ─────────────────────────────── */
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0;
		transition: opacity 1.2s ease;
		pointer-events: none;
	}

	.login-wrapper.is-visible .orb {
		opacity: 0.18;
	}

	.orb-1 {
		width: 260px;
		height: 260px;
		background: radial-gradient(circle, #FF6B1A, #FF3D00);
		top: -60px;
		right: -60px;
		animation: float1 8s ease-in-out infinite;
	}

	.orb-2 {
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, #FF8C42, #FF3D00);
		bottom: -40px;
		left: -40px;
		animation: float2 10s ease-in-out infinite;
	}

	.orb-3 {
		width: 140px;
		height: 140px;
		background: radial-gradient(circle, #FF6B1A, #FFa040);
		bottom: 30px;
		right: 20px;
		animation: float3 7s ease-in-out infinite;
	}

	@keyframes float1 {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50%       { transform: translate(-20px, 20px) scale(1.08); }
	}

	@keyframes float2 {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50%       { transform: translate(18px, -15px) scale(1.06); }
	}

	@keyframes float3 {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50%       { transform: translate(-12px, 12px) scale(1.1); }
	}

	/* ── Card ─────────────────────────────────────────────────── */
	.login-card {
		position: relative;
		width: 100%;
		max-width: 400px;
		background: rgba(25, 28, 38, 0.82);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 20px !important;
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.45),
			0 0 0 1px rgba(255, 255, 255, 0.04) inset;
		padding: 2.2rem 2rem 1.6rem;

		/* Entry animation */
		opacity: 0;
		transform: translateY(28px) scale(0.97);
		transition:
			opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.login-wrapper.is-visible .login-card {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	/* ── Brand header ─────────────────────────────────────────── */
	.brand-header {
		margin-bottom: 1.2rem;
	}

	.logo-ring {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 88px;
		height: 88px;
		border-radius: 50%;
		background: linear-gradient(135deg, #FF6B1A 0%, #FF3D00 100%);
		padding: 4px;
		box-sizing: border-box;
		margin: 0 auto;
		box-shadow: 0 0 24px rgba(255, 107, 26, 0.4);
		animation: pulse-ring 3s ease-in-out infinite;
	}

	@keyframes pulse-ring {
		0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 26, 0.4); }
		50%       { box-shadow: 0 0 44px rgba(255, 107, 26, 0.75); }
	}

	.logo-figure {
		width: 80px;
		height: 80px;
		flex-shrink: 0;
		border-radius: 50%;
		overflow: hidden;
		background: #1a1d27;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-img {
		width: 56px;
		height: 56px;
		object-fit: contain;
		display: block;
		flex-shrink: 0;
	}

	.brand-title {
		color: #f0f4ff !important;
		font-weight: 700;
		letter-spacing: -0.3px;
		text-shadow: 0 0 20px rgba(255, 107, 26, 0.3);
	}

	.brand-subtitle {
		margin-bottom: 0 !important;
	}

	.brand-subtitle .tag {
		background: rgba(255, 255, 255, 0.07) !important;
		color: #a0aec0;
		border: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 0.72rem;
	}

	/* ── Divider ──────────────────────────────────────────────── */
	.divider-line {
		height: 1px;
		background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
		margin: 1.2rem 0;
	}

	/* ── Form ─────────────────────────────────────────────────── */
	.login-form .label {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin-bottom: 0.3rem;
	}

	.login-form .input {
		background: rgba(255, 255, 255, 0.06) !important;
		border-color: rgba(255, 255, 255, 0.12) !important;
		color: #e8eaf0 !important;
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease,
			background 0.25s ease;
	}

	.login-form .input::placeholder {
		color: rgba(255, 255, 255, 0.3);
	}

	.login-form .input:focus {
		background: rgba(255, 255, 255, 0.1) !important;
		border-color: #FF6B1A !important;
		box-shadow: 0 0 0 3px rgba(255, 107, 26, 0.22) !important;
	}

	.login-form .input.is-danger {
		border-color: #f14668 !important;
		box-shadow: 0 0 0 3px rgba(241, 70, 104, 0.18) !important;
	}

	.login-form .icon {
		color: rgba(255, 255, 255, 0.35) !important;
		transition: color 0.2s ease;
	}

	.login-form .input:focus ~ .icon {
		color: #00d1b2 !important;
	}

	.eye-icon {
		cursor: pointer;
		pointer-events: all;
		transition: color 0.2s ease;
	}

	.eye-icon:hover {
		color: #00d1b2 !important;
	}

	/* ── Error notification ───────────────────────────────────── */
	.error-notification {
		border-radius: 10px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0.9rem;
		font-size: 0.85rem;
		animation: shake 0.4s ease;
	}

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		20%       { transform: translateX(-6px); }
		40%       { transform: translateX(6px); }
		60%       { transform: translateX(-4px); }
		80%       { transform: translateX(4px); }
	}

	/* ── Login button ─────────────────────────────────────────── */
	.login-btn {
		background: linear-gradient(135deg, #FF6B1A, #FF3D00) !important;
		border: none !important;
		color: #fff !important;
		font-weight: 600;
		letter-spacing: 0.04em;
		height: 2.7rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			opacity 0.2s ease;
		box-shadow: 0 4px 18px rgba(255, 107, 26, 0.4);
	}

	.login-btn:not(:disabled):hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 28px rgba(255, 107, 26, 0.6);
	}

	.login-btn:not(:disabled):active {
		transform: translateY(0);
	}

	.login-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* ── Version tag ──────────────────────────────────────────── */
	.version-tag {
		font-size: 0.72rem;
		margin-top: 1rem;
		color: rgba(255, 255, 255, 0.3) !important;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
	}
</style>

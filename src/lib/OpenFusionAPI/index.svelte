<script>
	import { onMount } from 'svelte';
	import Login from '$lib/OpenFusionAPI/login/index.svelte';
	import Application from '$lib/OpenFusionAPI/Application/index.svelte';
	import { Notify } from '@edwinspire/svelte-components';
	import { get } from 'svelte/store';
	import { userStore, authEventStore } from '$lib/OpenFusionAPI/Application/utils/stores.js';
	import { isJwtExpiringSoon, getJwtExpiresInMinutes } from '$lib/OpenFusionAPI/Application/utils/jwtUtils.js';

	let page = $state('login');

	// Flag para evitar mostrar el aviso de expiración múltiples veces seguidas
	let tokenExpiryWarningShown = false;
	/** @type {ReturnType<typeof setInterval> | null} */
	let jwtWatcherInterval = null;

	/**
	 * Suscripción reactiva al store de eventos de autenticación.
	 * Detecta errores 401 y muestra la notificación correspondiente.
	 */
	$effect(() => {
		const unsubscribe = authEventStore.subscribe((event) => {
			if (!event) return;

			if (event.type === 'unauthorized') {
				Notify.push({
					message: '⛔ Sesión expirada o no autorizada (401). Por favor, vuelve a iniciar sesión.',
					color: 'danger',
					duration: 8000
				});
				// Reset del store para no repetir el mensaje
				authEventStore.set(null);
				// Volver a la pantalla de login
				page = 'login';
			}
		});

		return () => unsubscribe();
	});

	/**
	 * Inicia el watcher periódico que revisa si el JWT está próximo a expirar.
	 * Se ejecuta cada 30 segundos. Muestra alerta si quedan ≤5 minutos, y la cierra
	 * automáticamente después de 2 minutos (duration: 120000 ms).
	 */
	function startJwtWatcher() {
		stopJwtWatcher();
		tokenExpiryWarningShown = false;

		jwtWatcherInterval = setInterval(() => {
			const userData = /** @type {any} */ (get(userStore));
			const token = userData?.token;

			if (!token) return;

			if (isJwtExpiringSoon(token, 5) && !tokenExpiryWarningShown) {
				const minutesLeft = Math.max(0, Math.floor(getJwtExpiresInMinutes(token)));
				tokenExpiryWarningShown = true;

				Notify.push({
					message: `⚠️ Tu sesión expirará en aproximadamente ${minutesLeft} minuto${minutesLeft !== 1 ? 's' : ''}. Guarda tu trabajo.`,
					color: 'warning',
					duration: 120000 // 2 minutos
				});
			}

			// Resetear el flag cuando el token ya expiró o queda más de 5 min
			if (!isJwtExpiringSoon(token, 5)) {
				tokenExpiryWarningShown = false;
			}
		}, 30000); // Revisa cada 30 segundos
	}

	function stopJwtWatcher() {
		if (jwtWatcherInterval !== null) {
			clearInterval(jwtWatcherInterval);
			jwtWatcherInterval = null;
		}
	}

	onMount(() => {
		return () => stopJwtWatcher();
	});
</script>

<Notify></Notify>

{#if page === 'main'}
	<Application
		onexit={() => {
			stopJwtWatcher();
			page = 'login';
		}}
	/>
{:else}
	<Login
		onlogin={(login) => {
			console.log('LOGIN', login);
			if (login && login.login) {
				page = 'main';
				startJwtWatcher();
			} else {
				page = 'login';
			}
		}}
	/>
{/if}

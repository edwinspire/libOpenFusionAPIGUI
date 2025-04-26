<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { onMount } from 'svelte';
	import { userStore, getListMethods, getListHandler, url_paths } from '../utils.js';
	import logo from '../img/favicon.png';
	import { Notifications, Modal} from "@edwinspire/svelte-components";

let noty = new Notifications();
	let { onlogin = () => {} } = $props();
	let username = $state('');
	let password = $state('');
	let uf = new uFetch();
	let processing = $state({ waiting: false, error: null });

	async function handleSubmit() {
		try {
			processing.waiting = true;
			processing.error = '';

			let user = await uf.POST({ url: url_paths.login, data: { username, password } });
			let data = await user.json();

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
				noty.push({message: processing.error, color: 'danger'});
			}
		} catch (error) {
			console.trace(error);
			noty.push({message: error.message, color: 'danger'});
			processing.waiting = false;
			processing.error = error.message;
		}
	}

	onMount(() => {});
</script>



  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <strong>API Builder</strong>
      </a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasic" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#features">Características</a>
        <a class="navbar-item" href="#testimonials">Testimonios</a>
        <a class="navbar-item" href="#contact">Contacto</a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href="/login" class="button is-warning">Iniciar Sesión</a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <section class="hero is-fullheight">
    <div class="image-container"></div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">API Builder App</h1>
        <p class="subtitle is-4">Crea, configura y publica tus APIs fácilmente desde una interfaz web</p>
        <div class="buttons">
          <a href="https://github.com/tuusuario/apibuilder" class="button is-light is-large">Ver en GitHub</a>
          <a href="/login" class="button is-warning is-large">Iniciar Sesión</a>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="section">
    <div class="container">
      <h2 class="title is-2 has-text-centered">Características Destacadas</h2>
      <div class="columns is-multiline is-variable is-8">
        <div class="column is-one-quarter has-text-centered">
          <span class="icon feature-icon">
            <i class="fas fa-database"></i>
          </span>
          <h3 class="title is-4">Conexiones Integradas</h3>
          <p>Compatibilidad con MySQL, PostgreSQL, SQL Server, Oracle, SAP HANA y MongoDB.</p>
        </div>
        <div class="column is-one-quarter has-text-centered">
          <span class="icon feature-icon">
            <i class="fas fa-network-wired"></i>
          </span>
          <h3 class="title is-4">Servicios Web</h3>
          <p>Integración con servicios SOAP y REST para una conectividad completa.</p>
        </div>
        <div class="column is-one-quarter has-text-centered">
          <span class="icon feature-icon">
            <i class="fas fa-robot"></i>
          </span>
          <h3 class="title is-4">Inteligencia Artificial</h3>
          <p>Potenciado con LangChain para crear APIs asistidas por modelos de lenguaje.</p>
        </div>
        <div class="column is-one-quarter has-text-centered">
          <span class="icon feature-icon">
            <i class="fas fa-code"></i>
          </span>
          <h3 class="title is-4">Lógica Personalizada</h3>
          <p>Utiliza JavaScript para extender y personalizar la lógica de tus endpoints.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" class="section">
    <div class="container">
      <h2 class="title is-2 has-text-centered">Testimonios</h2>
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="testimonial">
            <p>"API Builder ha transformado la forma en que desarrollamos nuestras APIs. La integración con múltiples bases de datos y la facilidad de uso son excepcionales."</p>
            <p><strong>- Juan Pérez, Desarrollador Backend</strong></p>
          </div>
          <div class="testimonial">
            <p>"La capacidad de agregar lógica personalizada con JavaScript nos ha permitido adaptar las APIs exactamente a nuestras necesidades."</p>
            <p><strong>- María Gómez, Ingeniera de Software</strong></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <h2 class="title is-2 has-text-centered">Contáctanos</h2>
      <div class="columns is-centered">
        <div class="column is-half">
          <form action="#">
            <div class="field">
              <label class="label">Nombre</label>
              <div class="control">
                <input class="input" type="text" placeholder="Tu nombre">
              </div>
            </div>
            <div class="field">
              <label class="label">Correo</label>
              <div class="control">
                <input class="input" type="email" placeholder="tucorreo@dominio.com">
              </div>
            </div>
            <div class="field">
              <label class="label">Mensaje</label>
              <div class="control">
                <textarea class="textarea" placeholder="Tu mensaje"></textarea>
              </div>
            </div>
            <div class="field is-grouped is-justify-content-center">
              <div class="control">
                <button class="button is-link">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        API Builder App - Contribuye en <a href="https://github.com/tuusuario/apibuilder">GitHub</a>
      </p>
    </div>
  </footer>


<Modal show={false}>
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

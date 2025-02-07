<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { onMount } from 'svelte';
	import { url_paths } from '../../../utils.js';

	let uF;
	let vars_js = {};
	let mongo_example = `$_MONGOOSE_.connect('mongodb://127.0.0.1:27017/test'); <br/>
					
					const Cat = $_MONGOOSE_.model('Cat', { name: String }); <br/>
					
					const kitty = new Cat({ name: 'Zildjian' }); <br/>
					kitty.save().then(() => console.log('meow')); <br/>`;

	onMount(async () => {
		uF = new uFetch();

		let req_uf = await uF.GET({ url: url_paths.getlistFunctionsVarsJS });
		vars_js = await req_uf.json();
	});
</script>

<div class="content is-small">
	<h3>Predefined variables</h3>

	<ul>
		{#each Object.keys(vars_js) as key_var}
			<li>
				<strong>{key_var}</strong> <br />
				{vars_js[key_var].info}<br />
				More info on
				<a href={vars_js[key_var].web}>{vars_js[key_var].web}</a><br />
				{#if vars_js[key_var].warn}
					<strong>Warning:</strong> {vars_js[key_var].warn}
				{/if}

				{#if key_var == '$_GET_INTERNAL_URL_'}
					<br /> Example:
					<code
						>let relative_path = '/api/test/ap001';
						<br />let fullURL = $_GET_INTERNAL_URL_(relative_path);
						<br />// $_GET_INTERNAL_URL_ return 'http://localhost:3000/api/test/ap001'
					</code>
				{:else if key_var == '$_FETCH_OFAPI_'}
					<br />Example:
					<code>
						let url = 'http://example.net/api/test';
						<br />
						let fetch_instance = $_FETCH_OFAPI_(url);
					</code>
				{:else if key_var == '$_MONGOOSE_'}
				<br />
					Example:
					<code> {@html mongo_example}</code>
				{:else if key_var == '$_EXCEPTION_'}
					 Example:
					<code>$_EXCEPTION_('A parameter has not been entered', $_REQUEST_.body, 400);</code>
				{/if}
			</li>
			<br />
		{/each}
	</ul>
</div>

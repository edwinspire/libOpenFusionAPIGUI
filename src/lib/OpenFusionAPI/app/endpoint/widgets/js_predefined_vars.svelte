<script>
	import uFetch from '@edwinspire/universal-fetch';
	import { onMount } from 'svelte';
	import { url_paths } from '$lib/OpenFusionAPI/utils.js';

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

		console.log('vars_js', vars_js);
	});
</script>

{#snippet render_fn_method(fn_method)}
	<div>
		{#if fn_method.name}
			<span><strong>{fn_method.name}:</strong></span><br />
		{/if}
		{#if fn_method.info}
			{fn_method.info}<br />
		{/if}

		{#if fn_method.web}
			More information: <a href={fn_method.web}>{fn_method.web}</a> <br />
		{/if}

		{#if fn_method.params}
			<details>
				<summary>Parameters</summary>

				<div class="content_tab">
					<lu>
						{#each fn_method.params as param}
							<li>{@render render_params(param)}</li>
						{/each}</lu
					>
				</div>
			</details>
		{/if}

		{#if fn_method.return}
			<details>
				<summary>Return</summary>

				<div class="content_tab">
					{fn_method.return.info}<br />
					<span><strong>Value Type: </strong> {fn_method.return.value_type}</span><br /><br />
					{#if fn_method.return.object}
						{#each fn_method.return.object as obj}
							<span><strong>Name: </strong> {obj.name}</span><br />
							<span><strong>Information: : </strong> {obj.info}</span><br />
							<span><strong>Type: </strong> {obj.value_type}</span><br /><br />
						{/each}
					{/if}
				</div>
			</details>
			<br />
		{/if}

		{#if fn_method.example}
			<strong>Example:</strong>
			<code>{@html fn_method.example.replace(/\n/g, '<br/>')}</code>
		{/if}
	</div>
{/snippet}

{#snippet render_params(param_or_fn)}
	<span><strong>{param_or_fn.name}:</strong> {param_or_fn.info}</span>
	<span><strong>Required: </strong> {param_or_fn.required}</span>
	<span><strong>Type: </strong> {param_or_fn.value_type}</span>
	{#if param_or_fn.default_value}
		<span><strong>Default: </strong> {param_or_fn.default_value}</span>
	{/if}
{/snippet}

<div class="content is-small">
	<h3>Predefined variables</h3>

	<ul>
		{#each Object.keys(vars_js) as key_var}
			<li>
				<span class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-code"></i>
					</span>
					<span><strong>{key_var}</strong></span>
				</span>
				<br />
				{#if vars_js[key_var].class}
					<div>Class not implemented.</div>
				{:else}
					{@render render_fn_method(vars_js[key_var])}
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
				{/if}
			</li>
			<br />
		{/each}
	</ul>
</div>

<style>
	.content_tab {
		margin-left: 2em;
	}
</style>

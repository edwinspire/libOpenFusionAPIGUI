<script>
	import { EditorCode, PredictiveInput } from '@edwinspire/svelte-components';
	import { listAppVars } from '../../../utils.js';
	import { onMount } from 'svelte';

// TODO: es una propuesta pero no probada ni implementada aún

	let cnx_param_json = {};
	let cnx_param_var = '';
	let use_var_cnx = false;
	let Datavars = {};

	export let environment = 'dev';
	export let code = {};

	$: code, ParseCode();

	listAppVars.subscribe((value) => {
		console.log('> listAppVars > ', value);

		Datavars = {};

		if (value && value.dev) {
			Datavars.dev = Object.keys(value.dev).map((key) => {
				return { name: key, value: key };
			});
		}
        
		if (value && value.qa) {
			Datavars.qa = Object.keys(value.qa).map((key) => {
				return { name: key, value: key };
			});
		}
        
		if (value && value.prd) {
			Datavars.prd = Object.keys(value.prd).map((key) => {
				return { name: key, value: key };
			});
		}
	});

	function ParseCode() {
		try {
			if (code) {
				if (typeof code === 'object') {
					use_var_cnx = false;
					cnx_param_json = code;
				} else {
					use_var_cnx = true;
					cnx_param_var = code;
				}
			}
		} catch (error) {
			cnx_param_json = {};
			cnx_param_var = '';
			console.error('Error', error);
		}
	}

	onMount(() => {
		//	console.log(code);
		ParseCode();
	});
</script>

<div class="box">
	<div class="buttons has-addons">
		<button
			class="button is-small {use_var_cnx ? '' : 'is-active is-primary'}"
			on:click={() => {
				use_var_cnx = false;
			}}>JSON Parameters</button
		>
		<button
			class="button is-small {use_var_cnx ? 'is-active is-primary' : ''}"
			on:click={() => {
				use_var_cnx = true;
			}}>Use Variable</button
		>
	</div>

	{#if !use_var_cnx}
		<EditorCode isReadOnly={false} lang="json" bind:code={cnx_param_json}></EditorCode>
	{:else}
		{#if Datavars && environment && Datavars[environment]}
			<PredictiveInput
				label="Application: "
				classLabel="is-small"
				classInput="is-small"
				bind:options={Datavars[environment]}
				on:select={(/** @type {{ detail: { value: number; }; }} */ e) => {
					// console.log('>>>>>> Application > ', e.detail.value);
				}}
			/>
		{:else}
			Nada
		{/if}

		<div class="control has-icons-left">
			<input
				class="input is-small"
				type="text"
				placeholder="$_VAR_NAME"
				bind:value={cnx_param_var}
			/>
			<span class="icon is-small is-left">
				<i class="fa-regular fa-keyboard"></i>
			</span>
		</div>
	{/if}
</div>

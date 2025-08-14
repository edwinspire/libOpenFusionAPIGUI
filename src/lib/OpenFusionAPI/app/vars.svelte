<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { listAppVars } from '$lib/OpenFusionAPI/utils.js';
	//import EditorCode from '../widgets/editorCodeDecrepted.svelte';
	import CodeHTML from '$lib/OpenFusionAPI/app/widgets/codeHTML.svelte';
	import { EditorCode } from '@edwinspire/svelte-components';

	// export let vars = {};
	export let editable = false;
	export let environment = '';
	let Datavars = {};
	let fnEditorCodes = {};
	let showNewVar = false;
	let newVar = '';

	listAppVars.subscribe((value) => {
		//console.log('listAppVars ->>>>', value);
		// @ts-ignore
		Datavars = value || {};
	});

	export function getCode() {
		//fnEditorCode.apply();
		//return fnEditorCode.getCode();
		let codes = {};

		//console.log('>>> Datavars >>>', Datavars);

		/*
		Object.keys(fnEditorCodes).forEach((key) => {
			try {
				codes[key] = JSON.parse(fnEditorCodes[key].getCode());
			} catch (error) {
				console.warn(error, key, fnEditorCodes);
			}

			//return c;
		});
		*/
		return Datavars;
	}

	onMount(() => {});
</script>

<details>
	<summary
		><div class="field has-addons">
			<p class="control">
				{#if environment == 'dev'}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="button is-static is-small"> Development variables </a>
				{:else if environment == 'qa'}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="button is-static is-small"> Quality variables </a>
				{:else}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="button is-static is-small"> Production variables </a>
				{/if}
			</p>
			<p class="control">
				<button
					class="button is-small"
					on:click={() => {
						showNewVar = true;
						newVar = '';
					}}
				>
					New
				</button>
			</p>

			{#if showNewVar}
				<p class="control">
					<input
						class="input is-small"
						type="text"
						placeholder="Variable name"
						bind:value={newVar}
					/>
				</p>
				<p class="control">
					<button
						class="button is-small is-success"
						on:click={() => {
							if (newVar && newVar.startsWith('$_VAR')) {
								Datavars[environment][newVar] = {};
								showNewVar = false;
							} else {
								alert('The name must start with $_VAR');
							}
						}}
					>
						Accept
					</button>
				</p>
				<p class="control">
					<button
						class="button is-small is-danger"
						on:click={() => {
							showNewVar = false;
							newVar = '';
						}}
					>
						Cancel
					</button>
				</p>
			{/if}
		</div></summary
	>

	<div>
		{#if Datavars && Datavars[environment]}
			{#each Object.keys(Datavars[environment]) as varKey}
				{#if editable}
					<details>
						<summary><strong>{varKey}</strong></summary>

						<span>
							{#if false}
								<button
									class="button is-danger is-small"
									on:click={() => {
										// TODO: Hacer que funcione
										if (confirm('Are you sure you want to permanently delete the variables?')) {
											delete Datavars[environment][varKey];
										}
									}}
								>
									<span>Delete</span>
									<span class="icon is-small">
										<i class="fas fa-times"></i>
									</span>
								</button>
							{/if}
						</span>

						<!-- <EditorCode lang={'json'} code={JSON.stringify(Datavars[environment][varKey])}></EditorCode> -->
						<EditorCode lang={'json'} bind:code={Datavars[environment][varKey]}></EditorCode>
					</details>
				{:else}
					<details>
						<summary><strong>{varKey}</strong></summary>
						<CodeHTML bind:jsonObject={Datavars[environment][varKey]} />
					</details>
				{/if}
			{/each}
		{/if}
	</div>
</details>

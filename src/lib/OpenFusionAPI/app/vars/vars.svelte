<script>
	import { onMount } from 'svelte';
	import { EditorCode, Level, copyTextToClipboard } from '@edwinspire/svelte-components';

	export let isReadOnly = false;
	export let showCode = false;
	export let appVars = {};
	export let title = '';
	let new_var_name = '';
	let edit_var_name = {};
	let change_var_name = {};
	let classAnimationCopyName = '';
	let classAnimationCopyValue = '';

	export function getCode() {
		//	console.log('getCode >>>> ', appVars);
		return appVars;
	}

	function removeVar(varName) {
		delete appVars[varName];
		appVars = appVars;
	}

	onMount(() => {
		//setCode();

	});
</script>

{#if appVars}
	<Level>
		<div slot="l01">{title}</div>

		<div slot="r01">
			{#if !isReadOnly}
				<div class="field has-addons">
					<div class="control">
						<button class="button is-small is-static"> $_VAR_ </button>
					</div>

					<div class="control">
						<input
							class="input is-small"
							type="text"
							placeholder="New app variable"
							bind:value={new_var_name}
						/>
					</div>
					<div class="control">
						<button
							class="button is-success is-small"
							on:click={() => {
								// Verificar que la variable no exista
								let var_full_name = '$_VAR_' + new_var_name.toUpperCase();
								if (appVars[var_full_name]) {
									alert('Var ' + var_full_name + ' already exists.');
								} else {
									appVars[var_full_name] = {};
								}
							}}
						>
							New
						</button>
					</div>
				</div>
			{/if}
		</div></Level
	>

	<div class="box">
		{#each Object.keys(appVars) as varname}
			{#if appVars[varname]}
				<EditorCode {showCode} bind:isReadOnly bind:code={appVars[varname]}>
					<span slot="left">
						<div class="field has-addons">
							<!-- svelte-ignore a11y-missing-attribute -->
							<p class="control"><a class="button is-static is-small"> {varname} </a></p>

							{#if !isReadOnly}
								{#if change_var_name[varname]}
									<p class="control">
										<input
											class="input is-success is-small"
											type="text"
											placeholder="Edit variable name"
											bind:value={edit_var_name[varname]}
										/>
									</p>

									<p class="control">
										<button
											class="button is-small is-outlined is-success"
											title="Apply"
											on:click={() => {
												appVars[edit_var_name[varname]] = { ...edit_var_name[varname] };
												removeVar(varname);
											}}
										>
											<span class="icon is-small">
												<i class="fa-solid fa-check"></i>
											</span>
										</button>
									</p>

									<p class="control">
										<button
											class="button is-small is-outlined is-danger"
											title="Cancel"
											on:click={() => {
												change_var_name[varname] = false;
											}}
										>
											<span class="icon is-small">
												<i class="fa-solid fa-xmark"></i>
											</span>
										</button>
									</p>
								{:else}
									<p class="control">
										<button
											class="button is-small"
											title="Edit variable name"
											on:click={() => {
												change_var_name[varname] = change_var_name[varname] ? false : true;
												edit_var_name[varname] = varname;
											}}
										>
											<span class="icon is-small">
												<i class="fa-solid fa-pen"></i>
											</span>
										</button>
									</p>
								{/if}
							{/if}

							<p class="control">
								<button
									class="button is-small"
									title="Copy Name"
									on:click={async () => {
										let rc = await copyTextToClipboard(varname);
										console.log(rc);
										if (rc.result) {
											classAnimationCopyName = varname;
											setTimeout(() => {
												classAnimationCopyName = '';
											}, 1500);
										}
									}}
								>
									<span class="icon is-small has-text-info">
										<i
											class="fa-solid fa-copy {classAnimationCopyName == varname
												? ' fa-shake '
												: ''}"
										></i>
									</span>
								</button>
							</p>

							<p class="control">
								<button
									class="button is-small has-text-success"
									title="Copy Value"
									on:click={async () => {
										let rc = await copyTextToClipboard(
											appVars[varname] ? JSON.stringify(appVars[varname]) : ''
										);
										console.log(rc);
										if (rc.result) {
											classAnimationCopyValue = varname;
											setTimeout(() => {
												classAnimationCopyValue = '';
											}, 1500);
										}
									}}
								>
									<span class="icon is-small">
										<i
											class="fa-regular fa-copy {classAnimationCopyValue == varname
												? ' fa-shake '
												: ''}"
										></i>
									</span>
								</button>
							</p>
						</div>
					</span>

					<span slot="right">
						{#if !isReadOnly}
							<div class="field has-addons">
								<p class="control">
									<button
										class="button is-small is-outlined is-danger"
										title="Delete variable"
										on:click={() => {
											if (
												confirm('Are you sure you want to remove the variable ' + varname + '?')
											) {
												//	console.log(appVars[varname]);
												removeVar(varname);
											}
										}}
									>
										<span class="icon is-small">
											<i class="fa-solid fa-trash"></i>
										</span>
									</button>
								</p>
							</div>
						{/if}
					</span>
				</EditorCode>
				<hr class="reset_margin" />
			{/if}
		{/each}
	</div>
{/if}

<style>
	.reset_margin {
		margin: auto;
	}
</style>

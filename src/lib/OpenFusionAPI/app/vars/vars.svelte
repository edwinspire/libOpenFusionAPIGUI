<script>
	import { onMount } from 'svelte';
	import { EditorCode, Level, copyTextToClipboard } from '@edwinspire/svelte-components';

	let {
		isReadOnly = $bindable(false),
		showCode = $bindable(false),
		appVars = $bindable({}),
		title = $bindable('')
	} = $props();

	let new_var_name = $state('');
	let edit_var_name = {};
	let change_var_name = {};
	let classAnimationCopyName = $state('');
	let classAnimationCopyValue = $state('');

	export function getCode() {
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
	<Level left={[l01]} right={[r01]}>
		{#snippet l01()}
			{title}
		{/snippet}

		{#snippet r01()}
			<div>
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
								onclick={() => {
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
			</div>
		{/snippet}
	</Level>

	<div class="box">
		{#each Object.keys(appVars) as varname}
			{#if appVars[varname]}
				
				<EditorCode
					left={left_Editor}
					right={right_Editor}
					{showCode}					
					showFormat={false}
					{isReadOnly}
					bind:code={appVars[varname]}
					lang='json'
				>
					{#snippet left_Editor()}
						<span>
							<div class="field has-addons">
								<!-- svelte-ignore a11y_missing_attribute -->
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
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												class="button is-small is-outlined is-success"
												title="Apply"
												onclick={() => {
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
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												class="button is-small is-outlined is-danger"
												title="Cancel"
												onclick={() => {
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
											<!-- svelte-ignore a11y_consider_explicit_label -->
											<button
												class="button is-small"
												title="Edit variable name"
												onclick={() => {
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
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="button is-small"
										title="Copy Name"
										onclick={async () => {
											let rc = await copyTextToClipboard(varname);

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
									<!-- svelte-ignore a11y_consider_explicit_label -->
									<button
										class="button is-small has-text-success"
										title="Copy Value"
										onclick={async () => {
											let rc = await copyTextToClipboard(
												appVars[varname] ? JSON.stringify(appVars[varname]) : ''
											);

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
					{/snippet}

					{#snippet right_Editor()}
						<span>
							{#if !isReadOnly}
								<div class="field has-addons">
									<p class="control">
										<!-- svelte-ignore a11y_consider_explicit_label -->
										<button
											class="button is-small is-outlined is-danger"
											title="Delete variable"
											onclick={() => {
												if (
													confirm('Are you sure you want to remove the variable ' + varname + '?')
												) {
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
					{/snippet}
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

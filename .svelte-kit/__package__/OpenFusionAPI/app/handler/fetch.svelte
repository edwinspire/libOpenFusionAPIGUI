<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Tab } from '@edwinspire/svelte-components';
	import Vars from '../vars.svelte';
	import { parse } from 'svelte/compiler';

	/**
	 * @type {any}
	 */
	export let code;
	export let environment;
	export let row;

	let tabList = [{ label: 'Url', isActive: true }, { label: 'App Variables' }];

	let internal_code = '';

	$: code, parseCode();

	export function reset() {
		//	fnEditorCode.reset();
		internal_code = code;
	}

	export function getCode() {
		//fnEditorCode.apply();
		return internal_code;
	}

	function parseCode() {
		internal_code = code;
		console.log('>>>>>>>>', code, internal_code);
	}

	onMount(() => {
		//	console.log(code);
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<div>
			<h3 class="subtitle is-5">
				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-link"></i>
					</span>
					<span>{row.endpoint}</span>
				</div>
			</h3>
		</div>
<br/>
		<div class="field">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">Url to make the request. The operation is similar to a proxy</label>
			<div class="control has-icons-right">
				<input
					class="input is-small"
					type="text"
					placeholder="http://your.url/path"
					bind:value={internal_code}
				/>
				<span class="icon is-small is-right">
					<i class="fa-solid fa-globe"></i>
				</span>
			</div>
		</div>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<Vars bind:environment />
	</div>
</Tab>

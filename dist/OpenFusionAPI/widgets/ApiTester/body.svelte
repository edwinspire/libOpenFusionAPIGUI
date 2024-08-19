<script>
	import { onMount } from 'svelte';
	import { Tab } from '@edwinspire/svelte-components';
	import { EditorCode } from '@edwinspire/svelte-components';

	import KeyValue from './key_value/kv.svelte';

	export let parameters = {};
	let fileName = '';

	let tabList = [
		{ label: 'JSON', isActive: true },
		{ label: 'XML' },
		{ label: 'Text' },
		{ label: 'Form-Encode' },
		{ label: 'Binary' }
	];

	export function getCode() {
		//    console.log(">> getCode en JS.SVELTE ", );
		return fnEditorCodeOld.getCode();
	}

	export function reset() {
		fnEditorCodeOld.reset();
	}

	onMount(() => {
		if (!parameters) {
			parameters = { js: {}, xml: {}, text: {} };
		}

		if (parameters && !parameters.js) {
			parameters.js = {};
		}

		if (parameters && !parameters.xml) {
			parameters.xml = {};
		}

		if (parameters && !parameters.text) {
			parameters.text = {};
		}
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		{#if parameters.js}
			<EditorCode lang="js" bind:code={parameters.js.code}></EditorCode>
		{/if}
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		{#if parameters.xml}
			<EditorCode lang="xml" bind:code={parameters.xml.code}></EditorCode>
		{/if}
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<div class="field">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label is-small">Content</label>
			<div class="control">
				{#if parameters.text}
					<textarea
						class="textarea is-small"
						placeholder="Content"
						bind:value={parameters.text.value}
					></textarea>
				{/if}
			</div>
		</div>
	</div>

	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<KeyValue></KeyValue>
	</div>

	<div class={tabList[4].isActive ? '' : 'is-hidden'}>
		<div class="file has-name is-small">
			<label class="file-label">
				<input
					class="file-input is-small"
					type="file"
					name="resume"
					on:change={(e) => {
					
						if (e.target.files.length > 0) {
							fileName = e.target.files[0].name;
						}
					}}
				/>
				<span class="file-cta">
					<span class="file-icon is-small">
						<i class="fas fa-upload"></i>
					</span>
					<span class="file-label"> Choose a file… </span>
				</span>
				<span class="file-name">{fileName}</span>
			</label>
		</div>
	</div>
</Tab>

<script>
	import {
		Tab,
		EditorCode,
		PredictiveInput,
		Input,
		Notifications,
		Level
	} from '@edwinspire/svelte-components';

	let notify = new Notifications();

	let { endpoint = $bindable({}), onchange = () => {} } = $props();

	const mimeTypes = [
		{ id: 'text/plain', value: 'text/plain', enabled: true, editor: 'text' },
		{ id: 'text/html', value: 'text/html', enabled: true, editor: 'html' },
		{ id: 'text/css', value: 'text/css', enabled: true, editor: 'text' },
		{ id: 'text/javascript', value: 'text/javascript', enabled: true, editor: 'js' },
		{ id: 'text/xml', value: 'text/xml', enabled: true, editor: 'xml' },
		{ id: 'application/wsdl+xml', value: 'application/wsdl+xml', enabled: true, editor: 'xml' },
		{ id: 'text/csv', value: 'text/csv', enabled: true, editor: 'text' },
		{ id: 'text/markdown', value: 'text/markdown', enabled: true, editor: 'text' },
		{ id: 'text/cache-manifest', value: 'text/cache-manifest', enabled: true, editor: 'text' },
		{ id: 'text/calendar', value: 'text/calendar', enabled: true, editor: 'text' },
		{
			id: 'text/vnd.sun.j2me.app-descriptor',
			value: 'text/vnd.sun.j2me.app-descriptor',
			enabled: true,
			editor: 'text'
		},
		{ id: 'text/vnd.wap.wml', value: 'text/vnd.wap.wml', enabled: true, editor: 'text' },
		{
			id: 'text/vnd.wap.wmlscript',
			value: 'text/vnd.wap.wmlscript',
			enabled: true,
			editor: 'text'
		},
		{ id: 'text/x-asm', value: 'text/x-asm', enabled: true, editor: 'text' },
		{ id: 'text/x-c', value: 'text/x-c', enabled: true, editor: 'text' },
		{ id: 'text/x-fortran', value: 'text/x-fortran', enabled: true, editor: 'text' },
		{ id: 'text/x-java-source', value: 'text/x-java-source', enabled: true, editor: 'text' },
		{ id: 'text/x-markdown', value: 'text/x-markdown', enabled: true, editor: 'text' },
		{ id: 'text/x-nfo', value: 'text/x-nfo', enabled: true, editor: 'text' },
		{ id: 'text/x-opml', value: 'text/x-opml', enabled: true, editor: 'text' },
		{ id: 'text/x-pascal', value: 'text/x-pascal', enabled: true, editor: 'text' },
		{ id: 'text/x-script', value: 'text/x-script', enabled: true, editor: 'text' },
		{ id: 'text/x-script.perl', value: 'text/x-script.perl', enabled: true, editor: 'text' },
		{ id: 'text/x-script.python', value: 'text/x-script.python', enabled: true, editor: 'text' },
		{
			id: 'text/x-server-parsed-html',
			value: 'text/x-server-parsed-html',
			enabled: true,
			editor: 'html'
		},
		{ id: 'text/x-setext', value: 'text/x-setext', enabled: true, editor: 'text' },
		{ id: 'text/x-sfv', value: 'text/x-sfv', enabled: true, editor: 'text' },
		{ id: 'text/x-uuencode', value: 'text/x-uuencode', enabled: true, editor: 'text' },
		{ id: 'text/x-vcalendar', value: 'text/x-vcalendar', enabled: true, editor: 'text' },
		{ id: 'text/x-vcard', value: 'text/x-vcard', enabled: true, editor: 'text' },
		{ id: 'text/troff', value: 'text/troff', enabled: true, editor: 'text' },
		{ id: 'text/x-component', value: 'text/x-component', enabled: true, editor: 'text' }
	];

	let tabList = $state([{ label: 'Payload', isActive: true, component: tab_payload }]);

	let payload = $state('');
	let custom_data = $state({ mimeType: 'text/plain' });
	let file_selected = $state(undefined);

	// langEditor se calcula automáticamente según mimeType
	let langEditor = $derived(mimeTypes.find((m) => m.id === custom_data.mimeType)?.editor ?? 'text');

	$effect(() => {
		endpoint?.code;
		endpoint?.custom_data;
		parseCode();
	});

	function parseCode() {
		payload = endpoint.code ?? '';
		custom_data = endpoint.custom_data ?? {};
		custom_data.mimeType = custom_data.mimeType ?? 'text/plain';
		custom_data.fileName = custom_data.fileName ?? '';
	}

	function getData() {
		//	console.trace('getData', file_selected);

		return {
			code: payload,
			custom_data: custom_data,
			data_test: $state.snapshot(endpoint.data_test),
			File: file_selected
		};
	}

	function fnOnChange() {
		onchange(getData());
	}
</script>

{#snippet tab_payload()}
	<div>
		<div>
			<div>
				<div class="content is-small">Plain Text that will be returned by the Endpoint.</div>
			</div>
		</div>

		<EditorCode
			lang={langEditor}
			bind:code={payload}
			showFormat={true}
			onchange={(c) => {
				fnOnChange();
			}}
		></EditorCode>
	</div>
{/snippet}

{#snippet left_buttons()}
	<div class="field has-addons">
		<p class="control">
			<button
				class="button is-small {!custom_data.isBase64 ? 'is-primary' : ''}"
				onclick={() => {
					custom_data.isBase64 = false;
					custom_data.fileName = undefined;
					file_selected = undefined;
					fnOnChange();
				}}
			>
				<span class="icon is-small">
					<i class="fa fa-file-alt"></i>
				</span>
				<span>As Text Plain</span>
			</button>
		</p>

		<p class="control">
			<button
				class="button is-small {custom_data.isBase64 ? 'is-primary' : ''}"
				onclick={() => {
					custom_data.isBase64 = true;
					custom_data.fileName = '';
					fnOnChange();
				}}
			>
				<span class="icon is-small">
					<i class="fas fa-file-invoice"></i>
				</span>
				<span>As File</span>
			</button>
		</p>
	</div>
{/snippet}

{#snippet right_predictive()}
	<div>
		<Input
			accept="*"
			label="Load from file"
			showUploadButton={false}
			type="file"
			title="Select file"
			placeholder="Select file"
			onchange={(c) => {
				const selectedFile = c.target.files[0];
				if (!selectedFile) {
					custom_data.fileName = '';
					file_selected = undefined;
					return;
				}

				const MAX_SIZE = 1048576; // 1MB
				if (selectedFile.size > MAX_SIZE) {
					notify.push({ message: 'The selected file exceeds the 1MB limit.', color: 'danger' });
					file_selected = undefined;
					custom_data.fileName = '';
					c.target.value = ''; // Clears the file input in the UI
					return;
				}

				const mimeType = selectedFile.type || 'application/octet-stream';
				const isText =
					mimeType.startsWith('text/') ||
					mimeType === 'application/json' ||
					mimeType === 'application/javascript' ||
					mimeType === 'application/xml';

				if (isText) {
					const reader = new FileReader();
					reader.onload = (e) => {
						payload = e.target.result;
						custom_data.isBase64 = false;
						custom_data.fileName = undefined;
						file_selected = undefined;
						c.target.value = ''; // Clear input so it can be re-selected if needed
						custom_data.mimeType = mimeType;
						fnOnChange();
					};
					reader.readAsText(selectedFile);
					return;
				}

				file_selected = selectedFile;
				custom_data.fileName = selectedFile.name;
				custom_data.mimeType = mimeType;
				custom_data.isBase64 = true;
				fnOnChange();
			}}
		/>
	</div>
{/snippet}

<Level left={[left_buttons]} right={[right_predictive]}></Level>

<PredictiveInput
	label="MIME Type"
	options={mimeTypes.map((m) => ({ ...m, name: m.value }))}
	bind:selectedValue={custom_data.mimeType}
	freeTyping={true}
	onselect={() => {
		fnOnChange();
	}}
/>

{#if custom_data && custom_data.isBase64}
	{#if custom_data.fileName}
		<div class="buttons has-addons">
			<button class="button is-small is-static">Filename</button>
			<button class="button is-small">{custom_data.fileName}</button>
		</div>
	{/if}
{:else}
	<Tab bind:tabs={tabList}></Tab>
{/if}

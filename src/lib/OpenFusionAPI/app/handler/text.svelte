<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab } from '@edwinspire/svelte-components';
	import Vars from '../vars.svelte';
	import EditorCode2 from '../../widgets/editorCodeDecrepted.svelte';
	import SelectMimeType from '../../widgets/Select.svelte';

	/**
	 * @type {any}
	 */
	export let code;
	export let environment;
	export let row;
	/**
	 * @type {EditorCode}
	 */
	let fnEditorCode;

	let mimeTypes = [
		{ id: 'text/plain', value: 'text/plain', enabled: true },
		{ id: 'text/html', value: 'text/html', enabled: true },
		{ id: 'text/css', value: 'text/css', enabled: true },
		{ id: 'text/javascript', value: 'text/javascript', enabled: true },
		{ id: 'text/xml', value: 'text/xml', enabled: true },
		{ id: 'application/wsdl+xml', value: 'application/wsdl+xml', enabled: true },
		{ id: 'text/csv', value: 'text/csv', enabled: true },
		{ id: 'text/markdown', value: 'text/markdown', enabled: true },
		{ id: 'text/cache-manifest', value: 'text/cache-manifest', enabled: true },
		{ id: 'text/calendar', value: 'text/calendar', enabled: true },
		{
			id: 'text/vnd.sun.j2me.app-descriptor',
			value: 'text/vnd.sun.j2me.app-descriptor',
			enabled: true
		},
		{ id: 'text/vnd.wap.wml', value: 'text/vnd.wap.wml', enabled: true },
		{ id: 'text/vnd.wap.wmlscript', value: 'text/vnd.wap.wmlscript', enabled: true },
		{ id: 'text/x-asm', value: 'text/x-asm', enabled: true },
		{ id: 'text/x-c', value: 'text/x-c', enabled: true },
		{ id: 'text/x-fortran', value: 'text/x-fortran', enabled: true },
		{ id: 'text/x-java-source', value: 'text/x-java-source', enabled: true },
		{ id: 'text/x-markdown', value: 'text/x-markdown', enabled: true },
		{ id: 'text/x-nfo', value: 'text/x-nfo', enabled: true },
		{ id: 'text/x-opml', value: 'text/x-opml', enabled: true },
		{ id: 'text/x-pascal', value: 'text/x-pascal', enabled: true },
		{ id: 'text/x-script', value: 'text/x-script', enabled: true },
		{ id: 'text/x-script.perl', value: 'text/x-script.perl', enabled: true },
		{ id: 'text/x-script.python', value: 'text/x-script.python', enabled: true },
		{ id: 'text/x-server-parsed-html', value: 'text/x-server-parsed-html', enabled: true },
		{ id: 'text/x-setext', value: 'text/x-setext', enabled: true },
		{ id: 'text/x-sfv', value: 'text/x-sfv', enabled: true },
		{ id: 'text/x-uuencode', value: 'text/x-uuencode', enabled: true },
		{ id: 'text/x-vcalendar', value: 'text/x-vcalendar', enabled: true },
		{ id: 'text/x-vcard', value: 'text/x-vcard', enabled: true },
		{ id: 'text/troff', value: 'text/troff', enabled: true },
		{ id: 'text/x-component', value: 'text/x-component', enabled: true }
	];

	let tabList = [{ label: 'Payload', isActive: true }, { label: 'App Variables' }];

	export function reset() {
		fnEditorCode2.reset();
	}

	/**
	 * @type {EditorCode}
	 */
	let fnEditorCode2;
	let mimeType = 'text/plain';
	let payload = '';
	let langEditor = 'txt';
	$: code, ParseCode();

	function ParseCode() {
		try {
			let params = JSON.parse(code || '{}');

			if (params && params.payload) {
				payload = params.payload;
			}

			if (params && params.mimeType) {
				mimeType = params.mimeType;
			}
		} catch (error) {
			mimeType = 'text/plain';
			payload = '';
			console.error('Error', error);
		}
	}

	export function getCode() {
		let textCode = fnEditorCode2.getCode();
		let conf = {};
		let outcode = {};

		try {
			outcode.mimeType = mimeType;
			outcode.payload = textCode;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.log(error);
			return code;
		}
	}

	onMount(() => {
		console.log(code);
		ParseCode();
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<EditorCode2 bind:lang={langEditor} bind:code={payload} bind:this={fnEditorCode2}>
			<div slot="message">
				<h3 class="subtitle is-5">
					<div class="icon-text">
						<span class="icon has-text-info">
							<i class="fa-solid fa-link"></i>
						</span>
						<span>{row.endpoint}</span>
					</div>
				</h3>

				<div>
					<div class="field is-horizontal">
						<div class="field-label is-small">
							<label class="label">MIME Type</label>
						</div>
						<div class="field-body">
							<div class="field is-narrow">
								<div class="control">
									<div class="is-fullwidth">
										<SelectMimeType
											bind:options={mimeTypes}
											bind:option={mimeType}
											on:select={(e) => {
												console.log('Cambia', e, mimeType);

												if (mimeType.includes('xml')) {
													langEditor = 'xml';
													console.warn('langEditor', langEditor);
												}
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="content is-small">Plain Text that will be returned by the Endpoint.</div>
				</div>
			</div></EditorCode2
		>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<Vars bind:environment />
	</div>
</Tab>

<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '../../app_vars.svelte';
	import SelectMimeType from '../../../widgets/Select.svelte';
	import WarnPrd from './warning_production.svelte';

	let { row = $bindable({}), onchange = () => {} } = $props();

	let mimeTypes = $state([
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
	]);

	let tabList = $state([
		{ label: 'Payload', isActive: true, component: tab_payload },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Tester', component: tab_tester }
	]);

	/**
	 * @type {EditorCode}
	 */
	//let fnEditorCode2;
	let mimeType = $state('text/plain');
	let payload = $state('');
	let langEditor = $state('txt');
	//$: row.code, parseCode();

	$inspect(row.code).with((type) => {
		//console.log('row.code >>>>>>>>>>>>> ', type, row);
		if (type === 'update' || type === 'init') {
			parseCode();
		}
	});

	export function reset() {
		//	fnEditorCode2.reset();
		parseCode();
	}

	function parseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

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
		//let textCode = fnEditorCode2.getCode();
		let conf = {};
		let outcode = {};

		try {
			outcode.mimeType = mimeType;
			outcode.payload = payload;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.log(error);
			return row.code;
		}
	}

	function getData() {
		return { code: $state.snapshot(getCode()), data_test: $state.snapshot(row.data_test) };
	}

	function fnOnChange() {
		onchange(getData());
	}

	onMount(() => {
		//console.log(code);
		parseCode();
	});
</script>

{#snippet tab_payload()}
	<div>
		<div>
			<div>
				<div class="field is-horizontal">
					<div class="field-label is-small">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="label">MIME Type</label>
					</div>
					<div class="field-body">
						<div class="field is-narrow">
							<div class="control">
								<div class="is-fullwidth">
									<SelectMimeType
										bind:options={mimeTypes}
										bind:option={mimeType}
										onselect={(e) => {
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
		</div>

		<EditorCode bind:lang={langEditor} bind:code={payload}></EditorCode>
	</div>
{/snippet}

{#snippet tab_app_vars()}
	<AppVars environment={row.environment} isReadOnly={true}></AppVars>
{/snippet}

{#snippet tab_tester()}
	<div>
		<WarnPrd bind:environment={row.environment}></WarnPrd>
		<RESTTester
			bind:data={row.data_test}
			method={row.method}
			url={row.endpoint}
			methodDisabled={true}
			onchange={(c) => {
				//console.log('++++++++++++++++ ', c);
				fnOnChange();
			}}
		></RESTTester>
	</div>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

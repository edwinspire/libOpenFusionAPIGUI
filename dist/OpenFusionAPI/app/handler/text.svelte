<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab, EditorCode, RESTTester } from '@edwinspire/svelte-components';
	import AppVars from '../app_vars.svelte';
	import SelectMimeType from '../../widgets/Select.svelte';
	import WarnPrd from './warning_production.svelte';	


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
	//let internal_code = code;
	let fnApiTester;
	let internal_data_test;

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

	let tabList = [{ label: 'Payload', isActive: true }, { label: 'App Variables' }, 		{ label: 'Tester' }];

	/**
	 * @type {EditorCode}
	 */
	//let fnEditorCode2;
	let mimeType = 'text/plain';
	let payload = code;
	let langEditor = 'txt';
	$: code, ParseCode();
	$: row.data_test, setDataTest();

	 function setDataTest() {
		internal_data_test = { ...row.data_test };
		console.log('internal_data_test', internal_data_test);
	}

	export function reset() {
		//	fnEditorCode2.reset();
		ParseCode();
	}



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
		//let textCode = fnEditorCode2.getCode();
		let conf = {};
		let outcode = {};

		try {
			outcode.mimeType = mimeType;
			outcode.payload = payload;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.log(error);
			return code;
		}
	}

	onMount(() => {
		//console.log(code);
		ParseCode();
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

			<div>
				<div class="field is-horizontal">
					<div class="field-label is-small">
						<!-- svelte-ignore a11y-label-has-associated-control -->
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
		</div>

		 <EditorCode bind:lang={langEditor} bind:code={payload}></EditorCode> 
		
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<AppVars {environment} isReadOnly={true}></AppVars>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>

		<WarnPrd bind:environment></WarnPrd>

		<RESTTester
			bind:this={fnApiTester}
			bind:data={internal_data_test}
			bind:method={row.method}
			url={row.endpoint}
		></RESTTester>
	</div>

</Tab>

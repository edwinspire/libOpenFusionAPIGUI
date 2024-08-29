<script>
	import { Tab, Table } from '@edwinspire/svelte-components';
	import Query from './key_value/kv.svelte';
	import Headers from './key_value/kv.svelte';
	import Auth from './auth.svelte';
	import Body from './body.svelte';
	import uFetch from '@edwinspire/universal-fetch';
	import JSONView from '../codeHTML.svelte';

	export let url;
	export let method = 'GET';
	export let data = { query: [], headers: [], auth: {}, body: {} };

	let uF = new uFetch();
	let last_response;
	let time_responde;
	let response_as = 'json';
	let active_tab = 0;
	let data_result = '';
	let running = false;
	let sizeKBResponse = 0;
	let limitSizeResponseView = 20000;

	let tabList = [
		{ label: 'Query Parameters', isActive: true },
		{ label: 'HTTP Headers' },
		{ label: 'Auth' },
		{ label: 'Body' },
		{ label: 'Result' }
	];

	function getSizeJSON(data) {
		// Convertimos el JSON a una cadena
		const jsonString = JSON.stringify(data);
		return getSizeString(jsonString);
	}

	function getSizeString(text) {
		// Calculamos el tamaño en bytes
		const sizeInBytes = new TextEncoder().encode(text).length;

		// Convertimos a kilobytes
		const sizeInKB = (sizeInBytes / 1024).toFixed(4);
		return sizeInKB;
	}

	// Función para descargar el archivo
	function downloadFile(text, file_name, type = 'text/plain') {
		// Crear un blob con el contenido
		const blob = new Blob([text], { type: type });
		// Crear una URL para el blob
		const url = URL.createObjectURL(blob);

		// Crear un elemento <a> para iniciar la descarga
		const a = document.createElement('a');
		a.href = url;
		a.download = file_name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Liberar la URL
		URL.revokeObjectURL(url);
	}

	function getDataSend(data_table) {
		let result = {};
		//		console.log(data_table);
		if (data_table && Array.isArray(data_table)) {
			for (let i = 0; i < data_table.length; i++) {
				if (data_table[i].enabled && data_table[i].key && data_table[i].key.length > 0) {
					result[data_table[i].key] = data_table[i].value;
				}
			}
		}

		return result;
	}

	function existsData(data_table) {
		if (data_table && Array.isArray(data_table)) {
			return data_table.find((element) => element.enabled && element.key && element.key.length > 0);
		} else {
			return false;
		}
	}
</script>

<div class="block">
	<div class="is-flex is-justify-content-flex-end">
		<div class="field has-addons">
			<p class="control">
				<button class="button is-static is-small"> Response as: </button>
			</p>

			<p class="control">
				<span class="select is-small">
					<select bind:value={response_as}>
						<!-- <option value="arrayBuffer">arrayBuffer</option> -->
						<!-- <option value="blob">blob</option> -->
						<!-- <option value="formData">formData</option> -->
						<option value="json">json</option>
						<option value="datatable">Data table</option>
						<option value="text">text</option>
					</select>
				</span>
			</p>
			<p class="control">
				<button
					class="button is-success is-small is-outlined"
					on:click={async () => {
						active_tab = 4;

						if (!running) {
							running = true;
							let data_send = {};

							try {
								if (
									method == 'GET' ||
									method == 'HEAD' ||
									method == 'OPTIONS' ||
									method == 'CONNECT' ||
									method == 'TRACE'
								) {
									data_send = getDataSend(data.query);
								} else if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
									// Pueden tener tanto query como body
									// Preferir body en lugar de query

									if (existsData(data.body)) {
										data_send = getDataSend(data.query);
									} else {
										data_send = getDataSend(data.body);
									}
								}

								console.log(data_send, url, method);
								// Capturamos el tiempo inicial
								let startTime = Date.now();
								last_response = await uF[method]({ url: url, data: data_send });
								// Capturamos el tiempo final
								let endTime = Date.now();

								// Calculamos la diferencia en milisegundos
								time_responde = endTime - startTime;

								//console.warn(last_response.headers);

								if (last_response.ok) {
									switch (response_as) {
										case 'json':
											data_result = await last_response.json();
											sizeKBResponse = getSizeJSON(data_result);
											break;
										case 'text':
											data_result = await last_response.text();
											break;
										case 'datatable':
											data_result = await last_response.json();
											sizeKBResponse = getSizeJSON(data_result);
											break;
										default:
											data_result = '';
											break;
									}

									console.log(last_response, data_result);
								}
							} catch (error) {
								running = false;
								console.error(error);
								alert(error);
							}

							running = false;
						} else {
							alert('There is an execution in progress');
						}
					}}
				>
					<span class="icon is-small">
						{#if running}
							<i class="fa-solid fa-cog fa-spin"></i>
						{:else}
							<i class="fa-solid fa-play"></i>
						{/if}
					</span>
					<span>Execute</span>
				</button>
			</p>
		</div>
	</div>
</div>

<div class="field has-addons">
	<p class="control">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="button is-static is-small"> Url </a>
	</p>
	<p class="control is-expanded">
		<input
			class="input is-small is-expanded"
			type="text"
			placeholder="Application name"
			bind:value={url}
		/>
	</p>
</div>

<Tab bind:tabs={tabList} bind:active={active_tab}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<Query bind:data={data.query}></Query>
	</div>
	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<Headers bind:data={data.headers}></Headers>
	</div>
	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<Auth bind:data={data.auth}></Auth>
	</div>
	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<Body bind:data={data.body}></Body>
	</div>

	<div class={tabList[4].isActive ? '' : 'is-hidden'}>
		<div class="field is-grouped is-grouped-multiline">
			<div class="control">
				<div class="tags has-addons">
					<span class="tag is-dark">Status</span>
					{#if last_response && last_response.status}
						<span class="tag">{last_response.status}</span>
					{:else}
						<span class="tag"></span>
					{/if}
				</div>
			</div>

			<div class="control">
				<div class="tags has-addons">
					<span class="tag is-dark">Status Text</span>
					{#if last_response && last_response.statusText}
						<span class="tag">{last_response.statusText}</span>
					{:else}
						<span class="tag"> </span>
					{/if}
				</div>
			</div>

			<div class="control">
				<div class="tags has-addons">
					<span class="tag is-dark">Ok</span>
					{#if last_response && last_response.ok}
						<span class="tag">{last_response.ok}</span>
					{:else}
						<span class="tag"></span>
					{/if}
				</div>
			</div>

			<div class="control">
				<div class="tags has-addons">
					<span class="tag is-dark">Time</span>
					{#if time_responde}
						<span class="tag">{time_responde} ms</span>
					{:else}
						<span class="tag"> ms </span>
					{/if}
				</div>
			</div>

			<div class="control">
				<div class="tags has-addons">
					<span class="tag is-dark">Size</span>
					{#if sizeKBResponse}
						<span class="tag">{sizeKBResponse} KB</span>
					{:else}
						<span class="tag"> KB </span>
					{/if}
				</div>
			</div>
		</div>
		<div>
			{#if Number(sizeKBResponse) < Number(limitSizeResponseView)}
				{#if response_as == 'json'}
					<JSONView bind:jsonObject={data_result}></JSONView>
				{:else if response_as == 'text'}
					<code>
						{data_result}
					</code>
				{:else if response_as == 'datatable' && data_result}
					<Table bind:RawDataTable={data_result}></Table>
				{/if}
			{:else}
				<div class="content is-small">
					<p class="block">
						The response exceeds {limitSizeResponseView} KB, it cannot be displayed in the view.
					</p>

					<div class="is-align-content-center">
						<button
							class="button is-link is-outlined is-small"
							on:click={() => {
								if (response_as == 'json') {
									downloadFile(JSON.stringify(data_result), 'response.json', 'text/json');
								} else if (response_as == 'text') {
									downloadFile(data_result, 'response.txt', 'text/plain');
								}
							}}>Download</button
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
</Tab>

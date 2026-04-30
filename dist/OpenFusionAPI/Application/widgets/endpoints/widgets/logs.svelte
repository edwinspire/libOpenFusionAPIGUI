<script>
	import { onMount } from 'svelte';
	import { Tab, Table, ColumnTypes } from '@edwinspire/svelte-components';
	import { url_paths } from '../../../utils/paths.js';
	import LogLevelSelect from './loglevel_select.svelte';
	import { DateTime } from 'luxon';
	import uFetch from '@edwinspire/universal-fetch';

	let uF = new uFetch(url_paths.getLogs);

	let {
		endpoint = $bindable({}),
		log = $bindable({
			status_info: 1,
			status_success: 1,
			status_redirect: 1,
			status_client_error: 2,
			status_server_error: 3
		}),
		ondata = (d) => {}
	} = $props();

	let dataLogs = $state([]);
	let datatraceLogs = $state([]);
	let trace_id = $state('');

	let columns_trace = $state({
		
		response_data: { hidden: false },
		request_data: { hidden: true },
		idapp: { hidden: true },
		idendpoint: { hidden: true },
		idlog: { hidden: true },
		id: { hidden: true }
	});

	let columns_logs = $state({
		trace_id: { hidden: false },
		response_data: {
			hidden: false,
			decorator: { component: ColumnTypes.Json }
		},
		req_headers: {
			hidden: false,
			decorator: { component: ColumnTypes.Json }
		},
		res_headers: {
			hidden: false,
			decorator: { component: ColumnTypes.Json }
		},
		request_data: { hidden: true },
		idapp: { hidden: true },
		idendpoint: { hidden: true },
		idlog: { hidden: true },
		id: { hidden: true }
	});
	// Obtener la fecha actual en la zona horaria local
	const now = DateTime.local();
	// Formatear la fecha actual en el formato deseado: "yyyy-MM-dd'T'HH:mm+ZZ"
	// Se utiliza 'ZZZ' para obtener el offset de la zona horaria sin los minutos (por ejemplo, "+05")
	const formattedNow = now.toFormat("yyyy-MM-dd'T'HH:mm");

	// Obtener la fecha restándole 24 horas
	const nowMinus24 = now.minus({ hours: 24 });
	const start = nowMinus24.toFormat("yyyy-MM-dd'T'HH:mm");
	// TODO: Está desactivado hasta ver como realizar correctamente la consulta al log
	let active_tab = $state(0);
	let params = $state({
		start_date: start,
		end_date: formattedNow,
		idendpoint: endpoint.idendpoint || 'ffffffff-ffff-ffff-ffff-ffffffffffff',
		//	level: null,
		limit: 1000,
		timezone: DateTime.local().z
	});
	let tabs = $state([
		{
			label: 'Parametrization',
			classIcon: 'fa-solid fa-rectangle-list',
			slot: 'parameterization',
			isActive: true,
			component: tab_param
		},
		{
			label: 'Registered logs',
			classIcon: 'fa-solid fa-file-lines',
			slot: 'logs',
			isActive: false,
			component: tab_logs
		},
		{
			label: 'Trace Logs',
			classIcon: 'fa-solid fa-file-lines',
			slot: 'logs',
			isActive: false,
			component: tab_trace_logs
		}
	]);

	function defaultValue() {
		if (log == null) {
			log = {
				status_info: 1,
				status_success: 1,
				status_redirect: 1,
				status_client_error: 2,
				status_server_error: 2
			};
		}

		if (log && log.status_info == null) {
			log.status_info = 1;
		}

		if (log && log.status_success == null) {
			log.status_success = 1;
		}

		if (log && log.status_redirect == null) {
			log.status_redirect = 1;
		}

		if (log && log.status_client_error == null) {
			log.status_client_error = 2;
		}

		if (log && log.status_server_error == null) {
			log.status_server_error = 3;
		}
	}

	async function fetchLogs() {
		try {
			params.idendpoint = endpoint.idendpoint || 'ffffffff-ffff-ffff-ffff-ffffffffffff';
			let req = await uF.get({ data: params });
			dataLogs = await req.json();
		} catch (error) {
			console.error('Error fetching logs:', error);
			//dataLogs = [];
		}
	}

	async function fetchTraceLogs() {
		try {
			let req = await uF.get({ data: { trace_id: trace_id } });
			datatraceLogs = await req.json();
		} catch (error) {
			console.error('Error fetching logs:', error);
			//datatraceLogs = [];
		}
	}

	onMount(() => {
		defaultValue();
	});
</script>

{#snippet tab_param()}
	<div class="content is-small">
		<table class="table is-fullwidth is-hoverable" style="background-color: transparent;">
			<thead>
				<tr>
					<th style="width: 30%;">Log Level</th>
					<th style="width: 15%; text-align: center;">Status Codes</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<!-- 1XX -->
				<tr>
					<td class="is-vcentered">
						{#if log.status_info >= 0}
							<LogLevelSelect bind:level={log.status_info}></LogLevelSelect>
						{/if}
					</td>
					<td class="is-vcentered has-text-centered">
						<span class="tag is-info is-light has-text-weight-bold">
							<span class="icon is-small mr-1"><i class="fa-solid fa-circle-info"></i></span>
							1XX
						</span>
					</td>
					<td>
						<details>
							<summary class="has-text-weight-bold is-clickable mb-2">Informational</summary>
							<p class="has-text-grey mb-3">They indicate that the request has been received and is being processed.</p>
							<div class="tags">
								<span class="tag is-info is-light">100 Continue</span>
								<span class="tag is-info is-light">101 Switching Protocols</span>
								<span class="tag is-info is-light">102 Processing</span>
							</div>
						</details>
					</td>
				</tr>

				<!-- 2XX -->
				<tr>
					<td class="is-vcentered">
						{#if log.status_success >= 0}
							<LogLevelSelect bind:level={log.status_success}></LogLevelSelect>
						{/if}
					</td>
					<td class="is-vcentered has-text-centered">
						<span class="tag is-success is-light has-text-weight-bold">
							<span class="icon is-small mr-1"><i class="fa-solid fa-circle-check"></i></span>
							2XX
						</span>
					</td>
					<td>
						<details>
							<summary class="has-text-weight-bold is-clickable mb-2">Success</summary>
							<p class="has-text-grey mb-3">The request has been received, understood and processed correctly.</p>
							<div class="tags">
								<span class="tag is-success is-light">200 OK</span>
								<span class="tag is-success is-light">201 Created</span>
								<span class="tag is-success is-light">202 Accepted</span>
								<span class="tag is-success is-light">203 Non-Authoritative</span>
								<span class="tag is-success is-light">204 No Content</span>
								<span class="tag is-success is-light">205 Reset Content</span>
								<span class="tag is-success is-light">206 Partial Content</span>
								<span class="tag is-success is-light">207 Multi-Status</span>
								<span class="tag is-success is-light">208 Already Reported</span>
								<span class="tag is-success is-light">226 IM Used</span>
							</div>
						</details>
					</td>
				</tr>

				<!-- 3XX -->
				<tr>
					<td class="is-vcentered">
						{#if log.status_redirect >= 0}
							<LogLevelSelect bind:level={log.status_redirect}></LogLevelSelect>
						{/if}
					</td>
					<td class="is-vcentered has-text-centered">
						<span class="tag is-link is-light has-text-weight-bold">
							<span class="icon is-small mr-1"><i class="fa-solid fa-share"></i></span>
							3XX
						</span>
					</td>
					<td>
						<details>
							<summary class="has-text-weight-bold is-clickable mb-2">Redirection</summary>
							<p class="has-text-grey mb-3">The customer must take additional actions to complete the request.</p>
							<div class="tags">
								<span class="tag is-link is-light">300 Multiple Choices</span>
								<span class="tag is-link is-light">301 Moved Permanently</span>
								<span class="tag is-link is-light">302 Found</span>
								<span class="tag is-link is-light">303 See Other</span>
								<span class="tag is-link is-light">304 Not Modified</span>
								<span class="tag is-link is-light">305 Use Proxy</span>
								<span class="tag is-link is-light">307 Temporary Redirect</span>
								<span class="tag is-link is-light">308 Permanent Redirect</span>
							</div>
						</details>
					</td>
				</tr>

				<!-- 4XX -->
				<tr>
					<td class="is-vcentered">
						{#if log.status_client_error >= 0}
							<LogLevelSelect bind:level={log.status_client_error}></LogLevelSelect>
						{/if}
					</td>
					<td class="is-vcentered has-text-centered">
						<span class="tag is-warning is-light has-text-weight-bold">
							<span class="icon is-small mr-1"><i class="fa-solid fa-triangle-exclamation"></i></span>
							4XX
						</span>
					</td>
					<td>
						<details>
							<summary class="has-text-weight-bold is-clickable mb-2">Client error</summary>
							<p class="has-text-grey mb-3">The request contains an error or cannot be processed.</p>
							<div class="tags">
								<span class="tag is-warning is-light">400 Bad Request</span>
								<span class="tag is-warning is-light">401 Unauthorized</span>
								<span class="tag is-warning is-light">402 Payment Required</span>
								<span class="tag is-warning is-light">403 Forbidden</span>
								<span class="tag is-warning is-light">404 Not Found</span>
								<span class="tag is-warning is-light">405 Method Not Allowed</span>
								<span class="tag is-warning is-light">406 Not Acceptable</span>
								<span class="tag is-warning is-light">407 Proxy Auth Required</span>
								<span class="tag is-warning is-light">408 Request Timeout</span>
								<span class="tag is-warning is-light">409 Conflict</span>
								<span class="tag is-warning is-light">410 Gone</span>
								<span class="tag is-warning is-light">411 Length Required</span>
								<span class="tag is-warning is-light">412 Precondition Failed</span>
								<span class="tag is-warning is-light">413 Payload Too Large</span>
								<span class="tag is-warning is-light">414 URI Too Long</span>
								<span class="tag is-warning is-light">415 Unsupported Media Type</span>
								<span class="tag is-warning is-light">416 Range Not Satisfiable</span>
								<span class="tag is-warning is-light">417 Expectation Failed</span>
								<span class="tag is-warning is-light">418 I'm a teapot</span>
								<span class="tag is-warning is-light">421 Misdirected Request</span>
								<span class="tag is-warning is-light">422 Unprocessable Entity</span>
								<span class="tag is-warning is-light">423 Locked</span>
								<span class="tag is-warning is-light">424 Failed Dependency</span>
								<span class="tag is-warning is-light">425 Too Early</span>
								<span class="tag is-warning is-light">426 Upgrade Required</span>
								<span class="tag is-warning is-light">428 Precondition Required</span>
								<span class="tag is-warning is-light">429 Too Many Requests</span>
								<span class="tag is-warning is-light">431 Request Header Fields Too Large</span>
								<span class="tag is-warning is-light">451 Unavailable For Legal Reasons</span>
							</div>
						</details>
					</td>
				</tr>

				<!-- 5XX -->
				<tr>
					<td class="is-vcentered">
						{#if log.status_server_error >= 0}
							<LogLevelSelect bind:level={log.status_server_error}></LogLevelSelect>
						{/if}
					</td>
					<td class="is-vcentered has-text-centered">
						<span class="tag is-danger is-light has-text-weight-bold">
							<span class="icon is-small mr-1"><i class="fa-solid fa-server"></i></span>
							5XX
						</span>
					</td>
					<td>
						<details>
							<summary class="has-text-weight-bold is-clickable mb-2">Server error</summary>
							<p class="has-text-grey mb-3">The server was unable to fulfill an apparently valid request.</p>
							<div class="tags">
								<span class="tag is-danger is-light">500 Internal Server Error</span>
								<span class="tag is-danger is-light">501 Not Implemented</span>
								<span class="tag is-danger is-light">502 Bad Gateway</span>
								<span class="tag is-danger is-light">503 Service Unavailable</span>
								<span class="tag is-danger is-light">504 Gateway Timeout</span>
								<span class="tag is-danger is-light">505 HTTP Version Not Supported</span>
								<span class="tag is-danger is-light">506 Variant Also Negotiates</span>
								<span class="tag is-danger is-light">507 Insufficient Storage</span>
								<span class="tag is-danger is-light">508 Loop Detected</span>
								<span class="tag is-danger is-light">510 Not Extended</span>
								<span class="tag is-danger is-light">511 Network Auth Required</span>
							</div>
						</details>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet tab_logs()}
	<Table bind:columns={columns_logs} bind:RawDataTable={dataLogs} right_items={[rt1, rt2, rt3]} onsearch={fetchLogs}>
		{#snippet rt1()}
			<div class="field has-addons has-addons-centered">
				<span class="control">
					<input
						class="input is-small"
						type="datetime-local"
						placeholder="Start"
						bind:value={params.start_date}
					/>
				</span>
				<span class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> Start </a>
				</span>
			</div>
		{/snippet}
		{#snippet rt2()}
			<div class="field has-addons has-addons-centered">
				<span class="control">
					<input
						class="input is-small"
						type="datetime-local"
						placeholder="Start"
						bind:value={params.end_date}
					/>
				</span>
				<span class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> End </a>
				</span>
			</div>
		{/snippet}
		{#snippet rt3()}
			<div class="field has-addons has-addons-centered">
				<span class="control">
					<input
						class="input is-small"
						type="number"
						placeholder="Limit"
						bind:value={params.limit}
					/>
				</span>
				<span class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> Limit </a>
				</span>
			</div>
		{/snippet}
	</Table>
{/snippet}


{#snippet tab_trace_logs()}
	<Table columns={columns_trace} bind:RawDataTable={datatraceLogs} left_items={[rt1 ]} onsearch={fetchTraceLogs}>
		{#snippet rt1()}
			<div class="field has-addons has-addons-centered">
				<span class="control">
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="button is-static is-small"> Trace ID </a>
				</span>
				<span class="control">
					<input
						class="input is-small"
						type="text"
						placeholder="Trace ID"
						bind:value={trace_id}
					/>
				</span>
				<span class="control">
					<button class="button is-small" onclick={fetchTraceLogs}>
						aria-label="Search trace logs"
						title="Search trace logs"
						<span class="icon is-small">
							<i class="fa-solid fa-magnifying-glass"></i>
						</span>
					</button>
				</span>
			</div>
		{/snippet}
		
	</Table>
{/snippet}

<Tab bind:tabs bind:active={active_tab}></Tab>

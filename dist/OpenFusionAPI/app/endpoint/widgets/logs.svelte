<script>
	import { onMount } from 'svelte';
	import { Tab, Table } from '@edwinspire/svelte-components';
	import { url_paths } from '../../../utils.js';
	import LogLevelSelect from './loglevel_select.svelte';
	import { DateTime } from 'luxon';

	let {
		row = $bindable({}),
		log = $bindable({
			status_info: 1,
			status_success: 1,
			status_redirect: 1,
			status_client_error: 2,
			status_server_error: 3
		}),
		ondata = (d) => {}
	} = $props();

	// Obtener la fecha actual en la zona horaria local
	const now = DateTime.local();
	// Formatear la fecha actual en el formato deseado: "yyyy-MM-dd'T'HH:mm+ZZ"
	// Se utiliza 'ZZZ' para obtener el offset de la zona horaria sin los minutos (por ejemplo, "+05")
	const formattedNow = now.toFormat("yyyy-MM-dd'T'HH:mm");

	// Obtener la fecha restándole 24 horas
	const nowMinus24 = now.minus({ hours: 24 });
	const start = nowMinus24.toFormat("yyyy-MM-dd'T'HH:mm");

	let active_tab = $state(0);
	let requestData = $state({
		url: url_paths.getLogs,
		params: {
			startDate: start,
			endDate: formattedNow,
			idendpoint: row.idendpoint||'ffffffff-ffff-ffff-ffff-ffffffffffff',
			//	level: null,
			limit: 1000,
			timezone : DateTime.local().z
		}
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

	onMount(() => {
		defaultValue();
	});
</script>

{#snippet tab_param()}
	<div class="content is-small">
		<table class="table is-bordered is-striped is-hoverable">
			<thead>
				<tr>
					<th><span>Log Level</span> </th>
					<th><span>HTTP Status Codes</span></th>
					<th><span>Description</span></th>
				</tr>
			</thead>

			<tbody>
				<tr class="">
					<td
						>{#if log.status_info >= 0}
							<LogLevelSelect bind:level={log.status_info}></LogLevelSelect>
						{/if}</td
					>
					<td><div>1XX</div></td>
					<td>
						<details>
							<summary>Informational</summary>
							<div>They indicate that the request has been received and is being processed.</div>
							<div>
								<ul>
									<li>100 (Continue)</li>
									<li>101 (Switching Protocols)</li>
									<li>102 (Processing)</li>
								</ul>
							</div>
						</details>
					</td>
				</tr>

				<tr>
					<td
						>{#if log.status_success >= 0}
							<LogLevelSelect bind:level={log.status_success}></LogLevelSelect>
						{/if}
					</td>
					<td><div>2XX</div></td>
					<td>
						<details>
							<summary>Success</summary>
							<div>The request has been received, understood and processed correctly.</div>
							<div>
								<ul>
									<li>200 (OK)</li>
									<li>201 (Created)</li>
									<li>202 (Accepted)</li>
									<li>203 (Non-Authoritative Information)</li>
									<li>204 (No Content)</li>
									<li>205 (Reset Content)</li>
									<li>206 (Partial Content)</li>
									<li>207 (Multi-Status)</li>
									<li>208 (Already Reported)</li>
									<li>226 (IM Used)</li>
								</ul>
							</div>
						</details>
					</td>
				</tr>

				<tr>
					<td
						>{#if log.status_redirect >= 0}
							<LogLevelSelect bind:level={log.status_redirect}></LogLevelSelect>
						{/if}
					</td>
					<td><div>3XX</div></td>
					<td>
						<details>
							<summary>Redirection</summary>

							<div>The customer must take additional actions to complete the request.</div>

							<div>
								<ul>
									<li>300 (Multiple Choices)</li>
									<li>301 (Moved Permanently)</li>
									<li>302 (Found)</li>
									<li>303 (See Other)</li>
									<li>304 (Not Modified)</li>
									<li>305 (Use Proxy)</li>
									<li>307 (Temporary Redirect)</li>
									<li>308 (Permanent Redirect)</li>
								</ul>
							</div>
						</details>
					</td>
				</tr>

				<tr class="">
					<td
						>{#if log.status_client_error >= 0}
							<LogLevelSelect bind:level={log.status_client_error}></LogLevelSelect>
						{/if}
					</td>
					<td><div>4XX</div></td>
					<td>
						<details>
							<summary>Client error</summary>
							<div>The request contains an error or cannot be processed.</div>
							<div>
								<ul>
									<li>400 (Bad Request)</li>
									<li>401 (Unauthorized)</li>
									<li>402 (Payment Required)</li>
									<li>403 (Forbidden)</li>
									<li>404 (Not Found)</li>
									<li>405 (Method Not Allowed)</li>
									<li>406 (Not Acceptable)</li>
									<li>407 (Proxy Authentication Required)</li>
									<li>408 (Request Timeout)</li>
									<li>409 (Conflict)</li>
									<li>410 (Gone)</li>
									<li>411 (Length Required)</li>
									<li>412 (Precondition Failed)</li>
									<li>413 (Payload Too Large)</li>
									<li>414 (URI Too Long)</li>
									<li>415 (Unsupported Media Type)</li>
									<li>416 (Range Not Satisfiable)</li>
									<li>417 (Expectation Failed)</li>
									<li>418 (I'm a teapot)</li>
									<li>421 (Misdirected Request)</li>
									<li>422 (Unprocessable Entity)</li>
									<li>423 (Locked)</li>
									<li>424 (Failed Dependency)</li>
									<li>425 (Too Early)</li>
									<li>426 (Upgrade Required)</li>
									<li>428 (Precondition Required)</li>
									<li>429 (Too Many Requests)</li>
									<li>431 (Request Header Fields Too Large)</li>
									<li>451 (Unavailable For Legal Reasons)</li>
								</ul>
							</div>
						</details>
					</td>
				</tr>

				<tr class="">
					<td>
						{#if log.status_server_error >= 0}
							<LogLevelSelect bind:level={log.status_server_error}></LogLevelSelect>
						{/if}
					</td>
					<td>
						<div>5XX</div>
					</td>
					<td>
						<details>
							<summary>Server error</summary>
							<div>The server was unable to fulfill an apparently valid request.</div>

							<div>
								<ul>
									<li>500 (Internal Server Error)</li>
									<li>501 (Not Implemented)</li>
									<li>502 (Bad Gateway)</li>
									<li>503 (Service Unavailable)</li>
									<li>504 (Gateway Timeout)</li>
									<li>505 (HTTP Version Not Supported)</li>
									<li>506 (Variant Also Negotiates)</li>
									<li>507 (Insufficient Storage)</li>
									<li>508 (Loop Detected)</li>
									<li>510 (Not Extended)</li>
									<li>511 (Network Authentication Required)</li>
								</ul>
							</div>
						</details>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet tab_logs()}
	<Table bind:requestData right_items={[rt1, rt2, rt3]}>
		{#snippet rt1()}
			<div class="field has-addons has-addons-centered">
				<span class="control">
					<input
						class="input is-small"
						type="datetime-local"
						placeholder="Start"
						bind:value={requestData.params.startDate}
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
						bind:value={requestData.params.endDate}
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
						bind:value={requestData.params.limit}
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

<Tab bind:tabs bind:active={active_tab}></Tab>

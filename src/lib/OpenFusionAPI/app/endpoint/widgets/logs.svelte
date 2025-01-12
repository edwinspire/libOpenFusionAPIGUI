<script>
	import { onMount } from 'svelte';
	import { Tab, Table, ColumnTypes } from '@edwinspire/svelte-components';
	import { url_paths } from '../../../utils.js';

	let {
		log = $bindable({}),
		options = $bindable([
			{ id: 0, value: `Disabled`, enabled: true },
			{ id: 1, value: `Basic`, enabled: true },
			{ id: 2, value: `Normal`, enabled: true },
			{ id: 3, value: `Full`, enabled: true }
		]),
		ondata = (d) => {
			
		}
	} = $props();

	let active_tab = $state(0);
	let requestData = $state({
		url: url_paths.getLogs,
		params: {
			startDate: new Date(),
			endDate: new Date()
			//	idendpoint: null,
			//	level: null,
			//	limit: 1000
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
			log = {};
		}
	}

	onMount(() => {
		defaultValue();
	});
</script>

{#snippet tab_param()}
	<div>
		<span>
			<div class="field is-horizontal">
				<div class="field-label is-small">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="label">Log Level</label>
				</div>
				<div class="field-body">
					<div class="field">
						<div class="control">
							<div class="select is-fullwidth is-small">
								<select bind:value={log.level}>
									{#if options && options.length > 0}
										{#each options as h}
											<option value={h.id}>
												{h.value}
											</option>
										{/each}
									{/if}
								</select>
							</div>
						</div>
						<span class="help is-success">
							<div>
								{#if log.level == 0}
									Does not save any log.
								{:else if log.level == 1}
									Save the minimum data.
								{:else if log.level == 2}
									Save the most useful data.
								{:else if log.level == 3}
									Saves all request and response data.
								{/if}
							</div>
						</span>
					</div>
				</div>
			</div>
		</span>
	</div>
	<br />
	<div class="content is-small">
		<table class="table is-bordered is-striped is-hoverable">
			<thead>
				<tr>
					<th><span>Log</span> </th>
					<th><span>Codes</span></th>
					<th><span>Description</span></th>
					<th><span>Details</span></th>
				</tr>
			</thead>

			<tbody>
				<tr class="">
					<td><input type="checkbox" bind:checked={log.infor} /></td>
					<td><div>1XX</div></td>
					<td>
						<div>
							Informational: They indicate that the request has been received and is being
							processed.
						</div>
					</td>
					<td> <div>100 (Continue), 101 (Switching Protocols), 102 (Processing)</div></td>
				</tr>

				<tr>
					<td><input type="checkbox" bind:checked={log.success} /></td>
					<td><div>2XX</div></td>
					<td
						><div>
							Success: The request has been received, understood and processed correctly.
						</div></td
					>
					<td>
						<div>
							200 (OK), 201 (Created), 202 (Accepted), 203 (Non-Authoritative Information), 204 (No
							Content), 205 (Reset Content), 206 (Partial Content), 207 (Multi-Status), 208 (Already
							Reported), 226 (IM Used)
						</div>
					</td>
				</tr>

				<tr>
					<td><input type="checkbox" bind:checked={log.redirection} /></td>
					<td><div>3XX</div></td>
					<td
						><div>
							Redirection: The customer must take additional actions to complete the request.
						</div></td
					>
					<td>
						<div>
							300 (Multiple Choices), 301 (Moved Permanently), 302 (Found), 303 (See Other), 304
							(Not Modified), 305 (Use Proxy), 307 (Temporary Redirect), 308 (Permanent Redirect)
						</div></td
					>
				</tr>

				<tr class="">
					<td><input type="checkbox" bind:checked={log.clientError} /></td>
					<td><div>4XX</div></td>
					<td>
						<div></div>
						Client error: The request contains an error or cannot be processed.</td
					>
					<td>
						<div>
							400 (Bad Request), 401 (Unauthorized), 402 (Payment Required), 403 (Forbidden), 404
							(Not Found), 405 (Method Not Allowed), 406 (Not Acceptable), 407 (Proxy Authentication
							Required), 408 (Request Timeout), 409 (Conflict), 410 (Gone), 411 (Length Required),
							412 (Precondition Failed), 413 (Payload Too Large), 414 (URI Too Long), 415
							(Unsupported Media Type), 416 (Range Not Satisfiable), 417 (Expectation Failed), 418
							(I'm a teapot), 421 (Misdirected Request), 422 (Unprocessable Entity), 423 (Locked),
							424 (Failed Dependency), 425 (Too Early), 426 (Upgrade Required), 428 (Precondition
							Required), 429 (Too Many Requests), 431 (Request Header Fields Too Large), 451
							(Unavailable For Legal Reasons)
						</div>
					</td>
				</tr>

				<tr class="">
					<td><input type="checkbox" bind:checked={log.serverError} /></td>
					<td>
						<div>5XX</div>
					</td>
					<td>
						<div>Server error: The server was unable to fulfill an apparently valid request.</div>
					</td>
					<td>
						<div>
							500 (Internal Server Error), 501 (Not Implemented), 502 (Bad Gateway), 503 (Service
							Unavailable), 504 (Gateway Timeout), 505 (HTTP Version Not Supported), 506 (Variant
							Also Negotiates), 507 (Insufficient Storage), 508 (Loop Detected), 510 (Not Extended),
							511 (Network Authentication Required)
						</div></td
					>
				</tr>
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet tab_logs()}
	<Table bind:requestData></Table>
{/snippet}

<Tab bind:tabs bind:active={active_tab}></Tab>

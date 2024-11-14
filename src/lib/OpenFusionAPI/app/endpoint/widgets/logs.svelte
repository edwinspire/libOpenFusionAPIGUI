<script>
	import { onMount, createEventDispatcher } from 'svelte';

	//	import { storeUsersList } from '$lib/OpenFusionAPI/utils.js';
	//	import uFetch from '@edwinspire/universal-fetch';
	//import { Table, ColumnTypes } from '@edwinspire/svelte-components';
	import EndpointLabel from './endpoint_label.svelte';

	export let log = {};
	export let row = {};

	function defaultValue() {
		if (!log) {
			log = {};
		}
	}

	onMount(async () => {
		defaultValue();
	});
</script>

<EndpointLabel bind:endpoint={row.endpoint}></EndpointLabel>

<div class="label is-small">Parameterization of the logs that will be saved.</div>

<div>

	<table class="table is-bordered is-striped is-hoverable">
		<thead>
			<tr>
				<th ><span class="label is-small">Log</span> </th>
				<th><span class="label is-small">Codes</span></th>
				<th class=""><span class="label is-small">Description</span></th>
				<th><span class="label is-small">Details</span></th>
			</tr>
		</thead>

		<tbody>
			<tr class="">
				<td><input type="checkbox" bind:checked={log.infor} /></td>
				<td>1XX</td>
				<td
					>Informational: They indicate that the request has been received and is being processed.</td
				>
				<td>100 (Continue), 101 (Switching Protocols), 102 (Processing)</td>
			</tr>

			<tr class="">
				<td><input type="checkbox" bind:checked={log.success} /></td>
				<td>2XX</td>
				<td>Success: The request has been received, understood and processed correctly.</td>
				<td
					>200 (OK), 201 (Created), 202 (Accepted), 203 (Non-Authoritative Information), 204 (No
					Content), 205 (Reset Content), 206 (Partial Content), 207 (Multi-Status), 208 (Already
					Reported), 226 (IM Used)</td
				>
			</tr>

			<tr class="">
				<td><input type="checkbox" bind:checked={log.redirection} /></td>
				<td>3XX</td>
				<td>Redirection: The customer must take additional actions to complete the request.</td>
				<td
					>300 (Multiple Choices), 301 (Moved Permanently), 302 (Found), 303 (See Other), 304 (Not
					Modified), 305 (Use Proxy), 307 (Temporary Redirect), 308 (Permanent Redirect)</td
				>
			</tr>

			<tr class="">
				<td><input type="checkbox" bind:checked={log.clientError} /></td>
				<td>4XX</td>
				<td>Client error: The request contains an error or cannot be processed.</td>
				<td
					><span class="label is-small">400 (Bad Request), 401 (Unauthorized), 402 (Payment Required), 403 (Forbidden), 404 (Not
						Found), 405 (Method Not Allowed), 406 (Not Acceptable), 407 (Proxy Authentication
						Required), 408 (Request Timeout), 409 (Conflict), 410 (Gone), 411 (Length Required), 412
						(Precondition Failed), 413 (Payload Too Large), 414 (URI Too Long), 415 (Unsupported Media
						Type), 416 (Range Not Satisfiable), 417 (Expectation Failed), 418 (I'm a teapot), 421
						(Misdirected Request), 422 (Unprocessable Entity), 423 (Locked), 424 (Failed Dependency),
						425 (Too Early), 426 (Upgrade Required), 428 (Precondition Required), 429 (Too Many
						Requests), 431 (Request Header Fields Too Large), 451 (Unavailable For Legal Reasons)</span></td
				>
			</tr>

			<tr class="">
				<td><input type="checkbox" bind:checked={log.serverError} /></td>
				<td>5XX</td>
				<td>Server error: The server was unable to fulfill an apparently valid request.</td>
				<td
					>500 (Internal Server Error), 501 (Not Implemented), 502 (Bad Gateway), 503 (Service
					Unavailable), 504 (Gateway Timeout), 505 (HTTP Version Not Supported), 506 (Variant Also
					Negotiates), 507 (Insufficient Storage), 508 (Loop Detected), 510 (Not Extended), 511
					(Network Authentication Required)</td
				>
			</tr>
		</tbody>
	</table>
</div>

<div>
	<div>
		<label class="checkbox">
			<input type="checkbox" bind:checked={log.full} />
			Save the sent parameters and the response from endpoint.
		</label>
	</div>
</div>

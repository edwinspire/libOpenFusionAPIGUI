<script>
	import {
		listHTTPMethods,
		Environment
	} from '$lib/OpenFusionAPI/Application/utils/static_values.js';
	import { getHandlerParams } from '$lib/OpenFusionAPI/Application/utils/utils.js';

	let {
		environment = $bindable('?'),
		endpoint = $bindable('?'),
		method = $bindable('?'),
		handler = $bindable('?')
	} = $props();


	let handler_params = $derived.by(() => {
		return getHandlerParams(handler);
	});

	let env_selected = $derived.by(() => {
		let data =
			Environment && Array.isArray(Environment)
				? Environment.find((item) => {
						return item.id == environment;
					})
				: [];
		return data;
	});

	let copied = $state(false);
</script>

<!-- Main container -->
<nav class="level">
	<!-- Left side -->
	<div class="level-left">
		<div class="level-item">
			<h4 class="subtitle is-5">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div 
					class="icon-text" 
					style="cursor: pointer;"
					title="Copy to clipboard"
					onclick={() => {
						navigator.clipboard?.writeText?.(endpoint);
						copied = true;
						setTimeout(() => {
							copied = false;
						}, 1000);
					}}
				>
					<span class="icon {copied ? 'has-text-success' : 'has-text-info'}">
						<i class="fa-solid {copied ? 'fa-check fa-beat' : 'fa-copy'}"></i>
					</span>
					<span>{endpoint}</span>
				</div>
			</h4>
		</div>
	</div>

	<!-- Right side -->
	<div class="level-right">
		<span class="level-item">
			<div class="field is-grouped is-grouped-multiline">
				<div class="control">
					<div class="tags has-addons">
						<span class="tag is-dark">Method</span>
						<span class="tag is-{listHTTPMethods[method]?.color}">{method}</span>
					</div>
				</div>

				<div class="control">
					<div class="tags has-addons">
						<span class="tag is-dark">Handler</span>
						<span class="tag is-{handler_params?.css_class}">{handler_params?.value}</span
						>
					</div>
				</div>

				<div class="control">
					<div class="tags has-addons">
						<span class="tag is-dark">Env</span>
						<span class="tag is-{env_selected?.background}">{env_selected?.value}</span>
					</div>
				</div>
			</div>
		</span>
	</div>
</nav>

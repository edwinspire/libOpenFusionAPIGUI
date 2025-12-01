<script>
	import {
		listHandlers,
		listHTTPMethods,
		Environment
	} from '../../../utils/static_values.js';

	let {
		environment = $bindable('?'),
		endpoint = $bindable('?'),
		method = $bindable('?'),
		handler = $bindable('?')
	} = $props();

	let env_selected = $derived.by(() => {
		let data =
			Environment && Array.isArray(Environment)
				? Environment.find((item) => {
						return item.id == environment;
					})
				: [];
		return data;
	});
</script>

<!-- Main container -->
<nav class="level">
	<!-- Left side -->
	<div class="level-left">
		<div class="level-item">
			<h4 class="subtitle is-5">
				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-link"></i>
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
						<span class="tag is-{listHandlers[handler]?.color}">{listHandlers[handler]?.label}</span
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

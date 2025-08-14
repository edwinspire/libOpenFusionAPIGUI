<script>
	import { listHandlers, listHTTPMethods, listEnv } from '$lib/OpenFusionAPI/utils.js';

	let {
		environment = $bindable('?'),
		endpoint = $bindable('?'),
		method = $bindable('?'),
		handler = $bindable('?')
	} = $props();
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
						<span class="tag is-{listEnv[environment]?.background}"
							>{listEnv[environment]?.label}</span
						>
					</div>
				</div>
			</div>
		</span>
	</div>
</nav>

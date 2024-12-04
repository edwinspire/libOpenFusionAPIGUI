<script>
	import { listEnv } from '../../../utils.js';
	export let endpoint = '';
	export let environment = '';
</script>

<!-- Main container -->
<nav class="level">
	<!-- Left side -->
	<div class="level-left">
		<div class="level-item">
			<h3 class="subtitle is-5">
				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-link"></i>
					</span>
					<span>{endpoint}</span>
				</div>
			</h3>
		</div>
	</div>

	<!-- Right side -->
	<div class="level-right">
		<span class="level-item">
			<div class="fa-2x">
				{#if listEnv && environment && listEnv[environment]}
					<span class="icon {listEnv[environment].color}">
						<i class={listEnv[environment].icon}></i>
					</span>
				{:else}
					<span class="icon">
						<i class="fa-solid fa-question"></i>
					</span>
				{/if}
			</div>
		</span>
	</div>
</nav>

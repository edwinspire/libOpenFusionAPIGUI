<script>
	export let color = '';
	export let label = ' Label ';
	export let icon = 'fas fa-home';
</script>

<span class="icon-text">
	<span class="icon has-text-{color}">
		<i class="{icon}"></i>
	</span>
	<span>{label}</span>
</span>

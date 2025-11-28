<script>
	let {
		color = $bindable(''),
		label = $bindable(' Label '),
		icon = $bindable('fas fa-home')
	} = $props();
</script>

<span class="icon-text">
	<span class="icon has-text-{color}">
		<i class={icon}></i>
	</span>
	<span>{label}</span>
</span>

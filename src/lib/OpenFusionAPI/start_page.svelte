<script>
</script>

<section class="hero is-black is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="flame">
				<h1><span>OpenFusionAPI</span></h1>
			</div>
		</div>
	</div>
</section>

<style>
	.container {
		width: 100%;
		height: 300px;
		margin: 100px auto;
		transform: translateY(50%);
	}

	span {
		height: 300px;
		width: 100%;
		background-image: url('flame.png');
		background-position: 0 -1000px;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: fire 4s linear infinite;
	}

	h1 {
		color: #fff;
		font-size: 80px;
		text-align: center;
	}

	@keyframes fire {
		0% {
			background-position: 0% -50%;
		}
		100% {
			background-position: 0% -25%;
		}
	}
</style>

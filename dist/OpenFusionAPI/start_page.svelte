<script>
	import logo from './img/android-chrome-512x512.png';
    import flame from './img/flame.png';
	
</script>

<section class="hero is-black is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="main">
				<figure class="image is-128x128">
					<img src={logo} alt="OpenFusionAPI"/>
				</figure>
			</div>

			<div>
				<h1 class="h01" >
					<span class="span01" style="background-image: url( {flame});">OpenFusionAPI</span>
				</h1>
			</div>
		</div>
	</div>
</section>

<style>

	.main {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		width: 100%;
		height: 300px;
		margin: 100px auto;
		transform: translateY(50%);
	}

	.span01 {
		height: 300px;
		width: 100%;
		/* background-image: url({flame}); */
		background-position: 0 -1000px;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: fire 4s linear infinite;
	}

	.h01 {
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

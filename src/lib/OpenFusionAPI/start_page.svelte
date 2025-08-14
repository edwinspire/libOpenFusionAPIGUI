<script>
	import logo from './img/android-chrome-512x512.png';
	import flame from './img/flame.png';
</script>

<div class="xcontainer">
	<div class="">
		<div class="main">
			<figure class="image is-128x128">
				<img src={logo} alt="OpenFusionAPI" />
			</figure>
		</div>

		<h1 class="title">
			<div><span class="span01" style="background-image: url( {flame});">OpenFusionAPI</span></div>
		</h1>
		
			<div class="has-text-centered has-text-weight-bold"><span class="span01 " style="background-image: url( {flame});"><a  href="/openfusionapi">ENTER</a></span></div>
	
	</div>
</div>

<style>
	.xcontainer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh; /* 100% del viewport height */
		width: 100%; /* 100% del ancho disponible */
		background-color: black;
		color: white; /* Color del texto, ajusta según sea necesario */
	}

	.main {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.span01 {
		height: 300px;
		width: 100%;
		
		background-position: 0 -1000px;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: fire 4s linear infinite;
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

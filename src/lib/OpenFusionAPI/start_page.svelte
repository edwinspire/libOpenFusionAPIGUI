<script>
</script>

<section class="hero is-black is-fullheight her">
	<div class="hero-body">
		<div class="container">

            <div class="main">
                    <figure class="image is-128x128">
                        <img src="android-chrome-512x512.png" />
                    </figure>
                </div>
            

			<div class="flame">
				<h1>
						<span>OpenFusionAPI</span>
					
				</h1>
			</div>
		</div>
	</div>
</section>

<style>
	.her {
		display: inherit !important;
	}

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

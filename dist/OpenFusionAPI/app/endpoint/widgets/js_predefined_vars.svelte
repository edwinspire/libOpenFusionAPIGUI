<script>
	let mongo_example = `$_MONGOOSE_.connect('mongodb://127.0.0.1:27017/test'); <br/>
					
					const Cat = $_MONGOOSE_.model('Cat', { name: String }); <br/>
					
					const kitty = new Cat({ name: 'Zildjian' }); <br/>
					kitty.save().then(() => console.log('meow')); <br/>`;
</script>

<div class="content is-small">
	<h3>Predefined variables</h3>
	<ul>
		<li>
			<strong>$_RETURN_DATA_:</strong> Variable that returns the return of the function
		</li>
		<li>
			<strong>$_UFETCH_:</strong> Instance of the uFetch class. More information at
			<a href="https://github.com/edwinspire/universal-fetch">universal-fetch</a>
		</li>
		<li>
			<strong>$_REQUEST_:</strong> Represents the HTTP request received by the server. Contains information
			about the request made by the client, such as URL parameters, headers, body data, and more.
		</li>
		<li>
			<strong>$_GET_INTERNAL_URL_:</strong> Function that allows obtaining the full path of an OFAPI
			endpoint.
			<br /> Example:
			<code
				>let relative_path = '/api/test/ap001';
				<br />let fullURL = $_GET_INTERNAL_URL_(relative_path);
				<br />// $_GET_INTERNAL_URL_ return 'http://localhost:3000/api/test/ap001'
			</code>
		</li>
		<li>
			<strong>$_FETCH_OFAPI_:</strong> Build a
			<a href="https://github.com/edwinspire/universal-fetch/">uFetch </a>
			intance.
			<br />
			The url can be absolute or relative. When it is relative, it internally repoints to the port used
			by OFAPI.
			<br />Example:
			<code>
				let url = 'http://example.net/api/test';
				<br />
				let fetch_instance = $_FETCH_OFAPI_(url);
			</code>
		</li>
		<li>
			<strong>$_SECUENTIAL_PROMISES_:</strong> PromiseSequence class. More information at
			<a href="https://github.com/edwinspire/sequential-promises">sequential-promises</a>.
		</li>
		<li>
			<strong>$_EXCEPTION_:</strong>
			It interrupts the program flow and throws an exception. It has three parameters:
			<ul>
				<li>message: The message that will be shown to the user. (required)</li>
				<li>data: An object of additional data to be sent to the user. (optional)</li>
				<li>
					statusCode: HTTP Status Code with which the request will be responded to. (optional.
					Default: 500)
				</li>
			</ul>
			Example:
			<code>$_EXCEPTION_('A parameter has not been entered', $_REQUEST_.body, 400);</code>
		</li>
		<li>
			<strong>$_MONGOOSE_:</strong>
			Mongoose provides a straight-forward, schema-based solution to model your MongoDB. More information
			at
			<a href="https://mongoosejs.com/">Mongoose</a> <br />
			Example:
			<code> {@html mongo_example}</code>
		</li>
	</ul>
</div>

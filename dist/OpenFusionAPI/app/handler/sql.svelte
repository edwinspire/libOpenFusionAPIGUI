<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Tab, EditorCode } from '@edwinspire/svelte-components';
	import Vars from '../vars.svelte';
	import CodeHTML from '../../widgets/codeHTML.svelte';
	import ApiTester from '../../widgets/ApiTester/index.svelte';

	/**
	 * @type {any}
	 */
	export let code;
	export let environment;
	export let row;

	let sample_bind_post_string = '{}';

	let sample_bind_post = {
		bind: {
			your_param_01: '0002081614',
			your_param_02: 123,
			your_param_03: 'ABC'
		}
	};

	let tabList = [
		{ label: 'Query', isActive: true },
		{ label: 'Connection Parameters' },
		{ label: 'Bind Parameters' },
		{ label: 'App Variables' },
		{ label: 'Tester' }
	];

	let params_code = '{}';
	let query_code = 'SELECT 1+1;';
	$: code, ParseCode();

	export function reset() {
		ParseCode();
	}

	function ParseCode() {
		try {
			let params = JSON.parse(code || '{}');

			if (params && params.query) {
				query_code = params.query;
			}

			if (params && params.config) {
				params_code = JSON.stringify(params.config);
			}
		} catch (error) {
			params_code = '{}';
			query_code = 'SELECT 1;';
			console.error('Error', error);
		}
	}

	export function getCode() {
		//fnEditorCode.apply();
		//let p = fnEditorCode.getCode();
		//let query = fnEditorCode2.getCode();
		let conf = {};
		let outcode = {};

		try {
			conf = JSON.parse(params_code);
			//return JSON.stringify(c, null, 2);
		} catch (error) {
			console.error('No se pudo parsear getCode', error);
			conf = params_code;
			//return code;
		}

		try {
			outcode.config = conf;
			outcode.query = query_code;
			return JSON.stringify(outcode, null, 2);
		} catch (error) {
			console.log(error);
			return code;
		}
	}

	onMount(() => {
	//	console.log(code);
		ParseCode();
		sample_bind_post_string = JSON.stringify(sample_bind_post);
	});
</script>

<Tab bind:tabs={tabList}>
	<div class={tabList[0].isActive ? '' : 'is-hidden'}>
		<div>
			<h3 class="subtitle is-5">
				<div class="icon-text">
					<span class="icon has-text-info">
						<i class="fa-solid fa-link"></i>
					</span>
					<span>{row.endpoint}</span>
				</div>
			</h3>

			<div>
				<div class="content is-small">
					The parameters must have a name like <span style="font-style: oblique; font-weight: bold;"
						>$nameparameter</span
					>
					which bind to the values ​​you send in the request. For more information you can consult the
					<a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/#bind-parameter"
						>sequelize</a
					>
					documentation.
					<br /><br />
					<div>Query to be executed.</div>
				</div>
			</div>
		</div>

		<EditorCode lang="sql" bind:code={query_code} ></EditorCode>
	</div>

	<div class={tabList[1].isActive ? '' : 'is-hidden'}>
		<div>
			<div class="content is-small">
				Configuration parameters used by sequelize, visit <a href="https://sequelize.org/"
					>https://sequelize.org/</a
				>
				for more information.
				<br />
				You can also use the name of an application variable enclosed in double quotes to use it, for
				example <strong>"$_VAR_NAME"</strong>.
			</div>
		</div>

		<EditorCode lang="json" bind:code={params_code}></EditorCode>
	</div>

	<div class={tabList[2].isActive ? '' : 'is-hidden'}>
		<div class="content is-small">
			For more information you can consult the
			<a href="https://sequelize.org/docs/v6/core-concepts/raw-queries/#bind-parameter">sequelize</a
			>
			documentation.

			{#if row.method === 'GET'}
				<div class="block">
					<div class="icon-text">
						<span class="icon has-text-warning">
							<i class="fas fa-exclamation-triangle"></i>
						</span>
						<span>GET Method - Warning</span>
					</div>

					<p class="block">
						The GET method is recommended only for simple requests where there is no input
						parameters, or failing that the parameters are key-value on query request, which will be
						used to join with the variables of the SQL query.
					</p>
				</div>
			{:else if row.method === 'POST'}
				<div class="block">
					<div class="icon-text">
						<span class="icon has-text-info">
							<i class="fa-solid fa-circle-exclamation"></i>
						</span>
						<span
							>When you use the POST method, the input parameters must be sent in the BODY in JSON
							format, using the following example:</span
						>
					</div>
					<br />

					<CodeHTML bind:jsonObject={sample_bind_post} />
				</div>
			{/if}
		</div>
	</div>

	<div class={tabList[3].isActive ? '' : 'is-hidden'}>
		<Vars bind:environment />
	</div>

	<div class={tabList[4].isActive ? '' : 'is-hidden'}>
		<ApiTester></ApiTester>
	</div>
</Tab>

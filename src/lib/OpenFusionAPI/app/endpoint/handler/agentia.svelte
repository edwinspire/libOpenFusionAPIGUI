<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		Tab,
		EditorCode,
		RESTTester,
		Input,
		Table,
		ColumnTypes
	} from '@edwinspire/svelte-components';
	import AppVars from '$lib/OpenFusionAPI/app/app_vars.svelte';
	import AppVarsSelector from '$lib/OpenFusionAPI/app/endpoint/widgets/params_json_selector.svelte';
	import { jsonToHtmlString } from '$lib/OpenFusionAPI/app/utils.js';
	import CellPromptType from '$lib/OpenFusionAPI/app/cellPromptType.svelte';
	import CellPrompt from '$lib/OpenFusionAPI/app/cellPrompt.svelte';
	import ChatTester from '$lib/OpenFusionAPI/app/endpoint/widgets/ChatTester/ia_chat_tester.svelte';

	let { row = $bindable({ endpoint: '', method: '', environment: '' }), onchange = () => {} } =
		$props();

	let columns = {
		//enabled: { label: 'Enabled App' },
		enabled: {
			label: 'Enabled',
			decorator: {
				component: ColumnTypes.Boolean,
				props: {
					custom: {
						ontrue: { label: 'Enabled' },
						onfalse: { label: 'Unabled' },
						editInline: true
					}
				}
			}
		},

		type: { label: 'Type', decorator: { component: CellPromptType } },
		prompt: { decorator: { component: CellPrompt }, label: 'Prompt' }
	};

	//let use_var_cnx = $state(false);
	//let cnx_param_json = $state({});
	let cnx_param_var = $state('');

	const example_config_model = {
		modelProvider: 'ollama',
		model: 'qwen3:0.6b',
		temperature: 0.1,
		baseUrl: 'http://localhost:11434',
		timeout: 60000 * 30 // 30 minutos
	};

	let example_agent_options = {
		verbose: false,
		returnIntermediateSteps: false,
		maxIterations: 5 // opcional, aumenta si necesitas más pasos
	};

	let mcpsevers_example = {
		server_name_1: {
			type: 'http',
			url: 'http://server_mcp.com:3030/api/mcp/server/prd'
		},
		server_name_2: {
			type: 'streamable',
			url: 'http://other_server.com/api/tools'
		},
		server_03: {
			type: 'http',
			url: 'http://localhost:3000/api/mcp',
			headers: {
				Apikey:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJjbGllbnRlIjoiZW1wczVzYSIsInNlcnZpY2lvIjoiRGV1ZG9yZXNQYXJ0aRRhcyIsImlhdCI6MTUxNjIzOTAyMn0.Lo0Kg9gOmYvjQXVi9rA_NdzQqQ7w1yFJn7tmPZeN1VI'
			}
		},
		weather: {
			url: 'http://localhost:8000/mcp/',
			transport: 'streamable_http'
		}
	};

	/**
 SELECT = 'SELECT',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  BULKUPDATE = 'BULKUPDATE',
  DELETE = 'DELETE',
  UPSERT = 'UPSERT',
  SHOWINDEXES = 'SHOWINDEXES',
  DESCRIBE = 'DESCRIBE',
  RAW = 'RAW',
  SHOWCONSTRAINTS = 'SHOWCONSTRAINTS',
  */

	let tabList = $state([
		{ label: 'Model', isActive: true, classIcon: ' fa-solid fa-robot ', component: tab_model },
		{ label: 'MCP servers', component: tab_mcp_servers },
		{ label: 'Prompts', component: tab_prompts },
		{ label: 'App Variables', component: tab_app_vars },
		{ label: 'Chat Tester', component: tab_chat_tester },
		{ label: 'REST Tester', component: tab_tester }
	]);

	let agent_options = $state({});

	let model = $state('');

	let provider = $state('');
	let mcpServers = $state({});
	let prompts = $state([]);

	let timeoutChange;

	$effect(() => {
		if (row?.code) {
			clearTimeout(timeoutChange);
			timeoutChange = setTimeout(() => {
				parseCode();
			}, 750);
		}
	});

	function parseCode() {
		try {
			let params = JSON.parse(row.code || '{}');

			if (params && params.agent_options) {
				agent_options = params.agent_options;
			}

			if (params && params.config) {
				cnx_param_var = params.config;
			}

			if (params && params.model) {
				model = params.model;
			}
			if (params && params.provider) {
				provider = params.provider;
			}
			if (params && params.mcpServers) {
				mcpServers = params.mcpServers;
			}

			if (params && params.init_prompts) {
				prompts = params.init_prompts;
			}

			//	console.log('parseCode agent_options', agent_options);
		} catch (error) {
			//	cnx_param_json = {};
			cnx_param_var = '';
			agent_options = {};
			model = '';
			provider = '';
			mcpServers = {};
			prompts = [];
			console.error('Error', $state.snapshot(error));
		}
	}

	function fnOnChange() {
		onchange(getData());
	}

	function getData() {
		let data = { code: getCode(), data_test: $state.snapshot(row.data_test) };

		return data;
	}

	function add_agent_scratchpad(prompt_list) {
		// Verificar si existe un objeto con id = 2
		const existe = prompt_list.some(
			(obj) => obj.type === 'placeholder' && obj.prompt === '{agent_scratchpad}'
		);
		console.log(existe); // true

		if (!existe) {
			prompt_list.push({ type: 'placeholder', prompt: '{agent_scratchpad}' });
		}

		return prompt_list;
	}

	function getCode() {
		let conf = {};
		let outcode = {};

		conf = cnx_param_var;

		//console.log('cnx_param_var', cnx_param_var);

		try {
			outcode.config = conf;
			outcode.agent_options = agent_options;
			outcode.model = model;
			outcode.provider = provider;
			outcode.mcpServers = mcpServers;
//			outcode.init_prompts = add_agent_scratchpad(prompts);
			outcode.init_prompts = prompts;
			//console.log(outcode);
			return JSON.stringify(outcode);
		} catch (error) {
			console.warn(error);
			return code;
		}
	}

function resetPromts(){
	prompts = [...prompts];
}

	onMount(() => {
		parseCode();
		//	sample_bind_post_string = JSON.stringify(sample_bind_post);
	});
	onDestroy(() => {
		clearTimeout(timeoutChange);
	});
</script>

{#snippet tab_model()}
	<div>
		<div class="content">Open Fusion API uses Langchain in the background to provide AI tools.</div>
		<div>
			<AppVarsSelector
				bind:value={model}
				bind:environment={row.environment}
				onselect={(selected) => {
					//	console.log('AppVarsSelector Editor', selected, cnx_param_var);
					fnOnChange();
				}}
			></AppVarsSelector>

			<div class="content">
				<details>
					<summary>Example</summary>
					<code>{@html jsonToHtmlString(example_config_model)}</code>
				</details>
			</div>
		</div>

		<div>
			<br />
			<div class="content">Agent options:</div>
		</div>

		<EditorCode
			isReadOnly={false}
			lang="json"
			showFormat={true}
			bind:code={agent_options}
			onchange={(c) => {
				//	console.log('onchange Editor', c);
				fnOnChange();
			}}
		></EditorCode>

		<div class="content">
			<details>
				<summary>Example</summary>
				<code>{@html jsonToHtmlString(example_agent_options)}</code>
			</details>
		</div>

		<br />
		<div class="content">
			For more information about the model configuration, visit the <a
				href="https://js.langchain.com/docs/how_to/chat_models_universal_init/"
				>Langchain documentation</a
			>.
		</div>
	</div>
{/snippet}

{#snippet tab_prompts()}
	<Table
		showNewButton="true"
		showDeleteButton="true"
		bind:RawDataTable={prompts}
		columns={columns}
		left_items={[lt01]}
		ondeleterow={(data) => {
			console.log('ondeleterow', data, prompts);
			if (confirm('Do you want to delete the prompt selected?')) {
				prompts = prompts.filter((item) => {
					console.log(item.internal_hash_row);
					return !data.rows.some((element) => element.internal_hash_row == item.internal_hash_row);
				});

				resetPromts();
			}
		}}
		onnewrow={() => {
			prompts.push({ enabled: true, type: 'system', prompt: '' });
		//	console.log('Se agrega nuevo promot');
			//prompts = [...prompts];
			resetPromts();
		}}
	>
		{#snippet lt01()}
			List of initial Prompt to be executed at agent startup.
		{/snippet}
	</Table>
{/snippet}

{#snippet tab_mcp_servers()}
	<div>
		<div class="content">List of MCP servers to use:</div>
	</div>

	<br />

	<AppVarsSelector
		bind:value={mcpServers}
		bind:environment={row.environment}
		onselect={(selected) => {
			//	console.log('AppVarsSelector Editor', selected, cnx_param_var);
			fnOnChange();
		}}
	></AppVarsSelector>

	<div class="content">
		<details>
			<summary>Example</summary>
			<code>{@html jsonToHtmlString(mcpsevers_example)}</code>
		</details>
	</div>

	<div>
		<div class="content is-small">
			To connect to MCP servers you can consult the <a
				href="https://github.com/langchain-ai/langchain-mcp-adapters?tab=readme-ov-file#client-1"
				>documentation</a
			>.
		</div>
	</div>
{/snippet}

{#snippet tab_app_vars()}
	<AppVars environment={row.environment} isReadOnly={true}></AppVars>
{/snippet}

{#snippet tab_chat_tester()}
	<div>
		<ChatTester url={row.endpoint} bind:init_prompts={prompts}></ChatTester>
	</div>
{/snippet}

{#snippet tab_tester()}
	<div>
		<RESTTester
			bind:data={row.data_test}
			method={row.method}
			url={row.endpoint}
			methodDisabled={true}
			onchange={(c) => {
				//console.log('RESTTester Editor SQL', c, row.data_test);
				fnOnChange();
			}}
		></RESTTester>
	</div>
{/snippet}

<Tab bind:tabs={tabList}></Tab>

<script>
	import { onMount } from 'svelte';
	import { Input } from '@edwinspire/svelte-components';
	import uFetch from '@edwinspire/universal-fetch';
	import ChatContent from './chat.svelte';

	let { url = $bindable(''), init_prompts = $bindable([]) } = $props();
	//let list_chats = $state([]);
	//let text_message = $state('');

	let messages = $state([]);

	/**
	 [
		{ type: 'ia', sender: 'Ana Pérez', prompt: 'Hola, ¿cómo estás?', time: '12:30' },
		{ type: 'user', prompt: '¡Hola! Todo bien, ¿y tú?', time: '12:31', status: 'read' },
		{
			type: 'ia',
			sender: 'Ana Pérez',
			prompt: 'Muy bien, gracias. ¿Qué tal el trabajo?',
			time: '12:32'
		},
		{
			type: 'user',
			prompt: 'Bien, bastante ocupado últimamente. ¿Y tú?',
			time: '12:33',
			status: 'read'
		},
		{
			type: 'ia',
			sender: 'Ana Pérez',
			prompt: 'Igual, pero me encanta lo que hago. ¿Tienes planes para el fin de semana? fssfsdffs',
			time: '12:34'
		}
	]
	
	 */

	async function fnSendMessage(e) {
		console.log(e, $state.snapshot(init_prompts));
		const prompt = e.message;

		messages.push({ type: 'user', prompt: prompt });
		//text_message = '';
		messages = [...messages];

		const uF = new uFetch();
		let response = await uF.POST({
			url,
			data: {
				prompt: { history: $state.snapshot(messages), user: prompt, init_prompts: init_prompts }
			}
		});

		if (response.status == 200) {
			let data = await response.json();
			console.log('Respuesta chat', data);

			messages.push({ type: 'ia', prompt: data.output });
			//messages = [...messages];
		} else if (response.status == 404) {
			messages.push({ type: 'ia', prompt: 'Server not exists' });
			} else if (response.status == 500) {
			messages.push({ type: 'ia', prompt: response.statusText });
		} else {
			console.log(response);
		}

		messages = [...messages];
	}

	onMount(() => {
		// Initialize chat connection or any setup needed
	});
</script>

<div>
	<Input label="Agent URL" bind:value={url} placeholder="Enter chat URL" />

	<ChatContent onmessage={fnSendMessage} bind:messages></ChatContent>
</div>

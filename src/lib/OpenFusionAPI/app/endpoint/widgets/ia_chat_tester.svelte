<script>
	import { onMount } from 'svelte';
	import { Input } from '@edwinspire/svelte-components';
	import uFetch from '@edwinspire/universal-fetch';

	let { url = $bindable('') } = $props();
	let list_chats = $state([]);
	let text_message = $state('');

	async function fnSendMessage(e) {
		console.log(e);
		const prompt = e.target.value;

		list_chats.push({ type: 'user', prompt: prompt });
		text_message = '';
		const uF = new uFetch();
		let response = await uF.POST({
			url,
			data: {
				prompt: { history: $state.snapshot(list_chats), user: [{ type: 'user', prompt: prompt }] }
			}
		});
		let data = await response.json();
		console.log('Respuesta chat', data);

		list_chats.push({ type: 'ai', prompt: data.output });
	}

	onMount(() => {
		// Initialize chat connection or any setup needed
	});
</script>

<div>
	<Input label="Agent URL" bind:value={url} placeholder="Enter chat URL" />
	
	<div>
		{#each list_chats as chat}
			{#if chat.type === 'user'}
				<div class="notification is-success is-light">
					<div class="content is-small">{chat.prompt}</div>
				</div>
			{:else if chat.type === 'ai'}
				<div class="notification is-info is-light">
                    <div class="content is-small">{chat.prompt}</div>
				</div>
			{/if}
		{/each}

		<div class="field">
			<div class="control is-small is-loading">
				<textarea
					class="textarea"
					rows="1"
					style="width: 100%;"
					bind:value={text_message}
					onchange={(e) => fnSendMessage(e)}
				></textarea>
			</div>
		</div>
	</div>
</div>

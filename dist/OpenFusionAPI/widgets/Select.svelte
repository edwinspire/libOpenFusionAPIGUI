<script>
  import { createEventDispatcher } from "svelte";

  // Crea el despachador de eventos
  const dispatch = createEventDispatcher();

  function handleClick() {
    // Despacha el evento personalizado con los datos deseados
    try {
      dispatch("select", { value: option });
    } catch (error) {
      console.log(error);
      dispatch("select", { value: 'NA' });
    }
  }
export let options = [{ id: "TEST", value: `TEST`, enabled: true }];
export let css_class = ' is-small ';
export let option = "NA";

</script>

<div class="control">
  <div class="select {css_class}" >
    <select bind:value={option}
     on:change={handleClick}>
      {#each options as h}
        <option value={h.id}>
          {h.value}
        </option>
      {/each}
    </select>
  </div>
</div>

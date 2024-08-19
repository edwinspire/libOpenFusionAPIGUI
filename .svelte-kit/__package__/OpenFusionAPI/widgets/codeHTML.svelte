<script>
  import { formatJsonForHtmlCode } from "../utils.js";
  export let jsonObject = {};
</script>

<div class="box">
  <code class="">
    {@html formatJsonForHtmlCode(jsonObject)}
  </code>
</div>

import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "@edwinspire/universal-fetch";
import "events";
import "d3";
const css = {
  code: ".container.svelte-1mut4a6{width:100%;height:300px;margin:100px auto;transform:translateY(50%)}span.svelte-1mut4a6{height:300px;width:100%;background-image:url('openfusionapi/flame.png');background-position:0 -1000px;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:svelte-1mut4a6-fire 4s linear infinite}h1.svelte-1mut4a6{color:#fff;font-size:80px;text-align:center}@keyframes svelte-1mut4a6-fire{0%{background-position:0% -50%}100%{background-position:0% -25%}}",
  map: null
};
const Start_page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="hero is-black is-fullheight" data-svelte-h="svelte-beplvv"><div class="hero-body"><div class="container svelte-1mut4a6"><div class="flame"><h1 class="svelte-1mut4a6"><span class="svelte-1mut4a6">OpenFusionAPI</span></h1></div></div></div> </section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Start_page, "StartPage").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

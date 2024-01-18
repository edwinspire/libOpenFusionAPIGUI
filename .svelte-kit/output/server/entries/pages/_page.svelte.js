import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import "@edwinspire/universal-fetch";
import "events";
import "d3";
const css = {
  code: ".her.svelte-kjqpmw{display:inherit !important}.main.svelte-kjqpmw{display:flex;justify-content:center;align-items:center}.container.svelte-kjqpmw{width:100%;height:300px;margin:100px auto;transform:translateY(50%)}span.svelte-kjqpmw{height:300px;width:100%;background-image:url('flame.png');background-position:0 -1000px;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:svelte-kjqpmw-fire 4s linear infinite}h1.svelte-kjqpmw{color:#fff;font-size:80px;text-align:center}@keyframes svelte-kjqpmw-fire{0%{background-position:0% -50%}100%{background-position:0% -25%}}",
  map: null
};
const Start_page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="hero is-black is-fullheight her svelte-kjqpmw" data-svelte-h="svelte-1ke07vb"><div class="hero-body"><div class="container svelte-kjqpmw"><div class="main svelte-kjqpmw"><figure class="image is-128x128"><img src="android-chrome-512x512.png"></figure></div> <div class="flame"><h1 class="svelte-kjqpmw"><span class="svelte-kjqpmw">OpenFusionAPI</span></h1></div></div></div> </section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Start_page, "StartPage").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

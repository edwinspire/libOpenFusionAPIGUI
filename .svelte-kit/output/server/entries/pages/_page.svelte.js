import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "@edwinspire/universal-fetch";
import "events";
import "d3";
const logo = "/_app/immutable/assets/android-chrome-512x512.6tSliZMZ.png";
const flame = "/_app/immutable/assets/flame.KSOL5w7N.png";
const css = {
  code: ".main.svelte-1wk48lg{display:flex;justify-content:center;align-items:center}.container.svelte-1wk48lg{width:100%;height:300px;margin:100px auto;transform:translateY(50%)}.span01.svelte-1wk48lg{height:300px;width:100%;background-position:0 -1000px;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:svelte-1wk48lg-fire 4s linear infinite}.h01.svelte-1wk48lg{color:#fff;font-size:80px;text-align:center}@keyframes svelte-1wk48lg-fire{0%{background-position:0% -50%}100%{background-position:0% -25%}}",
  map: null
};
const Start_page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="hero is-black is-fullheight" data-svelte-h="svelte-5iqt92"><div class="hero-body"><div class="container svelte-1wk48lg"><div class="main svelte-1wk48lg"><figure class="image is-128x128"><img${add_attribute("src", logo, 0)} alt="OpenFusionAPI"></figure></div> <div><h1 class="h01 svelte-1wk48lg"><span class="span01 svelte-1wk48lg" style="${"background-image: url( " + escape(flame, true) + ");"}">OpenFusionAPI</span></h1></div></div></div> </section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Start_page, "StartPage").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

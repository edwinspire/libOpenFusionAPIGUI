import { c as create_ssr_component, d as createEventDispatcher, f as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import uFetch from "@edwinspire/universal-fetch";
import "events";
import "d3";
const css = {
  code: ".t1.svelte-fcaoak{padding:1em}",
  map: null
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let username = "";
  let password = "";
  new uFetch();
  $$result.css.add(css);
  return `<div class="modal is-active"><div class="modal-background"></div> <div class="modal-content"><div class="box"> <div class="media t1  svelte-fcaoak" data-svelte-h="svelte-199ceze"><div class="media-left"><figure class="image is-48x48"><img src="favicon.png" alt="OpenFusionAPI"></figure></div> <div class="media-content"><p class="title is-family-sans-serif">Open Fusion API</p></div></div> <div class="field"><p class="control has-icons-left has-icons-right"><input class="input" type="text" placeholder="Username"${add_attribute("value", username, 0)}> <span class="icon is-small is-left" data-svelte-h="svelte-1564amz"><i class="fa-solid fa-user"></i></span></p></div> <div class="field"><p class="control has-icons-left"><input class="input" type="password" placeholder="Password"${add_attribute("value", password, 0)}> <span class="icon is-small is-left" data-svelte-h="svelte-1mt2f2g"><i class="fas fa-lock"></i></span></p></div> <div class="field"><p class="control"><button class="button is-success" data-svelte-h="svelte-o0gopk">Login</button></p></div></div></div> </div>`;
});
const OpenFusionAPI = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${`${validate_component(Login, "Login").$$render($$result, {}, {}, {})}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenFusionAPI, "OpenFusionAPIGUI").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

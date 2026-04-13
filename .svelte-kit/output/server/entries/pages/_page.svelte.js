import "clsx";
import { a2 as attr_class, a3 as bind_props, a4 as ensure_array_like, a5 as stringify, e as escape_html, a6 as attr, a7 as clsx } from "../../chunks/renderer.js";
import "@edwinspire/universal-fetch";
import "events";
import "prettier-plugin-sql";
import "marked";
import "echarts";
import { w as writable } from "../../chunks/index.js";
function validateBaseUrl(baseUrl) {
  try {
    const url = new URL(baseUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return baseUrl;
    }
    return "";
  } catch (e) {
    return "";
  }
}
validateBaseUrl("");
const Logo = "data:image/png;base64,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";
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { show = false, children, showCloseButton = false } = $$props;
    $$renderer2.push(`<div${attr_class("modal", void 0, { "is-active": show })}><div class="modal-background"></div> <div class="modal-content">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div> `);
    if (showCloseButton) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="modal-close is-large" aria-label="close"></button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { show, showCloseButton });
  });
}
let notifications_store = writable([]);
function Notifications($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let list_notify = [];
    notifications_store.subscribe((value) => {
      list_notify = value;
    });
    $$renderer2.push(`<div class="bottom-right svelte-5sfib3"><!--[-->`);
    const each_array = ensure_array_like(list_notify);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let s = each_array[$$index];
      if (!s.hidden) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<article${attr_class(`message is-small is-${stringify(s.color)}`, "svelte-5sfib3")}>`);
        if (s.title) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="message-header"><p>${escape_html(s.title)}</p> <button class="delete is-small" aria-label="delete"></button></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="message-body">${escape_html(s.message)}</div></article>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
const version = "1.2.4";
function Login($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let password = "";
    let processing = { waiting: false, error: null };
    let mounted = false;
    Modal($$renderer2, {
      show: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<div${attr_class("login-wrapper svelte-177ibf8", void 0, { "is-visible": mounted })}><div class="orb orb-1 svelte-177ibf8"></div> <div class="orb orb-2 svelte-177ibf8"></div> <div class="orb orb-3 svelte-177ibf8"></div> <div class="login-card box svelte-177ibf8"><div class="brand-header has-text-centered svelte-177ibf8"><div class="logo-ring svelte-177ibf8"><div class="logo-figure svelte-177ibf8"><img${attr("src", Logo)} alt="OpenFusionAPI" class="logo-img svelte-177ibf8"/></div></div> <h1 class="title is-4 mt-3 brand-title svelte-177ibf8">Open Fusion API</h1> <p class="subtitle is-6 brand-subtitle svelte-177ibf8"><span class="tag is-dark is-rounded svelte-177ibf8"><span class="icon is-small svelte-177ibf8"><i class="fa-solid fa-server svelte-177ibf8"></i></span> <span class="svelte-177ibf8">MCP Server</span></span></p></div> <div class="divider-line svelte-177ibf8"></div> <form class="login-form svelte-177ibf8"><div class="field svelte-177ibf8"><label class="label has-text-grey-light is-small svelte-177ibf8">Username</label> <p class="control has-icons-left svelte-177ibf8"><input${attr_class("input is-rounded svelte-177ibf8", void 0, { "is-danger": processing.error })} type="text" placeholder="Enter your username"${attr("value", username)} autocomplete="username"/> <span class="icon is-small is-left svelte-177ibf8"><i class="fa-solid fa-user svelte-177ibf8"></i></span></p></div> <div class="field svelte-177ibf8"><label class="label has-text-grey-light is-small svelte-177ibf8">Password</label> <p class="control has-icons-left has-icons-right svelte-177ibf8"><input${attr_class("input is-rounded svelte-177ibf8", void 0, { "is-danger": processing.error })}${attr("type", "password")} placeholder="Enter your password"${attr("value", password)} autocomplete="current-password"/> <span class="icon is-small is-left svelte-177ibf8"><i class="fa-solid fa-lock svelte-177ibf8"></i></span> <span class="icon is-small is-right is-clickable eye-icon svelte-177ibf8"${attr("title", "Show password")}><i${attr_class(clsx("fa-solid fa-eye"), "svelte-177ibf8")}></i></span></p></div> `);
        {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <div class="field mt-4 svelte-177ibf8"><p class="control svelte-177ibf8"><button type="submit"${attr_class("button is-fullwidth is-rounded login-btn svelte-177ibf8", void 0, { "is-loading": processing.waiting })}${attr("disabled", !username, true)}>`);
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<span class="icon svelte-177ibf8"><i class="fa-solid fa-right-to-bracket svelte-177ibf8"></i></span> <span class="svelte-177ibf8">Sign In</span>`);
        }
        $$renderer3.push(`<!--]--></button></p></div></form> <p class="version-tag has-text-centered has-text-grey svelte-177ibf8"><span class="icon is-small svelte-177ibf8"><i class="fa-solid fa-code-branch svelte-177ibf8"></i></span> v${escape_html(version)}</p></div></div>`);
      },
      $$slots: { default: true }
    });
  });
}
function OpenFusionAPI($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Notifications($$renderer2);
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-1-->");
      Login($$renderer2);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    OpenFusionAPI($$renderer2);
  });
}
export {
  _page as default
};
//# sourceMappingURL=_page.svelte.js.map

/** @typedef {typeof __propDef.props}  CodeHtmlProps */
/** @typedef {typeof __propDef.events}  CodeHtmlEvents */
/** @typedef {typeof __propDef.slots}  CodeHtmlSlots */
export default class CodeHtml extends SvelteComponent<{
    jsonObject?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CodeHtmlProps = typeof __propDef.props;
export type CodeHtmlEvents = typeof __propDef.events;
export type CodeHtmlSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        jsonObject?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

/** @typedef {typeof __propDef.props}  HandlerProps */
/** @typedef {typeof __propDef.events}  HandlerEvents */
/** @typedef {typeof __propDef.slots}  HandlerSlots */
export default class Handler extends SvelteComponent<{
    value: any;
    row?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type HandlerProps = typeof __propDef.props;
export type HandlerEvents = typeof __propDef.events;
export type HandlerSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        row?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

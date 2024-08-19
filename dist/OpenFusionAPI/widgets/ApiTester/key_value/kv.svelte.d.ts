/** @typedef {typeof __propDef.props}  KvProps */
/** @typedef {typeof __propDef.events}  KvEvents */
/** @typedef {typeof __propDef.slots}  KvSlots */
export default class Kv extends SvelteComponent<{
    parameters?: any[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type KvProps = typeof __propDef.props;
export type KvEvents = typeof __propDef.events;
export type KvSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        parameters?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

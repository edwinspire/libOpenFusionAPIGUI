/** @typedef {typeof __propDef.props}  CellAccessProps */
/** @typedef {typeof __propDef.events}  CellAccessEvents */
/** @typedef {typeof __propDef.slots}  CellAccessSlots */
export default class CellAccess extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellAccessProps = typeof __propDef.props;
export type CellAccessEvents = typeof __propDef.events;
export type CellAccessSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        row?: {};
        props?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

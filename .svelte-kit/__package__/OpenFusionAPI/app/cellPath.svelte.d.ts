/** @typedef {typeof __propDef.props}  CellPathProps */
/** @typedef {typeof __propDef.events}  CellPathEvents */
/** @typedef {typeof __propDef.slots}  CellPathSlots */
export default class CellPath extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellPathProps = typeof __propDef.props;
export type CellPathEvents = typeof __propDef.events;
export type CellPathSlots = typeof __propDef.slots;
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

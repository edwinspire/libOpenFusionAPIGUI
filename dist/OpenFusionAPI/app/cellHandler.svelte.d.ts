/** @typedef {typeof __propDef.props}  CellHandlerProps */
/** @typedef {typeof __propDef.events}  CellHandlerEvents */
/** @typedef {typeof __propDef.slots}  CellHandlerSlots */
export default class CellHandler extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellHandlerProps = typeof __propDef.props;
export type CellHandlerEvents = typeof __propDef.events;
export type CellHandlerSlots = typeof __propDef.slots;
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

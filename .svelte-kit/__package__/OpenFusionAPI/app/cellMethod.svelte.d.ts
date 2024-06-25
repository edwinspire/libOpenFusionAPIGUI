/** @typedef {typeof __propDef.props}  CellMethodProps */
/** @typedef {typeof __propDef.events}  CellMethodEvents */
/** @typedef {typeof __propDef.slots}  CellMethodSlots */
export default class CellMethod extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellMethodProps = typeof __propDef.props;
export type CellMethodEvents = typeof __propDef.events;
export type CellMethodSlots = typeof __propDef.slots;
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

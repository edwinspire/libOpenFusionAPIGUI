/** @typedef {typeof __propDef.props}  CellCodeProps */
/** @typedef {typeof __propDef.events}  CellCodeEvents */
/** @typedef {typeof __propDef.slots}  CellCodeSlots */
export default class CellCode extends SvelteComponent<{
    value: any;
    row?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellCodeProps = typeof __propDef.props;
export type CellCodeEvents = typeof __propDef.events;
export type CellCodeSlots = typeof __propDef.slots;
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

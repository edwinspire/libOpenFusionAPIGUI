/** @typedef {typeof __propDef.props}  CellMethodsAttrsProps */
/** @typedef {typeof __propDef.events}  CellMethodsAttrsEvents */
/** @typedef {typeof __propDef.slots}  CellMethodsAttrsSlots */
export default class CellMethodsAttrs extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get row(): {};
}
export type CellMethodsAttrsProps = typeof __propDef.props;
export type CellMethodsAttrsEvents = typeof __propDef.events;
export type CellMethodsAttrsSlots = typeof __propDef.slots;
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
};
export {};

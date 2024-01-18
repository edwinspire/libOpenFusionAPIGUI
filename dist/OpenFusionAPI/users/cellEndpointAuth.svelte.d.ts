/** @typedef {typeof __propDef.props}  CellEndpointAuthProps */
/** @typedef {typeof __propDef.events}  CellEndpointAuthEvents */
/** @typedef {typeof __propDef.slots}  CellEndpointAuthSlots */
export default class CellEndpointAuth extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get row(): {};
}
export type CellEndpointAuthProps = typeof __propDef.props;
export type CellEndpointAuthEvents = typeof __propDef.events;
export type CellEndpointAuthSlots = typeof __propDef.slots;
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

/** @typedef {typeof __propDef.props}  CellCacheTimeProps */
/** @typedef {typeof __propDef.events}  CellCacheTimeEvents */
/** @typedef {typeof __propDef.slots}  CellCacheTimeSlots */
export default class CellCacheTime extends SvelteComponent<{
    value: any;
    row?: {};
    props?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CellCacheTimeProps = typeof __propDef.props;
export type CellCacheTimeEvents = typeof __propDef.events;
export type CellCacheTimeSlots = typeof __propDef.slots;
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

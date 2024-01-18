/** @typedef {typeof __propDef.props}  CodeProps */
/** @typedef {typeof __propDef.events}  CodeEvents */
/** @typedef {typeof __propDef.slots}  CodeSlots */
export default class Code extends SvelteComponent<{
    value: any;
    row?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CodeProps = typeof __propDef.props;
export type CodeEvents = typeof __propDef.events;
export type CodeSlots = typeof __propDef.slots;
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
};
export {};

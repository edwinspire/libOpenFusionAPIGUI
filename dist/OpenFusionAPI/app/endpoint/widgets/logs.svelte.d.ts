/** @typedef {typeof __propDef.props}  LogsProps */
/** @typedef {typeof __propDef.events}  LogsEvents */
/** @typedef {typeof __propDef.slots}  LogsSlots */
export default class Logs extends SvelteComponent<{
    row?: {};
    log?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LogsProps = typeof __propDef.props;
export type LogsEvents = typeof __propDef.events;
export type LogsSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row?: {};
        log?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

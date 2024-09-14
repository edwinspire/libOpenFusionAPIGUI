/** @typedef {typeof __propDef.props}  WarningProductionProps */
/** @typedef {typeof __propDef.events}  WarningProductionEvents */
/** @typedef {typeof __propDef.slots}  WarningProductionSlots */
export default class WarningProduction extends SvelteComponent<{
    environment: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type WarningProductionProps = typeof __propDef.props;
export type WarningProductionEvents = typeof __propDef.events;
export type WarningProductionSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        environment: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

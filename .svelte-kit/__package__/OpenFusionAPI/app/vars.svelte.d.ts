/** @typedef {typeof __propDef.props}  VarsProps */
/** @typedef {typeof __propDef.events}  VarsEvents */
/** @typedef {typeof __propDef.slots}  VarsSlots */
export default class Vars extends SvelteComponent<{
    editable?: boolean;
    environment?: string;
    getCode?: () => {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get getCode(): () => {};
}
export type VarsProps = typeof __propDef.props;
export type VarsEvents = typeof __propDef.events;
export type VarsSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        editable?: boolean;
        environment?: string;
        getCode?: () => {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

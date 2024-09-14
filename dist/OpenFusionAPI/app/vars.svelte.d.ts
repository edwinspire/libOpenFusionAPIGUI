/** @typedef {typeof __propDef.props}  VarsProps */
/** @typedef {typeof __propDef.events}  VarsEvents */
/** @typedef {typeof __propDef.slots}  VarsSlots */
export default class Vars extends SvelteComponent<{
    environment?: string;
    getCode?: () => {};
    editable?: boolean;
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
        environment?: string;
        getCode?: () => {};
        editable?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

/** @typedef {typeof __propDef.props}  VarsProps */
/** @typedef {typeof __propDef.events}  VarsEvents */
/** @typedef {typeof __propDef.slots}  VarsSlots */
export default class Vars extends SvelteComponent<{
    getCode?: () => {};
    environment?: string;
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
        getCode?: () => {};
        environment?: string;
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

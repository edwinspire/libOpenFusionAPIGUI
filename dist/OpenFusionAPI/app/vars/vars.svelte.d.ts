/** @typedef {typeof __propDef.props}  VarsProps */
/** @typedef {typeof __propDef.events}  VarsEvents */
/** @typedef {typeof __propDef.slots}  VarsSlots */
export default class Vars extends SvelteComponent<{
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: {};
    title?: string;
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
        isReadOnly?: boolean;
        showCode?: boolean;
        appVars?: {};
        title?: string;
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

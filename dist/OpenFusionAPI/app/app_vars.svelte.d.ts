/** @typedef {typeof __propDef.props}  AppVarsProps */
/** @typedef {typeof __propDef.events}  AppVarsEvents */
/** @typedef {typeof __propDef.slots}  AppVarsSlots */
export default class AppVars extends SvelteComponent<{
    environment?: string;
    getCode?: () => {};
    isReadOnly?: boolean;
    showCode?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get getCode(): () => {};
}
export type AppVarsProps = typeof __propDef.props;
export type AppVarsEvents = typeof __propDef.events;
export type AppVarsSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        environment?: string;
        getCode?: () => {};
        isReadOnly?: boolean;
        showCode?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

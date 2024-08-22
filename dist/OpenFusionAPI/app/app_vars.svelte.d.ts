/** @typedef {typeof __propDef.props}  AppVarsProps */
/** @typedef {typeof __propDef.events}  AppVarsEvents */
/** @typedef {typeof __propDef.slots}  AppVarsSlots */
export default class AppVars extends SvelteComponent<{
    isReadOnly?: boolean;
    getCode?: () => {};
    environment?: string;
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
        isReadOnly?: boolean;
        getCode?: () => {};
        environment?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

/** @typedef {typeof __propDef.props}  SqlProps */
/** @typedef {typeof __propDef.events}  SqlEvents */
/** @typedef {typeof __propDef.slots}  SqlSlots */
export default class Sql extends SvelteComponent<{
    code: any;
    row: any;
    environment: any;
    getCode?: () => any;
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get reset(): () => void;
    get getCode(): () => any;
}
export type SqlProps = typeof __propDef.props;
export type SqlEvents = typeof __propDef.events;
export type SqlSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        code: any;
        row: any;
        environment: any;
        getCode?: () => any;
        reset?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

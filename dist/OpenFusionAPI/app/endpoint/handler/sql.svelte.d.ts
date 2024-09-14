/** @typedef {typeof __propDef.props}  SqlProps */
/** @typedef {typeof __propDef.events}  SqlEvents */
/** @typedef {typeof __propDef.slots}  SqlSlots */
export default class Sql extends SvelteComponent<{
    row?: any;
    reset?: () => void;
    getData?: () => {
        code: any;
        data_test: any;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get reset(): () => void;
    get getData(): () => {
        code: any;
        data_test: any;
    };
}
export type SqlProps = typeof __propDef.props;
export type SqlEvents = typeof __propDef.events;
export type SqlSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row?: any;
        reset?: () => void;
        getData?: () => {
            code: any;
            data_test: any;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

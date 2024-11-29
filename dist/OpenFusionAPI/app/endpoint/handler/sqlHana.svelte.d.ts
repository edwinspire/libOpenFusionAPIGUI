/** @typedef {typeof __propDef.props}  SqlHanaProps */
/** @typedef {typeof __propDef.events}  SqlHanaEvents */
/** @typedef {typeof __propDef.slots}  SqlHanaSlots */
export default class SqlHana extends SvelteComponent<{
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
export type SqlHanaProps = typeof __propDef.props;
export type SqlHanaEvents = typeof __propDef.events;
export type SqlHanaSlots = typeof __propDef.slots;
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

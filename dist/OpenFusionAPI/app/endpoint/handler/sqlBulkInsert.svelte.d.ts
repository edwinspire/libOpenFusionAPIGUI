/** @typedef {typeof __propDef.props}  SqlBulkInsertProps */
/** @typedef {typeof __propDef.events}  SqlBulkInsertEvents */
/** @typedef {typeof __propDef.slots}  SqlBulkInsertSlots */
export default class SqlBulkInsert extends SvelteComponent<{
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
export type SqlBulkInsertProps = typeof __propDef.props;
export type SqlBulkInsertEvents = typeof __propDef.events;
export type SqlBulkInsertSlots = typeof __propDef.slots;
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

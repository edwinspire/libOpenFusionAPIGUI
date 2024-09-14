/** @typedef {typeof __propDef.props}  FetchProps */
/** @typedef {typeof __propDef.events}  FetchEvents */
/** @typedef {typeof __propDef.slots}  FetchSlots */
export default class Fetch extends SvelteComponent<{
    row: any;
    reset?: () => void;
    getData?: () => {
        code: string;
        data_test: any;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get reset(): () => void;
    get getData(): () => {
        code: string;
        data_test: any;
    };
}
export type FetchProps = typeof __propDef.props;
export type FetchEvents = typeof __propDef.events;
export type FetchSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row: any;
        reset?: () => void;
        getData?: () => {
            code: string;
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

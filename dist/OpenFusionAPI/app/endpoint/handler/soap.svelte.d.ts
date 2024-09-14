/** @typedef {typeof __propDef.props}  SoapProps */
/** @typedef {typeof __propDef.events}  SoapEvents */
/** @typedef {typeof __propDef.slots}  SoapSlots */
export default class Soap extends SvelteComponent<{
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
export type SoapProps = typeof __propDef.props;
export type SoapEvents = typeof __propDef.events;
export type SoapSlots = typeof __propDef.slots;
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

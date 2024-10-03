/** @typedef {typeof __propDef.props}  JsProps */
/** @typedef {typeof __propDef.events}  JsEvents */
/** @typedef {typeof __propDef.slots}  JsSlots */
export default class Js extends SvelteComponent<{
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
export type JsProps = typeof __propDef.props;
export type JsEvents = typeof __propDef.events;
export type JsSlots = typeof __propDef.slots;
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

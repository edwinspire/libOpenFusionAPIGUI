/** @typedef {typeof __propDef.props}  CustomFunctionProps */
/** @typedef {typeof __propDef.events}  CustomFunctionEvents */
/** @typedef {typeof __propDef.slots}  CustomFunctionSlots */
export default class CustomFunction extends SvelteComponent<{
    row: {
        endpoint: any;
    };
    reset?: () => void;
    getData?: () => {
        code: string;
        data_test: any;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get getData(): () => {
        code: string;
        data_test: any;
    };
    get reset(): () => void;
}
export type CustomFunctionProps = typeof __propDef.props;
export type CustomFunctionEvents = typeof __propDef.events;
export type CustomFunctionSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row: {
            endpoint: any;
        };
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

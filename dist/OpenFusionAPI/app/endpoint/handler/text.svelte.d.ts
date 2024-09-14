/** @typedef {typeof __propDef.props}  TextProps */
/** @typedef {typeof __propDef.events}  TextEvents */
/** @typedef {typeof __propDef.slots}  TextSlots */
export default class Text extends SvelteComponent<{
    row: any;
    getCode?: () => any;
    reset?: () => void;
    getData?: () => {
        code: any;
        data_test: any;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get reset(): () => void;
    get getCode(): () => any;
    get getData(): () => {
        code: any;
        data_test: any;
    };
}
export type TextProps = typeof __propDef.props;
export type TextEvents = typeof __propDef.events;
export type TextSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row: any;
        getCode?: () => any;
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

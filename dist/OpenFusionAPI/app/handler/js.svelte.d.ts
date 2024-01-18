/** @typedef {typeof __propDef.props}  JsProps */
/** @typedef {typeof __propDef.events}  JsEvents */
/** @typedef {typeof __propDef.slots}  JsSlots */
export default class Js extends SvelteComponent<{
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
export type JsProps = typeof __propDef.props;
export type JsEvents = typeof __propDef.events;
export type JsSlots = typeof __propDef.slots;
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
};
export {};

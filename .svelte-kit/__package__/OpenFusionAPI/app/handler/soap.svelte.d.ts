/** @typedef {typeof __propDef.props}  SoapProps */
/** @typedef {typeof __propDef.events}  SoapEvents */
/** @typedef {typeof __propDef.slots}  SoapSlots */
export default class Soap extends SvelteComponent<{
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
export type SoapProps = typeof __propDef.props;
export type SoapEvents = typeof __propDef.events;
export type SoapSlots = typeof __propDef.slots;
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

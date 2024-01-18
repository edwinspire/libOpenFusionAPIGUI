/** @typedef {typeof __propDef.props}  CustomFunctionProps */
/** @typedef {typeof __propDef.events}  CustomFunctionEvents */
/** @typedef {typeof __propDef.slots}  CustomFunctionSlots */
export default class CustomFunction extends SvelteComponent<{
    code: any;
    row: {
        endpoint: any;
    };
    environment: any;
    getCode?: () => string;
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get getCode(): () => string;
    get reset(): () => void;
}
export type CustomFunctionProps = typeof __propDef.props;
export type CustomFunctionEvents = typeof __propDef.events;
export type CustomFunctionSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        code: any;
        row: {
            endpoint: any;
        };
        environment: any;
        getCode?: () => string;
        reset?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

/** @typedef {typeof __propDef.props}  ParametersVarJsonProps */
/** @typedef {typeof __propDef.events}  ParametersVarJsonEvents */
/** @typedef {typeof __propDef.slots}  ParametersVarJsonSlots */
export default class ParametersVarJson extends SvelteComponent<{
    code?: {};
    environment?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ParametersVarJsonProps = typeof __propDef.props;
export type ParametersVarJsonEvents = typeof __propDef.events;
export type ParametersVarJsonSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        code?: {};
        environment?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

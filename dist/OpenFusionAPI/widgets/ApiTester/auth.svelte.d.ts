/** @typedef {typeof __propDef.props}  AuthProps */
/** @typedef {typeof __propDef.events}  AuthEvents */
/** @typedef {typeof __propDef.slots}  AuthSlots */
export default class Auth extends SvelteComponent<{
    parameters?: {
        basic: {};
        bearer: {};
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AuthProps = typeof __propDef.props;
export type AuthEvents = typeof __propDef.events;
export type AuthSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        parameters?: {
            basic: {};
            bearer: {};
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
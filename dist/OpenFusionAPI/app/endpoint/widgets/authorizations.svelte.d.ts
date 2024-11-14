/** @typedef {typeof __propDef.props}  AuthorizationsProps */
/** @typedef {typeof __propDef.events}  AuthorizationsEvents */
/** @typedef {typeof __propDef.slots}  AuthorizationsSlots */
export default class Authorizations extends SvelteComponent<{
    row?: {};
    users?: {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AuthorizationsProps = typeof __propDef.props;
export type AuthorizationsEvents = typeof __propDef.events;
export type AuthorizationsSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row?: {};
        users?: {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

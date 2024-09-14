/** @typedef {typeof __propDef.props}  EndpointProps */
/** @typedef {typeof __propDef.events}  EndpointEvents */
/** @typedef {typeof __propDef.slots}  EndpointSlots */
export default class Endpoint extends SvelteComponent<{
    row?: {};
    app?: {};
    environment_list?: any[];
    endpoints?: any[];
    validateResource?: boolean;
    availableURL?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EndpointProps = typeof __propDef.props;
export type EndpointEvents = typeof __propDef.events;
export type EndpointSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        row?: {};
        app?: {};
        environment_list?: any[];
        endpoints?: any[];
        validateResource?: boolean;
        availableURL?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

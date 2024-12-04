/** @typedef {typeof __propDef.props}  EndpointLabelProps */
/** @typedef {typeof __propDef.events}  EndpointLabelEvents */
/** @typedef {typeof __propDef.slots}  EndpointLabelSlots */
export default class EndpointLabel extends SvelteComponent<{
    environment?: string;
    endpoint?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EndpointLabelProps = typeof __propDef.props;
export type EndpointLabelEvents = typeof __propDef.events;
export type EndpointLabelSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        environment?: string;
        endpoint?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

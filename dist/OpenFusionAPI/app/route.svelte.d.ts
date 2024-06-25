/** @typedef {typeof __propDef.props}  RouteProps */
/** @typedef {typeof __propDef.events}  RouteEvents */
/** @typedef {typeof __propDef.slots}  RouteSlots */
export default class Route extends SvelteComponent<{
    route: {
        route: any;
        method: any;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type RouteProps = typeof __propDef.props;
export type RouteEvents = typeof __propDef.events;
export type RouteSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        route: {
            route: any;
            method: any;
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

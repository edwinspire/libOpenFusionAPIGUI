/** @typedef {typeof __propDef.props}  IconLabelProps */
/** @typedef {typeof __propDef.events}  IconLabelEvents */
/** @typedef {typeof __propDef.slots}  IconLabelSlots */
export default class IconLabel extends SvelteComponent<{
    color?: string;
    label?: string;
    icon?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IconLabelProps = typeof __propDef.props;
export type IconLabelEvents = typeof __propDef.events;
export type IconLabelSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        color?: string;
        label?: string;
        icon?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponent<{
    idapp?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        idapp?: number;
    }; /**
     * @param {{ resource?: any; environment?: any; method?: any; idendpoint?: any; }} endpoint_value
     */
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

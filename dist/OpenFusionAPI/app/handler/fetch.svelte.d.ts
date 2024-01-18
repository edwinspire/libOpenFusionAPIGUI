/** @typedef {typeof __propDef.props}  FetchProps */
/** @typedef {typeof __propDef.events}  FetchEvents */
/** @typedef {typeof __propDef.slots}  FetchSlots */
export default class Fetch extends SvelteComponent<{
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
export type FetchProps = typeof __propDef.props;
export type FetchEvents = typeof __propDef.events;
export type FetchSlots = typeof __propDef.slots;
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
};
export {};

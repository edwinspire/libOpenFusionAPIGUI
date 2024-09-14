/** @typedef {typeof __propDef.props}  EditorProps */
/** @typedef {typeof __propDef.events}  EditorEvents */
/** @typedef {typeof __propDef.slots}  EditorSlots */
export default class Editor extends SvelteComponent<{
    value: any;
    row?: {};
    app?: {};
    showEditor?: boolean;
}, {
    data: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EditorProps = typeof __propDef.props;
export type EditorEvents = typeof __propDef.events;
export type EditorSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        row?: {};
        app?: {};
        showEditor?: boolean;
    };
    events: {
        data: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};

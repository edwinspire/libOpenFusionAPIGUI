/** @typedef {typeof __propDef.props}  EditorCodeProps */
/** @typedef {typeof __propDef.events}  EditorCodeEvents */
/** @typedef {typeof __propDef.slots}  EditorCodeSlots */
export default class EditorCode extends SvelteComponent<{
    code: any;
    lang?: string;
    getCode?: () => any;
    reset?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    message: {};
}> {
    get getCode(): () => any;
    get reset(): () => void;
}
export type EditorCodeProps = typeof __propDef.props;
export type EditorCodeEvents = typeof __propDef.events;
export type EditorCodeSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        code: any;
        lang?: string;
        getCode?: () => any;
        reset?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        message: {};
    };
};
export {};

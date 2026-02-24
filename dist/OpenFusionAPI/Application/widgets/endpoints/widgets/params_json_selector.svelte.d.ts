export default ParamsJsonSelector;
type ParamsJsonSelector = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ParamsJsonSelector: import("svelte").Component<{
    freeTyping?: any;
    placeholder?: any;
    classIcon?: any;
    label?: any;
    custom?: any;
    appvar?: any;
    environment?: any;
    langEditor?: any;
    onselect?: Function;
}, {}, "label" | "placeholder" | "environment" | "freeTyping" | "classIcon" | "custom" | "appvar" | "langEditor">;
type $$ComponentProps = {
    freeTyping?: any;
    placeholder?: any;
    classIcon?: any;
    label?: any;
    custom?: any;
    appvar?: any;
    environment?: any;
    langEditor?: any;
    onselect?: Function;
};

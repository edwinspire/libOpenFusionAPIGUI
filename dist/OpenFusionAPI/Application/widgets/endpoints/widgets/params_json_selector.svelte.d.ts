export default ParamsJsonSelector;
type ParamsJsonSelector = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const ParamsJsonSelector: import("svelte").Component<{
    freeTyping?: boolean;
    placeholder?: string;
    classIcon?: string;
    label?: string;
    value?: any;
    environment?: string;
    langEditor?: string;
    onselect?: Function;
}, {}, "value" | "label" | "environment" | "freeTyping" | "placeholder" | "classIcon" | "langEditor">;
type $$ComponentProps = {
    freeTyping?: boolean;
    placeholder?: string;
    classIcon?: string;
    label?: string;
    value?: any;
    environment?: string;
    langEditor?: string;
    onselect?: Function;
};

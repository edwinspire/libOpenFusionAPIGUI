export default AppVarsSelector;
type AppVarsSelector = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const AppVarsSelector: import("svelte").Component<{
    freeTyping?: boolean;
    placeholder?: string;
    classIcon?: string;
    label?: string;
    value?: string;
    environment?: string;
    onselect?: Function;
}, {}, "value" | "label" | "environment" | "freeTyping" | "placeholder" | "classIcon">;
type $$ComponentProps = {
    freeTyping?: boolean;
    placeholder?: string;
    classIcon?: string;
    label?: string;
    value?: string;
    environment?: string;
    onselect?: Function;
};

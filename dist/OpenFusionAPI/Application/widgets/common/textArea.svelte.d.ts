export default TextArea;
type TextArea = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const TextArea: import("svelte").Component<{
    label?: string;
    value?: string;
    placeholder?: string;
}, {}, "value" | "label" | "placeholder">;
type $$ComponentProps = {
    label?: string;
    value?: string;
    placeholder?: string;
};

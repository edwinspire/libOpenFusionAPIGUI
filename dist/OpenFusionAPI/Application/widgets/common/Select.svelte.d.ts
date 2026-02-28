export default Select;
type Select = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Select: import("svelte").Component<{
    onchange?: Function;
    option?: string;
    css_class?: string;
    options?: any[];
}, {}, "options" | "css_class" | "option">;
type $$ComponentProps = {
    onchange?: Function;
    option?: string;
    css_class?: string;
    options?: any[];
};

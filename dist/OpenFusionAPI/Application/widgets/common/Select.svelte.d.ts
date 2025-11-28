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
}, {}, "options" | "option" | "css_class">;
type $$ComponentProps = {
    onchange?: Function;
    option?: string;
    css_class?: string;
    options?: any[];
};

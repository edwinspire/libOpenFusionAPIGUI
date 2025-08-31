export default MethodsSelect;
type MethodsSelect = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const MethodsSelect: import("svelte").Component<{
    disabled?: boolean;
    option?: Record<string, any>;
    onselect: any;
}, {}, "option" | "disabled">;
type $$ComponentProps = {
    disabled?: boolean;
    option?: Record<string, any>;
    onselect: any;
};

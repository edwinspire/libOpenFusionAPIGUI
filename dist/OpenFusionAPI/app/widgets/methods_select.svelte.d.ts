export default MethodsSelect;
type MethodsSelect = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const MethodsSelect: import("svelte").Component<{
    option?: Record<string, any>;
    onselect: any;
}, {}, "option">;
type $$ComponentProps = {
    option?: Record<string, any>;
    onselect: any;
};

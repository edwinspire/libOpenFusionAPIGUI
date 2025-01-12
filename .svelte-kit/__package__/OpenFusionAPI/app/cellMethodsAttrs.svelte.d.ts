export default CellMethodsAttrs;
type CellMethodsAttrs = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const CellMethodsAttrs: import("svelte").Component<{
    value?: any;
    row?: any;
}, {}, "value" | "row">;
type $$ComponentProps = {
    value?: any;
    row?: any;
};

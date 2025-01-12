export default CellMethod;
type CellMethod = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const CellMethod: import("svelte").Component<{
    value?: string;
    row?: any;
}, {}, "value" | "row">;
type $$ComponentProps = {
    value?: string;
    row?: any;
};

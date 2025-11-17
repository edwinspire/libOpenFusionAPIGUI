export default CellPrompt;
type CellPrompt = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const CellPrompt: import("svelte").Component<{
    value?: any;
    row?: any;
    onchangecell?: Function;
}, {}, "value" | "row">;
type $$ComponentProps = {
    value?: any;
    row?: any;
    onchangecell?: Function;
};

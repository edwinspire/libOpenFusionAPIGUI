export default CellToken;
type CellToken = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const CellToken: import("svelte").Component<{
    value?: string;
}, {}, "">;
type $$ComponentProps = {
    value?: string;
};

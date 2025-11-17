export default Mcp;
type Mcp = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Mcp: import("svelte").Component<{
    row?: Record<string, any>;
    mcp?: Record<string, any>;
    ondata?: Function;
}, {}, "row" | "mcp">;
type $$ComponentProps = {
    row?: Record<string, any>;
    mcp?: Record<string, any>;
    ondata?: Function;
};

export default Mcp;
type Mcp = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Mcp: import("svelte").Component<{
    mcp?: Record<string, any>;
}, {}, "mcp">;
type $$ComponentProps = {
    mcp?: Record<string, any>;
};

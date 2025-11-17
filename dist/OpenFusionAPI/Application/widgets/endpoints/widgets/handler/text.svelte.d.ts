export default Text;
type Text = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Text: import("svelte").Component<{
    endpoint?: Record<string, any>;
    onchange?: Function;
}, {}, "endpoint">;
type $$ComponentProps = {
    endpoint?: Record<string, any>;
    onchange?: Function;
};

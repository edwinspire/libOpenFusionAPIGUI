export default Logs;
type Logs = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Logs: import("svelte").Component<{
    endpoint?: Record<string, any>;
    log?: Record<string, any>;
    ondata?: Function;
}, {}, "endpoint" | "log">;
type $$ComponentProps = {
    endpoint?: Record<string, any>;
    log?: Record<string, any>;
    ondata?: Function;
};

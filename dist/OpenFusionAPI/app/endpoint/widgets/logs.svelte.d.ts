export default Logs;
type Logs = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Logs: import("svelte").Component<{
    row?: Record<string, any>;
    log?: Record<string, any>;
    ondata?: Function;
}, {}, "row" | "log">;
type $$ComponentProps = {
    row?: Record<string, any>;
    log?: Record<string, any>;
    ondata?: Function;
};

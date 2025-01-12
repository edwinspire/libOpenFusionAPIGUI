export default Logs;
type Logs = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Logs: import("svelte").Component<{
    log?: Record<string, any>;
    options?: any[];
    ondata?: Function;
}, {}, "options" | "log">;
type $$ComponentProps = {
    log?: Record<string, any>;
    options?: any[];
    ondata?: Function;
};

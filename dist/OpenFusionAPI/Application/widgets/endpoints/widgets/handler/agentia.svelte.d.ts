export default Agentia;
type Agentia = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Agentia: import("svelte").Component<{
    idapp?: any;
    endpoint?: Record<string, any>;
    onchange?: Function;
}, {}, "endpoint" | "idapp">;
type $$ComponentProps = {
    idapp?: any;
    endpoint?: Record<string, any>;
    onchange?: Function;
};

export default Js;
type Js = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Js: import("svelte").Component<{
    endpoint?: Record<string, any>;
    onchange?: Function;
}, {}, "endpoint">;
type $$ComponentProps = {
    endpoint?: Record<string, any>;
    onchange?: Function;
};

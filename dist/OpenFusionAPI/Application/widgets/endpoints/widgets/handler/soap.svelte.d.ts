export default Soap;
type Soap = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Soap: import("svelte").Component<{
    endpoint?: Record<string, any>;
    onchange?: Function;
}, {}, "">;
type $$ComponentProps = {
    endpoint?: Record<string, any>;
    onchange?: Function;
};

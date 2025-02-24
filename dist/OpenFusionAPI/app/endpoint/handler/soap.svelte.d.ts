export default Soap;
type Soap = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Soap: import("svelte").Component<{
    row?: Record<string, any>;
    onchange?: Function;
}, {}, "">;
type $$ComponentProps = {
    row?: Record<string, any>;
    onchange?: Function;
};

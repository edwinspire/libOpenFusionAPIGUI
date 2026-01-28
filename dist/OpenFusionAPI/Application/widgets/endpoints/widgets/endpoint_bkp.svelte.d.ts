export default EndpointBkp;
type EndpointBkp = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const EndpointBkp: import("svelte").Component<{
    idendpoint?: any;
    onselect?: Function;
}, {}, "idendpoint">;
type $$ComponentProps = {
    idendpoint?: any;
    onselect?: Function;
};

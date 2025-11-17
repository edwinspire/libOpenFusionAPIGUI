export default Basic;
type Basic = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Basic: import("svelte").Component<{
    idapp?: any;
    onsavedeploy?: Function;
}, {}, "idapp">;
type $$ComponentProps = {
    idapp?: any;
    onsavedeploy?: Function;
};

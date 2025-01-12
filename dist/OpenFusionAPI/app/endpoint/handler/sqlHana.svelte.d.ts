export default SqlHana;
type SqlHana = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const SqlHana: import("svelte").Component<{
    row?: Record<string, any>;
    onchange?: Function;
}, {}, "row">;
type $$ComponentProps = {
    row?: Record<string, any>;
    onchange?: Function;
};

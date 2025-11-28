export default Variables;
type Variables = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Variables: import("svelte").Component<{
    idapp?: number;
    environment?: string;
    isReadOnly?: boolean;
    onchange?: Function;
}, {}, "idapp" | "isReadOnly" | "environment">;
type $$ComponentProps = {
    idapp?: number;
    environment?: string;
    isReadOnly?: boolean;
    onchange?: Function;
};

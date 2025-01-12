export default AppVars;
type AppVars = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const AppVars: import("svelte").Component<{
    environment?: string;
    isReadOnly?: boolean;
    onchanged?: Function;
}, {}, "isReadOnly" | "environment">;
type $$ComponentProps = {
    environment?: string;
    isReadOnly?: boolean;
    onchanged?: Function;
};

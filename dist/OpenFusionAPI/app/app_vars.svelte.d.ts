export default AppVars;
type AppVars = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const AppVars: import("svelte").Component<{
    environment?: string;
    isReadOnly?: boolean;
    environment_list?: any[];
    onchange?: Function;
}, {}, "isReadOnly" | "environment_list" | "environment">;
type $$ComponentProps = {
    environment?: string;
    isReadOnly?: boolean;
    environment_list?: any[];
    onchange?: Function;
};

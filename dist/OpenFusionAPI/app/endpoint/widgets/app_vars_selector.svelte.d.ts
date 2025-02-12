export default AppVarsSelector;
type AppVarsSelector = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const AppVarsSelector: import("svelte").Component<{
    value?: string;
    environment?: string;
    onselect?: Function;
}, {}, "value" | "environment">;
type $$ComponentProps = {
    value?: string;
    environment?: string;
    onselect?: Function;
};

export default Editor;
type Editor = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Editor: import("svelte").Component<{
    showEditor?: boolean;
    row?: Record<string, any>;
    app?: Record<string, any>;
    ondata?: Function;
}, {}, "row" | "app" | "showEditor">;
type $$ComponentProps = {
    showEditor?: boolean;
    row?: Record<string, any>;
    app?: Record<string, any>;
    ondata?: Function;
};

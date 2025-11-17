export default Editor;
type Editor = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    setData: (data: any) => void;
};
declare const Editor: import("svelte").Component<{
    showEditor?: boolean;
    onsave?: Function;
    oncopy?: Function;
}, {
    setData: (data: any) => void;
}, "showEditor">;
type $$ComponentProps = {
    showEditor?: boolean;
    onsave?: Function;
    oncopy?: Function;
};

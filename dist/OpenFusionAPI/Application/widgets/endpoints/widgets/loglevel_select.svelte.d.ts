export default LoglevelSelect;
type LoglevelSelect = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const LoglevelSelect: import("svelte").Component<{
    level?: number;
    ondata?: Function;
}, {}, "level">;
type $$ComponentProps = {
    level?: number;
    ondata?: Function;
};

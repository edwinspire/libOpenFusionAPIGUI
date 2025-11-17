export default IaChatTester;
type IaChatTester = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const IaChatTester: import("svelte").Component<{
    url?: string;
    init_prompts?: any[];
}, {}, "url" | "init_prompts">;
type $$ComponentProps = {
    url?: string;
    init_prompts?: any[];
};

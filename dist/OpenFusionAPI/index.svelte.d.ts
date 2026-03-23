export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<Record<string, never>>): void;
};
declare const Index: import("svelte").Component<Record<string, never>, {}, "">;

export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    idapp?: number;
}, {}, "idapp">;
type $$ComponentProps = {
    idapp?: number;
};

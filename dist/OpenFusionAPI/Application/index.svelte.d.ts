export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    onexit?: Function;
}, {}, "">;
type $$ComponentProps = {
    onexit?: Function;
};

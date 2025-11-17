export default Authorizations;
type Authorizations = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Authorizations: import("svelte").Component<{
    users?: Record<string, any>;
}, {}, "users">;
type $$ComponentProps = {
    users?: Record<string, any>;
};

export default Endpoint;
type Endpoint = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Endpoint: import("svelte").Component<{
    endpoint?: Record<string, any>;
    app?: Record<string, any>;
    validateResource?: boolean;
    availableURL?: boolean;
    oncopy?: Function;
}, {}, "endpoint" | "app" | "validateResource" | "availableURL">;
type $$ComponentProps = {
    endpoint?: Record<string, any>;
    app?: Record<string, any>;
    validateResource?: boolean;
    availableURL?: boolean;
    oncopy?: Function;
};

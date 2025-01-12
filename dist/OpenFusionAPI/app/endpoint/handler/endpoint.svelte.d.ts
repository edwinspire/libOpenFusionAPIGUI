export default Endpoint;
type Endpoint = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Endpoint: import("svelte").Component<{
    environment_list?: any[];
    row?: Record<string, any>;
    app?: Record<string, any>;
    validateResource?: boolean;
    availableURL?: boolean;
}, {}, "row" | "app" | "environment_list" | "validateResource" | "availableURL">;
type $$ComponentProps = {
    environment_list?: any[];
    row?: Record<string, any>;
    app?: Record<string, any>;
    validateResource?: boolean;
    availableURL?: boolean;
};

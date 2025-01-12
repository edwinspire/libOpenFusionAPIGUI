export default Vars;
type Vars = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    getCode: () => Record<string, any>;
};
declare const Vars: import("svelte").Component<{
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: Record<string, any>;
    title?: string;
}, {
    getCode: () => Record<string, any>;
}, "isReadOnly" | "showCode" | "appVars" | "title">;
type $$ComponentProps = {
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: Record<string, any>;
    title?: string;
};

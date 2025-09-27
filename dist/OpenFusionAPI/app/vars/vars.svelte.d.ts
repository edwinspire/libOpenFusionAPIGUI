export default Vars;
type Vars = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Vars: import("svelte").Component<{
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: Record<string, any>;
    title?: string;
    environment_list?: any[];
    environment?: string;
    onchange?: Function;
    oncopy?: Function;
}, {}, "isReadOnly" | "showCode" | "appVars" | "title" | "environment_list" | "environment">;
type $$ComponentProps = {
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: Record<string, any>;
    title?: string;
    environment_list?: any[];
    environment?: string;
    onchange?: Function;
    oncopy?: Function;
};

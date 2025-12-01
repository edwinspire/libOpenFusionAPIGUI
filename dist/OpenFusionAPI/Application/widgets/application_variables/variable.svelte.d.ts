export default Variable;
type Variable = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Variable: import("svelte").Component<{
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: any[];
    title?: string;
    environment?: string;
    onchange?: Function;
    oncopy?: Function;
}, {}, "title" | "isReadOnly" | "showCode" | "appVars" | "environment">;
type $$ComponentProps = {
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: any[];
    title?: string;
    environment?: string;
    onchange?: Function;
    oncopy?: Function;
};

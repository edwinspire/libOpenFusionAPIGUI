export default Variable;
type Variable = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Variable: import("svelte").Component<{
    idapp?: string;
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: any[];
    title?: string;
    environment?: string;
    onchange?: Function;
    oncopy?: Function;
}, {}, "idapp" | "title" | "isReadOnly" | "showCode" | "appVars" | "environment">;
type $$ComponentProps = {
    idapp?: string;
    isReadOnly?: boolean;
    showCode?: boolean;
    appVars?: any[];
    title?: string;
    environment?: string;
    onchange?: Function;
    oncopy?: Function;
};

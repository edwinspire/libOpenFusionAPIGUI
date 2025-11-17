export default Variables;
type Variables = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    Save: () => Promise<{
        idapp: number;
        app: string;
        enabled: boolean;
        description: string;
    }>;
};
declare const Variables: import("svelte").Component<{
    idapp?: number;
    environment?: string;
    isReadOnly?: boolean;
    onchange?: Function;
}, {
    Save: () => Promise<{
        idapp: number;
        app: string;
        enabled: boolean;
        description: string;
    }>;
}, "isReadOnly" | "environment" | "idapp">;
type $$ComponentProps = {
    idapp?: number;
    environment?: string;
    isReadOnly?: boolean;
    onchange?: Function;
};

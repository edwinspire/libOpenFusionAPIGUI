export default IconLabel;
type IconLabel = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const IconLabel: import("svelte").Component<{
    color?: string;
    label?: string;
    icon?: string;
}, {}, "label" | "color" | "icon">;
type $$ComponentProps = {
    color?: string;
    label?: string;
    icon?: string;
};

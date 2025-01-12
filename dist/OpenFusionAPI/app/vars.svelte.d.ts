export default Vars;
type Vars = SvelteComponent<{
    environment?: string;
    editable?: boolean;
    getCode?: () => {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
} & {
    getCode: () => {};
};
declare const Vars: $$__sveltets_2_IsomorphicComponent<{
    environment?: string;
    editable?: boolean;
    getCode?: () => {};
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    getCode: () => {};
}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}

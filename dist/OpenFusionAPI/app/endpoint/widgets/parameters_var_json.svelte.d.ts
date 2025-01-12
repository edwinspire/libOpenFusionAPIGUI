export default ParametersVarJson;
type ParametersVarJson = SvelteComponent<{
    code?: {};
    environment?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
};
declare const ParametersVarJson: $$__sveltets_2_IsomorphicComponent<{
    code?: {};
    environment?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
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

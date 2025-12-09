export namespace endpointColumns {
    namespace enabled {
        let label: string;
        namespace decorator {
            let component: import("svelte").Component<{
                onclick_cell: any;
                value?: any;
                row?: any;
                editInline: any;
                custom: any;
                css_cell?: string;
            }, {}, "value" | "row">;
            namespace props {
                namespace custom {
                    namespace ontrue {
                        let label_1: string;
                        export { label_1 as label };
                    }
                    namespace onfalse {
                        let label_2: string;
                        export { label_2 as label };
                    }
                    let editInline: boolean;
                }
            }
        }
    }
    namespace endpoint {
        let label_3: string;
        export { label_3 as label };
        export namespace decorator_1 {
            export { cellPath as component };
        }
        export { decorator_1 as decorator };
    }
    namespace access {
        let label_4: string;
        export { label_4 as label };
        export namespace decorator_2 {
            export { CellAccess as component };
        }
        export { decorator_2 as decorator };
    }
    namespace method {
        export namespace decorator_3 {
            export { CellMethod as component };
        }
        export { decorator_3 as decorator };
        let label_5: string;
        export { label_5 as label };
    }
    namespace handler {
        export namespace decorator_4 {
            export { cellHandler as component };
        }
        export { decorator_4 as decorator };
        let label_6: string;
        export { label_6 as label };
    }
    namespace mcp {
        export namespace decorator_5 {
            export { cellMCPTool as component };
        }
        export { decorator_5 as decorator };
        let label_7: string;
        export { label_7 as label };
    }
    namespace cache_time {
        let label_8: string;
        export { label_8 as label };
        export namespace decorator_6 {
            export { cellCacheTime as component };
        }
        export { decorator_6 as decorator };
    }
    namespace ctrl {
        export let hidden: boolean;
        let label_9: string;
        export { label_9 as label };
    }
    namespace resource {
        let hidden_1: boolean;
        export { hidden_1 as hidden };
    }
    namespace code {
        let label_10: string;
        export { label_10 as label };
        let hidden_2: boolean;
        export { hidden_2 as hidden };
    }
    namespace idapp {
        let hidden_3: boolean;
        export { hidden_3 as hidden };
    }
    namespace rowkey {
        export namespace decorator_7 {
            export { cellCountStatusCode as component };
        }
        export { decorator_7 as decorator };
        let label_11: string;
        export { label_11 as label };
    }
    namespace app {
        let hidden_4: boolean;
        export { hidden_4 as hidden };
    }
    namespace namespace {
        let hidden_5: boolean;
        export { hidden_5 as hidden };
    }
    namespace name {
        let hidden_6: boolean;
        export { hidden_6 as hidden };
    }
    namespace version {
        let hidden_7: boolean;
        export { hidden_7 as hidden };
    }
    namespace description {
        let hidden_8: boolean;
        export { hidden_8 as hidden };
    }
    namespace vars {
        let hidden_9: boolean;
        export { hidden_9 as hidden };
    }
    namespace idendpoint {
        let hidden_10: boolean;
        export { hidden_10 as hidden };
    }
    namespace cors {
        let hidden_11: boolean;
        export { hidden_11 as hidden };
    }
    namespace headers_test {
        let hidden_12: boolean;
        export { hidden_12 as hidden };
    }
    namespace data_test {
        let hidden_13: boolean;
        export { hidden_13 as hidden };
    }
    namespace latest_updater {
        let hidden_14: boolean;
        export { hidden_14 as hidden };
    }
    namespace environment {
        let hidden_15: boolean;
        export { hidden_15 as hidden };
    }
    namespace cost_by_request {
        let hidden_16: boolean;
        export { hidden_16 as hidden };
    }
    namespace cost_by_kb {
        let hidden_17: boolean;
        export { hidden_17 as hidden };
    }
    namespace custom_data {
        let hidden_18: boolean;
        export { hidden_18 as hidden };
    }
    namespace keywords {
        let hidden_19: boolean;
        export { hidden_19 as hidden };
    }
    namespace cache_size {
        let hidden_20: boolean;
        export { hidden_20 as hidden };
    }
    namespace docs {
        let hidden_21: boolean;
        export { hidden_21 as hidden };
    }
    namespace json_schema {
        let hidden_22: boolean;
        export { hidden_22 as hidden };
    }
    namespace createdAt {
        let hidden_23: boolean;
        export { hidden_23 as hidden };
    }
    namespace updatedAt {
        let hidden_24: boolean;
        export { hidden_24 as hidden };
    }
}
export default Index;
import cellPath from './cellPath.svelte';
import CellAccess from './cellAccess.svelte';
import CellMethod from './cellMethod.svelte';
import cellHandler from './cellHandler.svelte';
import cellMCPTool from './cellMCPTool.svelte';
import cellCacheTime from './cellCacheTime.svelte';
import cellCountStatusCode from './cellCountStatusCode.svelte';
type Index = SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
};
declare const Index: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}

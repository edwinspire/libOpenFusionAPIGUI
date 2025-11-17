export const listAccessMethod: {
    value: string;
    id: number;
}[];
export namespace listHTTPMethods {
    namespace GET {
        let color: string;
        let icon: string;
    }
    namespace POST {
        let color_1: string;
        export { color_1 as color };
        let icon_1: string;
        export { icon_1 as icon };
    }
    namespace DELETE {
        let color_2: string;
        export { color_2 as color };
        let icon_2: string;
        export { icon_2 as icon };
    }
    namespace PUT {
        let color_3: string;
        export { color_3 as color };
        let icon_3: string;
        export { icon_3 as icon };
    }
    namespace WS {
        let color_4: string;
        export { color_4 as color };
        let icon_4: string;
        export { icon_4 as icon };
    }
}
export namespace listHandlers {
    namespace JS {
        let color_5: string;
        export { color_5 as color };
        let icon_5: string;
        export { icon_5 as icon };
        export let label: string;
    }
    namespace SQL {
        let color_6: string;
        export { color_6 as color };
        let icon_6: string;
        export { icon_6 as icon };
        let label_1: string;
        export { label_1 as label };
    }
    namespace SQL_BULK_I {
        let color_7: string;
        export { color_7 as color };
        let icon_7: string;
        export { icon_7 as icon };
        let label_2: string;
        export { label_2 as label };
    }
    namespace HANA {
        let color_8: string;
        export { color_8 as color };
        let icon_8: string;
        export { icon_8 as icon };
        let label_3: string;
        export { label_3 as label };
    }
    namespace FETCH {
        let color_9: string;
        export { color_9 as color };
        let icon_9: string;
        export { icon_9 as icon };
        let label_4: string;
        export { label_4 as label };
    }
    namespace SOAP {
        let color_10: string;
        export { color_10 as color };
        let icon_10: string;
        export { icon_10 as icon };
        let label_5: string;
        export { label_5 as label };
    }
    namespace TEXT {
        let color_11: string;
        export { color_11 as color };
        let icon_11: string;
        export { icon_11 as icon };
        let label_6: string;
        export { label_6 as label };
    }
    namespace FUNCTION {
        let color_12: string;
        export { color_12 as color };
        let icon_12: string;
        export { icon_12 as icon };
        let label_7: string;
        export { label_7 as label };
    }
    namespace MONGODB {
        let color_13: string;
        export { color_13 as color };
        let icon_13: string;
        export { icon_13 as icon };
        let label_8: string;
        export { label_8 as label };
    }
    namespace MCP {
        let color_14: string;
        export { color_14 as color };
        let icon_14: string;
        export { icon_14 as icon };
        let label_9: string;
        export { label_9 as label };
    }
}
export const Environment: {
    id: string;
    value: string;
    color: string;
    background: string;
    icon: string;
}[];
export namespace defaultApp {
    namespace vars {
        let dev: {};
        let qa: {};
        let prd: {};
    }
    let params: {};
    let idapp: any;
    let app: string;
    let rowkey: number;
    let iduser: any;
    let enabled: boolean;
    let description: string;
}
export namespace defaultEndpoint {
    let enabled_1: boolean;
    export { enabled_1 as enabled };
    export let endpoint: string;
    export let access: number;
    export let method: string;
    export let handler: string;
    export let mcp: {};
    export let cache_time: number;
    export namespace ctrl {
        let admin: boolean;
        let users: any[];
        let log: {};
    }
    export let resource: string;
    export let code: string;
    let idapp_1: number;
    export { idapp_1 as idapp };
    let description_1: string;
    export { description_1 as description };
    export let idendpoint: number;
    export let cors: {};
    export let headers_test: {};
    export namespace data_test {
        let query: {
            enabled: boolean;
            key: string;
            value: string;
        }[];
        namespace body {
            let selection: number;
        }
        let headers: {};
        namespace auth {
            let selection_1: number;
            export { selection_1 as selection };
        }
    }
    export let latest_updater: any;
    export let environment: string;
    export namespace json_schema {
        export namespace _in {
            let enabled_2: boolean;
            export { enabled_2 as enabled };
            export namespace schema {
                let type: string;
                let properties: {};
                let additionalProperties: boolean;
            }
        }
        export { _in as in };
        export namespace out {
            let enabled_3: boolean;
            export { enabled_3 as enabled };
            export namespace schema_1 {
                let type_1: string;
                export { type_1 as type };
                let properties_1: {};
                export { properties_1 as properties };
                let additionalProperties_1: boolean;
                export { additionalProperties_1 as additionalProperties };
            }
            export { schema_1 as schema };
        }
    }
}

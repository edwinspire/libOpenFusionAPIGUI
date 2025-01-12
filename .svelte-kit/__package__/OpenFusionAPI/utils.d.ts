/**
 * @param {string} string_url
 */
export function validateURL(string_url: string): boolean;
export function createEndpoint(method: any, app: any, resource: any, environment: any): string;
export namespace url_paths {
    let getfunctions: string;
    let getHandler: string;
    let Methods: string;
    let listEnv: string;
    let listApps: string;
    let getApp: string;
    let saveApp: string;
    let saveMethod: string;
    let login: string;
    let getCacheSize: string;
    let clearCache: string;
    let getUsersList: string;
    let getResponsesCountStatusCode: string;
    let getLogs: string;
}
export const userStore: import("svelte/store").Writable<{}>;
export const listMethodStore: import("svelte/store").Writable<{}>;
export const listHandlerStore: import("svelte/store").Writable<{}>;
export const listFunctionStoreDev: import("svelte/store").Writable<{}>;
export const listFunctionStoreQA: import("svelte/store").Writable<{}>;
export const listFunctionStorePRD: import("svelte/store").Writable<{}>;
export const listAppVars: import("svelte/store").Writable<{}>;
export const storeCacheSize: import("svelte/store").Writable<{}>;
export const storeUsersList: import("svelte/store").Writable<{}>;
export const storeCountResponseStatusCode: import("svelte/store").Writable<{}>;
export function formatJsonForHtmlCode(json: any): string;
export function getListUsers(token: string): Promise<void>;
export function getListFunction(token: string, appName: string): Promise<void>;
export function getListHandler(token: string): Promise<void>;
export function getListMethods(token: string): Promise<void>;
export function getCacheSize(app_name: any, token: any): Promise<void>;
export function defaultValuesRow(row: any): any;
export function getCountStatusCode(app_name: any, token: any): Promise<void>;
export namespace css_handlers {
    namespace FETCH {
        let css: string;
        let label: string;
        let icon: string;
    }
    namespace JS {
        let css_1: string;
        export { css_1 as css };
        let label_1: string;
        export { label_1 as label };
        let icon_1: string;
        export { icon_1 as icon };
    }
    namespace SOAP {
        let css_2: string;
        export { css_2 as css };
        let label_2: string;
        export { label_2 as label };
        let icon_2: string;
        export { icon_2 as icon };
    }
    namespace SOAPFn {
        let css_3: string;
        export { css_3 as css };
        let label_3: string;
        export { label_3 as label };
        let icon_3: string;
        export { icon_3 as icon };
    }
    namespace SQL {
        let css_4: string;
        export { css_4 as css };
        let label_4: string;
        export { label_4 as label };
        let icon_4: string;
        export { icon_4 as icon };
    }
    namespace TEXT {
        let css_5: string;
        export { css_5 as css };
        let label_5: string;
        export { label_5 as label };
        let icon_5: string;
        export { icon_5 as icon };
    }
    namespace FUNCTION {
        let css_6: string;
        export { css_6 as css };
        let label_6: string;
        export { label_6 as label };
        let icon_6: string;
        export { icon_6 as icon };
    }
}
export const listAccessMethod: {
    value: string;
    id: number;
}[];
export namespace listHTTPMethods {
    namespace GET {
        export let color: string;
        let icon_7: string;
        export { icon_7 as icon };
    }
    namespace POST {
        let color_1: string;
        export { color_1 as color };
        let icon_8: string;
        export { icon_8 as icon };
    }
    namespace DELETE {
        let color_2: string;
        export { color_2 as color };
        let icon_9: string;
        export { icon_9 as icon };
    }
    namespace PUT {
        let color_3: string;
        export { color_3 as color };
        let icon_10: string;
        export { icon_10 as icon };
    }
    namespace WS {
        let color_4: string;
        export { color_4 as color };
        let icon_11: string;
        export { icon_11 as icon };
    }
}
export namespace listHandlers {
    export namespace JS_1 {
        let color_5: string;
        export { color_5 as color };
        let icon_12: string;
        export { icon_12 as icon };
        let label_7: string;
        export { label_7 as label };
    }
    export { JS_1 as JS };
    export namespace SQL_1 {
        let color_6: string;
        export { color_6 as color };
        let icon_13: string;
        export { icon_13 as icon };
        let label_8: string;
        export { label_8 as label };
    }
    export { SQL_1 as SQL };
    export namespace SQL_BULK_I {
        let color_7: string;
        export { color_7 as color };
        let icon_14: string;
        export { icon_14 as icon };
        let label_9: string;
        export { label_9 as label };
    }
    export namespace HANA {
        let color_8: string;
        export { color_8 as color };
        let icon_15: string;
        export { icon_15 as icon };
        let label_10: string;
        export { label_10 as label };
    }
    export namespace FETCH_1 {
        let color_9: string;
        export { color_9 as color };
        let icon_16: string;
        export { icon_16 as icon };
        let label_11: string;
        export { label_11 as label };
    }
    export { FETCH_1 as FETCH };
    export namespace SOAP_1 {
        let color_10: string;
        export { color_10 as color };
        let icon_17: string;
        export { icon_17 as icon };
        let label_12: string;
        export { label_12 as label };
    }
    export { SOAP_1 as SOAP };
    export namespace TEXT_1 {
        let color_11: string;
        export { color_11 as color };
        let icon_18: string;
        export { icon_18 as icon };
        let label_13: string;
        export { label_13 as label };
    }
    export { TEXT_1 as TEXT };
    export namespace FUNCTION_1 {
        let color_12: string;
        export { color_12 as color };
        let icon_19: string;
        export { icon_19 as icon };
        let label_14: string;
        export { label_14 as label };
    }
    export { FUNCTION_1 as FUNCTION };
}
export namespace listEnv {
    namespace prd {
        let color_13: string;
        export { color_13 as color };
        export let background: string;
        let icon_20: string;
        export { icon_20 as icon };
        let label_15: string;
        export { label_15 as label };
    }
    namespace qa {
        let color_14: string;
        export { color_14 as color };
        let background_1: string;
        export { background_1 as background };
        let icon_21: string;
        export { icon_21 as icon };
        let label_16: string;
        export { label_16 as label };
    }
    namespace dev {
        let color_15: string;
        export { color_15 as color };
        let background_2: string;
        export { background_2 as background };
        let icon_22: string;
        export { icon_22 as icon };
        let label_17: string;
        export { label_17 as label };
    }
}

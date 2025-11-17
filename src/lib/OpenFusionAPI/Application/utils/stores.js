import { writable } from 'svelte/store';

export const userStore = writable({});
export const listMethodStore = writable({});
export const listHandlerStore = writable({});
export const listFunctionStoreDev = writable({});
export const listFunctionStoreQA = writable({});
export const listFunctionStorePRD = writable({});
export const listAppVars = writable({});
export const storeCacheSize = writable({});
export const storeUsersList = writable({});
export const storeCountResponseStatusCode = writable({});
export const storeEndpointOnStart = writable({});
export const storeEndpointOnComplete = writable({});
export const storeServerDynamicInformation = writable({});

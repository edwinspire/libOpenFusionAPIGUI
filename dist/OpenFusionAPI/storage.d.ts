export class SessionStorageManager extends EventTarget {
    save(key: any, value: any): void;
    get(key: any): any;
    remove(key: any): void;
    clear(key: any): void;
}
export class LocalStorageManager extends EventTarget {
    save(key: any, value: any): void;
    get(key: any): any;
    remove(key: any): void;
    clear(key: any): void;
}

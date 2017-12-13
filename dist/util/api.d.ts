export interface ApiCallConfig {
    method: string;
    body?: any;
}
export declare class Api {
    host: string;
    debug: boolean;
    constructor(host: string, debug?: boolean);
    private _call(endpoint, config);
    del(endpoint: string): Promise<any>;
    get(endpoint: string): Promise<any>;
    post(endpoint: string, body: any): Promise<any>;
    patch(endpoint: string, body: any): Promise<any>;
}

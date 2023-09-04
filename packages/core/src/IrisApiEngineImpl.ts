import { ApiInterceptor, ApiParam, CallIrisApiResult, IrisApiEngine } from "./IrisApiEngine";

const DO_NOT_HANDLE = -1000;

export class IrisApiEngineImpl implements IrisApiEngine {

    // private static instance: IrisApiEngine;

    private apiInterceptor: Array<ApiInterceptor> = [];

    constructor() {
    }

    // static getInstance() {
    //     if (!IrisApiEngine.instance) {
    //         IrisApiEngine.instance = new IrisApiEngine();
    //     }
    //     return IrisApiEngine.instance;
    // }

    public callIrisApi(apiParam: ApiParam): Promise<CallIrisApiResult> {
        for (let interceptor of this.apiInterceptor) {
            let result = interceptor.intercept(apiParam);
            if (result) {
                return result;
            }
        }
        return Promise.resolve(CallIrisApiResult.failed(DO_NOT_HANDLE, 0));
    }


    public dispose(): Promise<void> {
        this.apiInterceptor = [];
        return Promise.resolve();
    }
}
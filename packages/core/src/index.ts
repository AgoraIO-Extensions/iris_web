import { CallIrisApiResult, EventParam, callIrisApi, createIrisApiEngine, createIrisEventHandler, disposeIrisApiEngine } from "./IrisApiEngine";

export * from "./IrisApiEngine";
export * from "./call_api_executor"; 

export let IrisCore = {
    createIrisApiEngine: createIrisApiEngine,
    disposeIrisApiEngine: disposeIrisApiEngine,
    callIrisApi: callIrisApi,
    createIrisEventHandler: createIrisEventHandler,

    CallIrisApiResult: CallIrisApiResult,
    EventParam: EventParam,
}
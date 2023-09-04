
export class CallIrisApiResult {

    public constructor(
        public readonly code: number,
        public readonly data: string,
    ) { }

    public static success(irisReturnCode: number = 0, resultCode: number = 0, rawResult?: string,): CallIrisApiResult {
        let result: string;
        if (rawResult) {
            result = rawResult;
        } else {
            result = `{"result": ${resultCode}}`;
        }
        return new CallIrisApiResult(irisReturnCode, result);
    }

    public static failed(irisReturnCode: number, resultCode: number, rawResult?: string,): CallIrisApiResult {
        let result: string;
        if (rawResult) {
            result = rawResult;
        } else {
            result = `{"result": ${resultCode}}`;
        }
        return new CallIrisApiResult(irisReturnCode, result);
    }
}

export type CallApiReturnType = number | Promise<CallIrisApiResult>;

export type AsyncTaskType = () => Promise<CallIrisApiResult>;


export interface ApiInterceptor {
    intercept(apiParam: ApiParam): Promise<CallIrisApiResult> | undefined;
}

export class EventParam {
    constructor(
        event: string,
        data: string,
        data_size: number,
        result: string,
        buffer: Array<any>,
        length: Array<number>,
        buffer_count: number

    ) {
        this.event = event;
        this.data = data;
        this.data_size = data_size;
        this.result = result;
        this.buffer = buffer;
        this.length = length;
        this.buffer_count = buffer_count;
    }

    event: string;
    data: string;
    data_size: number;
    result: string;
    buffer: Array<any>;
    length: Array<number>;
    buffer_count: number;
}

export type ApiParam = EventParam;


export interface IrisApiEngine {
    callIrisApi(apiParam: ApiParam): Promise<CallIrisApiResult>;

    dispose(): Promise<void>;
}
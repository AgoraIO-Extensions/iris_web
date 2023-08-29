class AsyncQueue {
    queue = Promise.resolve()

    enqueue(operation) {
        return new Promise((resolve, reject) => {
            this.queue = this.queue
                .then(operation)
                .then(resolve)
                .catch(reject)
        })
    }

    cancel() {

    }
}

export class CallIrisApiResult {

    public constructor(
        public readonly code: number,
        public readonly data: string,
    ) { }

    public static success(irisReturnCode: number = 0, resultCode: number = 0, rawResult?: string, ): CallIrisApiResult {
        let result: string;
        if (rawResult) {
            result = rawResult;
        } else {
            result = `{"result": ${resultCode}}`;
        }
        return new CallIrisApiResult(irisReturnCode, result);
    }

    public static failed(irisReturnCode: number, resultCode: number, rawResult?: string, ): CallIrisApiResult {
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

export class CallApiExecutor {

    private isAsyncCall: boolean;
    private queue: AsyncQueue

    constructor(isAsyncCall: boolean) {
        this.isAsyncCall = isAsyncCall;
        this.queue = new AsyncQueue();
    }

    execute(task: AsyncTaskType): CallApiReturnType {
        console.log(`CallApiExecutor execute111: ${this.isAsyncCall}`);
        if (!this.isAsyncCall) {
            console.log(`CallApiExecutor execute222: ${this.isAsyncCall}`);
            this.queue.enqueue(task);
            return 0;
        }

        console.log(`CallApiExecutor execute333: ${this.isAsyncCall}`);
        let tmp = task();
        console.log(`CallApiExecutor execute444: ${tmp}`);
        return tmp;

    }


}

export function isPromise(p) {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
}
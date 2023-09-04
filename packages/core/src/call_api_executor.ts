import { AsyncTaskType, CallApiReturnType } from "./IrisApiEngine";

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
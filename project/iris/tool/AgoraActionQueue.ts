export interface Action {
    fun: Function,
    args: Array<any>
};


export class AgoraActionQueue {

    private _queue: Array<Action> = new Array<Action>();
    private _next: Function = null;

    constructor() {
        this._next = this.next.bind(this);
    }

    putAction(action: Action) {
        this._queue.push(action);
        if (this._queue.length == 1) {
            let action: Action = this._queue[0];
            action.args.push(this._next);
            // console.log("action args");
            // console.log(action.args);
            action.fun.apply(null, action.args);
        }
    }

    next() {
        this._queue.shift();
        if (this._queue.length > 0) {
            let action: Action = this._queue[0];
            // console.log("action args");
            // console.log(action.args);
            action.args.push(this._next);
            action.fun.apply(null, action.args);
        }
    }





}

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

export class CallApiResult {

    public constructor(
        public readonly code: number,
        public readonly data: string,
      ) {}


}

export type CallApiReturnType = number | Promise<CallApiResult>;



export class CallApiExecutor {

    private isSyncCall: boolean;
    private queue: AsyncQueue

    constructor(isAsyncCall: boolean) {
        this.isSyncCall = isAsyncCall;
        this.queue = new AsyncQueue();
    }

    execute(task: Function): CallApiReturnType {
        if (this.isSyncCall) {
            this.queue.enqueue(task);
            return 0;
        } 

        return task();
        
    }


}
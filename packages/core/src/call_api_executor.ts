import { AsyncTaskType, CallApiReturnType } from './IrisApiEngine';

class AsyncQueue {
  queue = Promise.resolve();

  enqueue(operation: AsyncTaskType) {
    return new Promise((resolve, reject) => {
      this.queue = this.queue.then(operation).then(resolve).catch(reject);
    });
  }

  cancel() {}
}

export class CallApiExecutor {
  private isAsyncCall: boolean;
  private queue: AsyncQueue;

  constructor(isAsyncCall: boolean) {
    this.isAsyncCall = isAsyncCall;
    this.queue = new AsyncQueue();
  }

  execute(task: AsyncTaskType): CallApiReturnType {
    if (!this.isAsyncCall) {
      this.queue.enqueue(task);
      return 0;
    }

    let tmp = task();
    return tmp;
  }
}

type MaybePromise<T> = T | PromiseLike<T>;

export function isPromise<T>(value: MaybePromise<T>): value is PromiseLike<T> {
  return value != null && typeof (value as PromiseLike<T>).then === 'function';
}

export interface Action {
    fun: Function,
    args: Array<any>
};


export class AgoraActionQueue {

    private _thiz: any = null;
    private _queue: Array<Action> = new Array<Action>();
    private _next: Function = null;

    constructor(thiz: any) {
        this._thiz = thiz;
        this._next = this.next.bind(this);
    }

    putAction(action: Action) {
        this._queue.push(action);
        if (this._queue.length == 1) {
            let action: Action = this._queue[0];
            action.args.push(this._next);
            console.log("action args");
            console.log(action.args);
            action.fun.apply(this._thiz, action.args);
        }
    }

    next() {
        this._queue.shift();
        if (this._queue.length > 0) {
            let action: Action = this._queue[0];
            console.log("action args");
            console.log(action.args);
            action.args.push(this._next);
            action.fun.apply(this._thiz, action.args);
        }
    }





}
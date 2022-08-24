import { renderPass, renderError } from "./render";
import { waitForDebugger } from "inspector";


export type TestCallBack = (next: any) => void;
interface Action {
    titile: string,
    cb: TestCallBack,
    priority: number
};

export function waitForSecond(second: number): Promise<void> {
    return new Promise<void>((resolve, rejcet) => {
        setTimeout(() => {
            resolve();
        }, second * 1000);
    });
}

export class TestActionQueue {

    private _thiz: any = null;
    private _queue: Array<Action> = new Array<Action>();
    private _curTitle: string = "";

    constructor() {

    }

    putAction(title: string, cb: TestCallBack, priority: number) {
        this._queue.push({ titile: title, cb: cb, priority: priority });
    }

    async start() {
        // if (this._queue.length > 0) {
        //     let action: Action = this._queue[0];
        //     this._curTitle = action.titile;
        //     action.cb.call(this, this.next.bind(this));
        // }
        // return new Promise((resolve, rejcet) => {

        this._queue.sort((a, b) => {
            return b.priority - a.priority;
        })

        for (let i = 0; i < this._queue.length; i++) {
            let action: Action = this._queue[i];
            this._curTitle = action.titile;
            await action.cb.call(this);
            await waitForSecond(2);
        }
        // })
    }

    // next() {
    //     this._queue.shift();
    //     if (this._queue.length > 0) {
    //         let action: Action = this._queue[0];
    //         this._curTitle = action.titile;
    //         action.cb.call(this, this.next.bind(this));
    //     }
    // }

    shouldEqual(title: string, compareValue: any, expectValue: any) {
        if (compareValue == expectValue) {
            renderPass(this._curTitle, title);
        }
        else {
            renderError(this._curTitle, title);
        }
    }

    shouldReturnTrue(title: string, cb: any) {
        let result = cb();
        if (result === true) {
            renderPass(this._curTitle, title);
        }
        else {
            renderError(this._curTitle, title);
        }
    }


}
import { renderPass, renderError, renderTitle, renderEnd } from "./render";
import { waitForDebugger } from "inspector";
import { title } from "process";


export type TestCallBack = (next: any) => void;
interface Action {
    titile: string,
    cb: TestCallBack,
    priority: number
};

export enum Priority {
    Min = -1,
    Low = 0,
    Medium = 2,
    High = 3
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
    private _isStop: boolean = false;

    constructor() {

    }

    putAction(title: string, cb: TestCallBack, priority: Priority) {
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
            if (this._isStop) {
                break;
            }

            try {
                let action: Action = this._queue[i];
                this._curTitle = action.titile;
                renderTitle(action.titile);
                if (action.priority == Priority.Low) {
                    renderTitle("特殊测试已经测试完毕, 剩余的case可以挂机等待结果了");
                }
                await action.cb.call(this);
                await waitForSecond(2);
            }
            catch (e) {
                renderError(this._curTitle, e, "测试已经终止");
                return;
            }
        }
        renderEnd(this._isStop ? "测试已经终止" : "所有测试已经完成");

    }

    public stop() {
        this._isStop = true;
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
        if (compareValue === expectValue) {
            renderPass(this._curTitle, title);
        }
        else {
            renderError(this._curTitle, title, "comValue: " + compareValue + "   expectValue: " + expectValue);
        }
    }

    shouldReturnTrue(title: string, cb: any) {
        let result = cb();
        if (result === true) {
            renderPass(this._curTitle, title);
        }
        else {
            renderError(this._curTitle, title, "");
        }
    }

    shouldWarn(title: string, val: boolean, des: string) {
        if (val) {
            renderError(this._curTitle, title, des);
        }
        else {
            renderPass(this._curTitle, title);
        }
    }


}
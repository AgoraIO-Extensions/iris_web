
import { IrisEventHandler } from "../base/BaseType";
import { AgoraActionQueue } from "../tool/AgoraActionQueue";
import { AgoraConsole } from "../tool/AgoraConsole";
import { CallApiType, IrisRtcEngine, GenerateVideoTrackLabelOrHtmlElementCb } from "./IrisRtcEngine";
import { IrisVideoFrameBufferManager } from "./IrisVideoFrameBufferManager";


export class IrisApiEngine {

    public static instance: IrisApiEngine;

    private _engine: IrisRtcEngine;


    constructor() {
        this._engine = new IrisRtcEngine();
    }

    public callIrisApi(func_name: string,
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {

        let array = func_name.split('_');
        let className = array[0];
        let funName = array[1];

        let callApiFun: CallApiType = this._engine[funName] as CallApiType;
        if (callApiFun) {
            let ret = callApiFun.call(this._engine, params, paramLength, buffer, bufferLength, result);
            AgoraConsole.log("[callIrisApi] " + func_name + " : " + ret);
            return ret;
        }
        else {
            AgoraConsole.warn(func_name + " : not found in IrisApiEngine.ts");
            return -4;
        }
    }

    public destruction() {
        this._engine.destruction();
    }

    public setIrisRtcEngineEventHandler(event_handler: IrisEventHandler): void {
        this._engine.setEventHandler(event_handler);
    }

    public unsetIrisRtcEngineEventHandler(event_handler: IrisEventHandler): void {
        this._engine.setEventHandler(null);
    }

    public attach(manager_ptr: IrisVideoFrameBufferManager) {
        manager_ptr.setEngine(this._engine);
    }

    public detach(manager_ptr: IrisVideoFrameBufferManager) {
        manager_ptr.setEngine(null);
    }

    public setGenerateVideoTrackLabelOrHtmlElementCb(cb: GenerateVideoTrackLabelOrHtmlElementCb) {
        this._engine.setGenerateVideoTrackLabelOrHtmlElementCb(cb);
    }
}
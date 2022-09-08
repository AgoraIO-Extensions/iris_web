
import { IrisEventHandler } from "../base/BaseType";
import { AgoraActionQueue } from "../tool/AgoraActionQueue";
import { AgoraConsole } from "../tool/AgoraConsole";
import { CallApiType, IrisRtcEngine, GenerateVideoTrackLabelOrHtmlElementCb } from "./IrisRtcEngine";
import { IrisVideoFrameBufferManager } from "./IrisVideoFrameBufferManager";
import * as agorartc from "../terra/rtc_types/Index";


export class IrisApiEngine {

    public static instance: IrisApiEngine;

    private _engine: IrisRtcEngine;


    constructor() {
        this._engine = new IrisRtcEngine();
    }

    public callIrisApi(func_name: string,
        params: string, paramLength: number,
        buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any): number {

        return this._engine.callIrisApi(func_name, params, paramLength, buffer, bufferLength, result);
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
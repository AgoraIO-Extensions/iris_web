
import { IrisEventHandler } from "../base/BaseType";
import { AgoraActionQueue } from "../tool/AgoraActionQueue";
import { AgoraConsole } from "../tool/AgoraConsole";
import { CallApiType, IrisRtcEngine, GenerateVideoTrackLabelOrHtmlElementCb } from "./IrisRtcEngine";
import { IrisVideoFrameBufferManager } from "./IrisVideoFrameBufferManager";
import * as agorartc from "../terra/rtc_types/Index";

// export class CallApiResult {
//     result: string;
//     code: 
// }

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


export class IrisApiEngine {

    public static instance: IrisApiEngine;

    private _engine: IrisRtcEngine;


    constructor() {
        this._engine = new IrisRtcEngine();
    }

    public callIrisApi(apiParam: ApiParam): number {

        return this._engine.callIrisApi(apiParam);
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
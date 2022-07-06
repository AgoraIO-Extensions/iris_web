
import { IrisRtcEngine } from "./IrisRtcEngine";

export class IrisApiEngine {

    private _engine: IrisRtcEngine;

    public callIrisApi(engine_ptr: IrisApiEngine, func_name: string,
        params: string, paramLength: number,
        buffer: any, bufferLength: number,): string {

    }

    public release() {
        this._engine.release();
    }

    public setIrisRtcEngineEventHandler(event_handler: IrisEventHandler) {

    }

    public unsetIrisRtcEngineEventHandler(event_handler: IrisEventHandler) {

    }

    // public registerAudioFrameObserver(
    //     observer: IrisCAudioEncodedFrameObserver,
    //     params: string): IrisAudioEncodedFrameObserverHandle {

    // }

    // public unRegisterAudioFrameObserver(
    //     observer: IrisRtcAudioFrameObserver,
    //     identifier: string) {

    // }

    // public registerVideoFrameObserver(
    //     observer: IrisRtcVideoFrameObserver,
    //     order: number, identifier: string): IrisRtcVideoFrameObserverHandle {

    // }

    // public unRegisterVideoFrameObserver(
    //     observer: IrisRtcVideoFrameObserver,
    //     identifier: string) {

    // }

    // public registerVideoEncodedFrameObserver(
    //     observer: IrisRtcCVideoEncodedVideoFrameObserver,
    //     order: number, identifier: number): IrisRtcVideoEncodedVideoFrameObserverHandle {

    // }

    // public unRegisterVideoEncodedFrameObserver(
    //     observer: IrisRtcVideoEncodedVideoFrameObserver,
    //     identifier: string) {

    // }

    // public registerAudioEncodedFrameObserver(
    //     observer: IrisAudioEncodedFrameObserver,
    //     params: string): IrisAudioEncodedFrameObserver {

    // }

    // public unRegisterAudioEncodedFrameObserver(
    //     observer: IrisAudioEncodedFrameObserver, params: string) {

    // }









}
import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import { IrisCEventHandler, IrisEventHandlerHandle } from "./base/BaseType";
import { IrisApiEngine } from "./engine/IrisApiEngine";
import { IrisVideoFrameBufferManager } from "./engine/IrisVideoFrameBufferManager";


//IrisApiEngine
export function CreateIrisApiEngine(): IrisApiEngine {
    return new IrisApiEngine();
}

export function DestroyIrisApiEngine(engine_ptr: IrisApiEngine): number {
    engine_ptr.destruction();
    return 0;
}

//eventHandler
export function SetIrisRtcEngineEventHandler(
    engine_ptr: IrisApiEngine,
    event_handler: IrisCEventHandler): IrisEventHandlerHandle {

    engine_ptr.setIrisRtcEngineEventHandler(event_handler);
    let handle: IrisEventHandlerHandle = event_handler;
    return handle;
}

export function UnsetIrisRtcEngineEventHandler(
    engine_ptr: IrisApiEngine,
    handle: IrisEventHandlerHandle): number {

    let event_handler: IrisCEventHandler = handle
    engine_ptr.unsetIrisRtcEngineEventHandler(event_handler);
    return 0;
}

export function CallIrisApi(
    engine_ptr: IrisApiEngine, func_name: string,
    params: string, paramLength: number,
    buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any = {}): number {

    return engine_ptr.callIrisApi(func_name, params, paramLength, buffer, bufferLength, result);

}

export function Attach(engine_ptr: IrisApiEngine,
    manager_ptr: IrisVideoFrameBufferManager) {

    engine_ptr.attach(manager_ptr);
}

export function Detach(engine_ptr: IrisApiEngine,
    manager_ptr: IrisVideoFrameBufferManager) {

    engine_ptr.detach(manager_ptr);
}





//audioFrame
// function RegisterAudioFrameObserver(
//     engine_ptr: IrisApiEngine,
//     observer: IrisRtcCAudioFrameObserver,
//     order: number, identifier: string): IrisRtcAudioFrameObserverHandle {
// }

// function UnRegisterAudioFrameObserver(
//     engine_ptr: IrisApiEngine,
//     handle: IrisRtcAudioFrameObserverHandle,
//     identifier: string): number {
// }


// //audioEncdoeFrame
// function RegisterAudioEncodedFrameObserver(
//     engine_ptr: IrisApiEngine,
//     observer: IrisCAudioEncodedFrameObserver,
//     params: string): IrisAudioEncodedFrameObserverHandle {

// }

// function UnRegisterAudioEncodedFrameObserver(
//     engine_ptr: IrisApiEngine,
//     handle: IrisAudioEncodedFrameObserverHandle,
//     identifier: string) {

// }

// //videoFrame
// function RegisterVideoFrameObserver(
//     engine_ptr: IrisApiEngine,
//     observer: IrisRtcCVideoFrameObserver,
//     order: number, identifier: string): IrisRtcVideoFrameObserverHandle {
// }

// function UnRegisterVideoFrameObserver(
//     engine_ptr: IrisApiEngine,
//     handle: IrisRtcVideoFrameObserverHandle, identifier: string): number {
// }


// //videoEncodedFrameObserver
// function RegisterVideoEncodedFrameObserver(
//     engine_ptr: IrisApiEnginePtr,
//     observer: IrisRtcCVideoEncodedVideoFrameObserver,
//     order: number, identifier: number): IrisRtcVideoEncodedVideoFrameObserverHandle {

// }

// function UnRegisterVideoEncodedFrameObserver(
//     engine_ptr: IrisApiEngine,
//     handle: IrisRtcVideoEncodedVideoFrameObserverHandle, identifier: string): number {

// }
//



import { ILocalVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";


export enum VIDEO_SOURCE_TYPE {
    /** Video captured by the camera.
     */
    VIDEO_SOURCE_CAMERA_PRIMARY,
    VIDEO_SOURCE_CAMERA = VIDEO_SOURCE_CAMERA_PRIMARY,
    /** Video captured by the secondary camera.
     */
    VIDEO_SOURCE_CAMERA_SECONDARY,
    /** Video for screen sharing.
     */
    VIDEO_SOURCE_SCREEN_PRIMARY,
    VIDEO_SOURCE_SCREEN = VIDEO_SOURCE_SCREEN_PRIMARY,
    /** Video for secondary screen sharing.
     */
    VIDEO_SOURCE_SCREEN_SECONDARY,
    /** Not define.
     */
    VIDEO_SOURCE_CUSTOM,
    /** Video for media player sharing.
     */
    VIDEO_SOURCE_MEDIA_PLAYER,
    /** Video for png image.
     */
    VIDEO_SOURCE_RTC_IMAGE_PNG,
    /** Video for png image.
     */
    VIDEO_SOURCE_RTC_IMAGE_JPEG,
    /** Video for png image.
     */
    VIDEO_SOURCE_RTC_IMAGE_GIF,
    /** Remote video received from network.
     */
    VIDEO_SOURCE_REMOTE,
    /** Video for transcoded.
     */
    VIDEO_SOURCE_TRANSCODED,

    VIDEO_SOURCE_UNKNOWN = 100
};

interface IrisApiEngine {

};

interface IrisCEventHandler {
    OnEvent(event: string, data: string, buffer: Array<any>, length: Array<number>, buffer_count: number);
};

interface IrisEventHandlerHandle {

};

interface IrisRtcCAudioFrameObserver {
}

interface IrisRtcAudioFrameObserverHandle extends IrisRtcCAudioFrameObserver {
}

//IrisApiEngine
function CreateIrisApiEngine(): IrisApiEngine {
}

function DestroyIrisApiEngine(engine_ptr: IrisApiEngine): number {
}

//eventHandler
function SetIrisRtcEngineEventHandler(
    engine_ptr: IrisApiEngine,
    event_handler: IrisCEventHandler): IrisEventHandlerHandle {
}

function UnsetIrisRtcEngineEventHandler(
    engine_ptr: IrisApiEngine,
    handle: IrisEventHandlerHandle): number {
}

function CallIrisApi(
    engine_ptr: IrisApiEngine, func_name: string,
    params: string, paramLength: number,
    buffer: Array<Uint8ClampedArray>, bufferLength: number, result: any = {}): number {
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



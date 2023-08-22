
// export * from "./IrisRtcApi";
// export * from "./IrisVideoProcessor";
import {
    CreateIrisApiEngine,
    DestroyIrisApiEngine,
    SetIrisRtcEngineEventHandler,
    UnsetIrisRtcEngineEventHandler,
    CallIrisApi,
    CallIrisApiAsync,
    Attach,
    Detach,
    SetGenerateVideoTrackLabelOrHtmlElementCb,
    __dump,
    CreateIrisEventHandler,

} from "./IrisRtcApi";


import {
    CreateIrisVideoFrameBufferManager,
    FreeIrisVideoFrameBufferManager,
    EnableVideoFrameBufferByConfig,
    DisableVideoFrameBufferByDelegate,
    DisableVideoFrameBufferByConfig,
    DisableAllVideoFrameBuffer,
    GetVideoFrame,
    GetVideoFrameByConfig
} from "./IrisVideoProcessor";


import { IrisApiEngine, EventParam, ApiParam } from "./engine/IrisApiEngine";


export let AgoraWrapper = {
    CreateIrisApiEngine: CreateIrisApiEngine,
    DestroyIrisApiEngine: DestroyIrisApiEngine,
    SetIrisRtcEngineEventHandler: SetIrisRtcEngineEventHandler,
    UnsetIrisRtcEngineEventHandler: UnsetIrisRtcEngineEventHandler,
    CallIrisApi: CallIrisApi,
    CallIrisApiAsync: CallIrisApiAsync,
    CreateIrisEventHandler: CreateIrisEventHandler,
    Attach: Attach,
    Detach: Detach,
    SetGenerateVideoTrackLabelOrHtmlElementCb: SetGenerateVideoTrackLabelOrHtmlElementCb,
    __dump: __dump,

    CreateIrisVideoFrameBufferManager: CreateIrisVideoFrameBufferManager,
    FreeIrisVideoFrameBufferManager: FreeIrisVideoFrameBufferManager,
    EnableVideoFrameBufferByConfig: EnableVideoFrameBufferByConfig,
    DisableVideoFrameBufferByDelegate: DisableVideoFrameBufferByDelegate,
    DisableVideoFrameBufferByConfig: DisableVideoFrameBufferByConfig,
    DisableAllVideoFrameBuffer: DisableAllVideoFrameBuffer,
    GetVideoFrame: GetVideoFrame,
    GetVideoFrameByConfig: GetVideoFrameByConfig,

    IrisApiEngine: IrisApiEngine,
    EventParam: EventParam,

};







// export * from "./IrisRtcApi";
// export * from "./IrisVideoProcessor";
import {
    CreateIrisApiEngine,
    DestroyIrisApiEngine,
    SetIrisRtcEngineEventHandler,
    UnsetIrisRtcEngineEventHandler,
    CallIrisApi,
    Attach,
    Detach,
    __dump,

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

export let AgoraWrapper = {
    CreateIrisApiEngine: CreateIrisApiEngine,
    DestroyIrisApiEngine: DestroyIrisApiEngine,
    SetIrisRtcEngineEventHandler: SetIrisRtcEngineEventHandler,
    UnsetIrisRtcEngineEventHandler: UnsetIrisRtcEngineEventHandler,
    CallIrisApi: CallIrisApi,
    Attach: Attach,
    Detach: Detach,
    __dump: __dump,

    CreateIrisVideoFrameBufferManager: CreateIrisVideoFrameBufferManager,
    FreeIrisVideoFrameBufferManager: FreeIrisVideoFrameBufferManager,
    EnableVideoFrameBufferByConfig: EnableVideoFrameBufferByConfig,
    DisableVideoFrameBufferByDelegate: DisableVideoFrameBufferByDelegate,
    DisableVideoFrameBufferByConfig: DisableVideoFrameBufferByConfig,
    DisableAllVideoFrameBuffer: DisableAllVideoFrameBuffer,
    GetVideoFrame: GetVideoFrame,
    GetVideoFrameByConfig: GetVideoFrameByConfig,
};






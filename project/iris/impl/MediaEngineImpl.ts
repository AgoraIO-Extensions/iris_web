import { IrisRtcEngine } from "../engine/IrisRtcEngine";
import { IMediaEngine } from "../terra/interface/IMediaEngine";
import { Action } from "../tool/AgoraActionQueue";
import { AgoraConsole } from "../tool/AgoraConsole";
import * as agorartc from "../terra/rtc_types/Index";

export class MediaEngineImpl implements IMediaEngine {
    private _engine: IrisRtcEngine;

    public constructor(engine: IrisRtcEngine) {
        this._engine = engine;
    }




    putAction(action: Action) {
        this._engine.actionQueue.putAction(action);
    }

    registerAudioFrameObserver(observer: agorartc.IAudioFrameObserver): number {
        AgoraConsole.warn("registerAudioFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerVideoFrameObserver(observer: agorartc.IVideoFrameObserver): number {
        AgoraConsole.warn("registerVideoFrameObserver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    registerVideoEncodedImageReceiver(receiver: agorartc.IVideoEncodedImageReceiver): number {
        AgoraConsole.warn("registerVideoEncodedImageReceiver not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushAudioFrame(type: agorartc.MEDIA_SOURCE_TYPE, frame: agorartc.AudioFrame, wrap: boolean, sourceId: number): number {
        AgoraConsole.warn("pushAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushCaptureAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pushCaptureAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushReverseAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pushReverseAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushDirectAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pushDirectAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pullAudioFrame(frame: agorartc.AudioFrame): number {
        AgoraConsole.warn("pullAudioFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }



    setExternalVideoSource(enabled: boolean, useTexture: boolean, sourceType: agorartc.EXTERNAL_VIDEO_SOURCE_TYPE): number {
        AgoraConsole.warn("setExternalVideoSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalAudioSource(enabled: boolean, sampleRate: number, channels: number, sourceNumber: number, localPlayback: boolean, publish: boolean): number {
        AgoraConsole.warn("setExternalAudioSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setExternalAudioSink(sampleRate: number, channels: number): number {
        AgoraConsole.warn("setExternalAudioSink not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    enableCustomAudioLocalPlayback(sourceId: number, enabled: number): number {
        AgoraConsole.warn("enableCustomAudioLocalPlayback not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    setDirectExternalAudioSource(enable: boolean, localPlayback: boolean): number {
        AgoraConsole.warn("setDirectExternalAudioSource not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushVideoFrame(frame: agorartc.ExternalVideoFrame): number {
        AgoraConsole.warn("pushVideoFrame not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushVideoFrame2(frame: agorartc.ExternalVideoFrame, connection: agorartc.RtcConnection): number {
        AgoraConsole.warn("pushVideoFrame2 not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }

    pushEncodedVideoImage(imageBuffer: Uint8ClampedArray, length: number, videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo): number {
        AgoraConsole.warn("pushEncodedVideoImage not supported in this platfrom!");
        return -agorartc.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
    }
}
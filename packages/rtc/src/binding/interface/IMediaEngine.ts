import { Action } from '../../util/AgoraActionQueue';
import * as agorartc from '../rtc_types/Index';

export interface IMediaEngine {
    putAction(action: Action);

    registerAudioFrameObserver(observer: agorartc.IAudioFrameObserver): number;
    registerVideoFrameObserver(observer: agorartc.IVideoFrameObserver): number;
    registerVideoEncodedImageReceiver(receiver: agorartc.IVideoEncodedImageReceiver): number;
    pullAudioFrame(frame: agorartc.AudioFrame): number;
    pushAudioFrame(type: agorartc.MEDIA_SOURCE_TYPE, frame: agorartc.AudioFrame, wrap: boolean, sourceId: number): number;
    pushCaptureAudioFrame(frame: agorartc.AudioFrame): number;
    pushReverseAudioFrame(frame: agorartc.AudioFrame): number;
    pushDirectAudioFrame(frame: agorartc.AudioFrame): number;

    setExternalVideoSource(enabled: boolean, useTexture: boolean, sourceType: agorartc.EXTERNAL_VIDEO_SOURCE_TYPE): number;
    setExternalAudioSource(enabled: boolean, sampleRate: number, channels: number, sourceNumber: number, localPlayback: boolean, publish: boolean): number;
    setExternalAudioSink(sampleRate: number, channels: number): number;
    enableCustomAudioLocalPlayback(sourceId: number, enabled: number): number;
    setDirectExternalAudioSource(enable: boolean, localPlayback: boolean): number;
    pushVideoFrame(frame: agorartc.ExternalVideoFrame): number;
    pushVideoFrame2(frame: agorartc.ExternalVideoFrame, connection: agorartc.RtcConnection): number;
    pushEncodedVideoImage(imageBuffer: Uint8ClampedArray, length: number, videoEncodedFrameInfo: agorartc.EncodedVideoFrameInfo): number;
}
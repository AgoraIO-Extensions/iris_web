import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaEngineImpl implements NATIVE_RTC.IMediaEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  registerVideoEncodedFrameObserver(
    observer: NATIVE_RTC.IVideoEncodedFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerVideoEncodedFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushAudioFrame(
    frame: NATIVE_RTC.AudioFrame,
    trackId: number
  ): CallApiReturnType {
    AgoraConsole.warn('pushAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback: boolean,
    publish: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('setExternalAudioSource not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  createCustomAudioTrack(
    trackType: NATIVE_RTC.AUDIO_TRACK_TYPE,
    config: NATIVE_RTC.AudioTrackConfig
  ): CallApiReturnType {
    AgoraConsole.warn('createCustomAudioTrack not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  destroyCustomAudioTrack(trackId: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomAudioTrack not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): CallApiReturnType {
    AgoraConsole.warn('setExternalAudioSink not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableCustomAudioLocalPlayback not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  pushEncodedVideoImage(
    imageBuffer: number,
    length: number,
    videoEncodedFrameInfo: NATIVE_RTC.EncodedVideoFrameInfo,
    videoTrackId: number
  ): CallApiReturnType {
    AgoraConsole.warn('pushEncodedVideoImage not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  registerAudioFrameObserver(observer: NATIVE_RTC.IAudioFrameObserver): number {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  registerVideoFrameObserver(observer: NATIVE_RTC.IVideoFrameObserver): number {
    AgoraConsole.warn(
      'registerVideoFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushCaptureAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pushCaptureAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushReverseAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pushReverseAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushDirectAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pushDirectAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pullAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pullAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
  ): number {
    AgoraConsole.warn('setExternalVideoSource not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  setDirectExternalAudioSource(
    enable: boolean,
    localPlayback: boolean
  ): number {
    AgoraConsole.warn(
      'setDirectExternalAudioSource not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushVideoFrame(frame: NATIVE_RTC.ExternalVideoFrame): number {
    AgoraConsole.warn('pushVideoFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

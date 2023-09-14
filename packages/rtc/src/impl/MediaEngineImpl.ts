import { CallApiReturnType } from 'iris-web-core';
import * as NATIVE_RTC from 'iris-web-rtc';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { Action } from '../util/AgoraActionQueue';
import { AgoraConsole } from '../util/AgoraConsole';

export class MediaEngineImpl implements NATIVE_RTC.IMediaEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }
  registerVideoEncodedFrameObserver(
    observer: NATIVE_RTC.IVideoEncodedFrameObserver
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pushAudioFrame(
    frame: NATIVE_RTC.AudioFrame,
    trackId: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback: boolean,
    publish: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  createCustomAudioTrack(
    trackType: NATIVE_RTC.AUDIO_TRACK_TYPE,
    config: NATIVE_RTC.AudioTrackConfig
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  destroyCustomAudioTrack(trackId: number): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  pushEncodedVideoImage(
    imageBuffer: number,
    length: number,
    videoEncodedFrameInfo: NATIVE_RTC.EncodedVideoFrameInfo,
    videoTrackId: number
  ): CallApiReturnType {
    throw new Error('Method not implemented.');
  }
  release(): CallApiReturnType {
    throw new Error('Method not implemented.');
  }

  putAction(action: Action) {
    this._engine.actionQueue.putAction(action);
  }

  registerAudioFrameObserver(observer: NATIVE_RTC.IAudioFrameObserver): number {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  registerVideoFrameObserver(observer: NATIVE_RTC.IVideoFrameObserver): number {
    AgoraConsole.warn(
      'registerVideoFrameObserver not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushCaptureAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pushCaptureAudioFrame not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushReverseAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pushReverseAudioFrame not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushDirectAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pushDirectAudioFrame not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pullAudioFrame(frame: NATIVE_RTC.AudioFrame): number {
    AgoraConsole.warn('pullAudioFrame not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE
  ): number {
    AgoraConsole.warn('setExternalVideoSource not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  setDirectExternalAudioSource(
    enable: boolean,
    localPlayback: boolean
  ): number {
    AgoraConsole.warn(
      'setDirectExternalAudioSource not supported in this platfrom!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushVideoFrame(frame: NATIVE_RTC.ExternalVideoFrame): number {
    AgoraConsole.warn('pushVideoFrame not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushVideoFrame2(
    frame: NATIVE_RTC.ExternalVideoFrame,
    connection: NATIVE_RTC.RtcConnection
  ): number {
    AgoraConsole.warn('pushVideoFrame2 not supported in this platfrom!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }
}

import * as NATIVE_RTC from '@iris/web-rtc';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';

export class IMediaEngineImpl implements NATIVE_RTC.IMediaEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  private execute(task: AsyncTaskType): CallApiReturnType {
    return this._engine.executor.execute(task);
  }

  private returnResult(
    isSuccess: boolean = true,
    code: number = NATIVE_RTC.ERROR_CODE_TYPE.ERR_OK,
    data: string = '{"result": 0}'
  ): Promise<CallIrisApiResult> {
    if (!isSuccess) {
      code = -NATIVE_RTC.ERROR_CODE_TYPE.ERR_FAILED;
    }
    return Promise.resolve(new CallIrisApiResult(code, data));
  }

  setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE,
    encodedVideoOption: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalVariables.pushVideoFrameEnabled = enabled;
      this._engine.globalVariables.pushVideoFrameUseTexture = useTexture;
      this._engine.globalVariables.pushVideoFrameSourceType = sourceType;
      this._engine.globalVariables.pushVideoFrameEncodedVideoOption = encodedVideoOption;

      return this.returnResult();
    };
    return this.execute(processFunc);
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
    imageBuffer: Uint8Array,
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

  registerAudioFrameObserver(
    observer: NATIVE_RTC.IAudioFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  registerVideoFrameObserver(
    observer: NATIVE_RTC.IVideoFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerVideoFrameObserver not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushCaptureAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushCaptureAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushReverseAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushReverseAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushDirectAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushDirectAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pullAudioFrame(frame: NATIVE_RTC.AudioFrame[]): CallApiReturnType {
    AgoraConsole.warn('pullAudioFrame not supported in this platform!');
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  setDirectExternalAudioSource(
    enable: boolean,
    localPlayback: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectExternalAudioSource not supported in this platform!'
    );
    return -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED;
  }

  pushVideoFrame(
    frame: NATIVE_RTC.ExternalVideoFrame[],
    videoTrackId: number
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      if (!this._engine.globalVariables.pushVideoFrameEnabled) {
        AgoraConsole.error(
          'pushVideoFrameEnabled is disabled , call setExternalVideoSource first'
        );
        return this.returnResult(false);
      }

      return this.returnResult();
    };
    return this.execute(processFunc);
  }
}

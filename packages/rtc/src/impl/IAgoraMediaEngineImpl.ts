import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ILocalAudioTrack, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
import {
  AsyncTaskType,
  CallApiReturnType,
  CallIrisApiResult,
} from 'iris-web-core';

import { IrisAudioSourceType, IrisClientType } from '../base/BaseType';
import { IrisApiType } from '../base/IrisApiType';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { IrisTrackEventHandler } from '../event_handler/IrisTrackEventHandler';
import { TrackHelper } from '../helper/TrackHelper';
import { AgoraConsole } from '../util/AgoraConsole';
import { drawRGBABufferToCanvas } from '../util/BufferConvert';

import { ImplHelper } from './ImplHelper';

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
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pushAudioFrame(
    frame: NATIVE_RTC.AudioFrame,
    trackId: number
  ): CallApiReturnType {
    AgoraConsole.warn('pushAudioFrame not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback: boolean,
    publish: boolean
  ): CallApiReturnType {
    AgoraConsole.warn('setExternalAudioSource not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createCustomAudioTrack(
    trackType: NATIVE_RTC.AUDIO_TRACK_TYPE,
    config: NATIVE_RTC.AudioTrackConfig
  ): CallApiReturnType {
    AgoraConsole.warn('createCustomAudioTrack not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  destroyCustomAudioTrack(trackId: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomAudioTrack not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): CallApiReturnType {
    AgoraConsole.warn('setExternalAudioSink not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'enableCustomAudioLocalPlayback not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: NATIVE_RTC.EncodedVideoFrameInfo,
    videoTrackId: number
  ): CallApiReturnType {
    AgoraConsole.warn('pushEncodedVideoImage not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  registerAudioFrameObserver(
    observer: NATIVE_RTC.IAudioFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerAudioFrameObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  registerVideoFrameObserver(
    observer: NATIVE_RTC.IVideoFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerVideoFrameObserver not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushCaptureAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushCaptureAudioFrame not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushReverseAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushReverseAudioFrame not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushDirectAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushDirectAudioFrame not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pullAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pullAudioFrame not supported in this platform!');
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  setDirectExternalAudioSource(
    enable: boolean,
    localPlayback: boolean
  ): CallApiReturnType {
    AgoraConsole.warn(
      'setDirectExternalAudioSource not supported in this platform!'
    );
    return this.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushVideoFrame(
    frame: NATIVE_RTC.ExternalVideoFrame,
    videoTrackId: number
  ): CallApiReturnType {
    //调用engine.release后才会创建新的track
    let processFunc = async (): Promise<CallIrisApiResult> => {
      if (!this._engine.globalVariables.pushVideoFrameEnabled) {
        AgoraConsole.error(
          'pushVideoFrameEnabled is disabled , call setExternalVideoSource first'
        );
        return this.returnResult(false);
      }
      //创建custom track的html element
      let irisContainer = this._engine.irisElement.getIrisElement();
      if (!irisContainer) {
        irisContainer = this._engine.irisElement.createIrisElement();
      }
      let canvasID = `${IrisApiType.FUNC_MEDIAENGINE_PUSHVIDEOFRAME}_CANVAS`;
      let canvas: HTMLCanvasElement = document.querySelector(`#${canvasID}`);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = canvasID;
        canvas.style.display = 'none';
      }
      if (
        frame.format !== NATIVE_RTC.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_BGRA &&
        frame.format !== NATIVE_RTC.VIDEO_PIXEL_FORMAT.VIDEO_PIXEL_RGBA
      ) {
        AgoraConsole.error(`format${frame.format} not supported`);
        return this.returnResult(
          false,
          -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
        );
      }
      drawRGBABufferToCanvas(
        frame.stride,
        frame.height,
        frame.buffer,
        frame.format,
        canvas
      );
      irisContainer.appendChild(canvas);
      document.body.appendChild(irisContainer);
      const stream = canvas.captureStream();

      let audioType = IrisAudioSourceType.kAudioSourceTypeUnknown;
      let videoType = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM;
      let clientType = IrisClientType.kClientMain;

      let trackArray: [ILocalAudioTrack, ILocalVideoTrack] = [null, null];
      try {
        trackArray = await ImplHelper.getOrCreateCustomAudioAndVideoTrackAsync(
          this._engine,
          audioType,
          videoType,
          stream.getVideoTracks()[0],
          clientType,
          null
        );
      } catch (err) {
        err && AgoraConsole.error(err);
        return this.returnResult(false);
      }
      let videoTrack: ILocalVideoTrack = trackArray[1] as ILocalVideoTrack;
      if (videoTrack) {
        let videoPackage = this._engine.entitiesContainer.getLocalVideoTrackByType(
          NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM
        );
        if (!videoTrack.enabled) {
          await TrackHelper.setEnabled(videoTrack, true);
        }

        //如果没有播放，需要play
        if (!videoTrack.isPlaying) {
          videoTrack.play(videoPackage.element);
        }
        //如果已经加入频道，需要publish
        if (this._engine.globalVariables.isJoinChannel) {
          let mainClient = this._engine.entitiesContainer.getMainClient();
          try {
            await mainClient.publish(videoTrack);
          } catch (reason) {
            AgoraConsole.error(reason);
          }
          let trackEventHandler: IrisTrackEventHandler = new IrisTrackEventHandler(
            {
              channelName: mainClient.channelName,
              client: mainClient,
              track: videoTrack,
              trackType: 'ILocalVideoTrack',
            },
            this._engine
          );
          this._engine.entitiesContainer.addMainClientTrackEventHandler(
            trackEventHandler
          );
        }
      }

      return this.returnResult();
    };
    return this.execute(processFunc);
  }
}

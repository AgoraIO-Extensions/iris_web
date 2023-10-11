import * as NATIVE_RTC from '@iris/native-rtc-binding';
import { ILocalVideoTrack } from 'agora-rtc-sdk-ng';
import { CallApiReturnType, CallIrisApiResult } from 'iris-web-core';

import { VideoTrackPackage } from '../engine/IrisClientManager';

import { NotifyType } from '../engine/IrisClientObserver';

import { IrisRtcEngine } from '../engine/IrisRtcEngine';
import { AgoraConsole } from '../util/AgoraConsole';
import { drawRGBABufferToCanvas } from '../util/BufferConvert';

export class IMediaEngineImpl implements NATIVE_RTC.IMediaEngine {
  private _engine: IrisRtcEngine;

  public constructor(engine: IrisRtcEngine) {
    this._engine = engine;
  }

  setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: NATIVE_RTC.EXTERNAL_VIDEO_SOURCE_TYPE,
    encodedVideoOption: NATIVE_RTC.SenderOptions
  ): CallApiReturnType {
    let processFunc = async (): Promise<CallIrisApiResult> => {
      this._engine.globalState.pushVideoFrameEnabled = enabled;
      this._engine.globalState.pushVideoFrameUseTexture = useTexture;
      this._engine.globalState.pushVideoFrameSourceType = sourceType;
      this._engine.globalState.pushVideoFrameEncodedVideoOption = encodedVideoOption;

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
  registerVideoEncodedFrameObserver(
    observer: NATIVE_RTC.IVideoEncodedFrameObserver
  ): CallApiReturnType {
    AgoraConsole.warn(
      'registerVideoEncodedFrameObserver not supported in this platform!'
    );
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  pushAudioFrame(
    frame: NATIVE_RTC.AudioFrame,
    trackId: number
  ): CallApiReturnType {
    AgoraConsole.warn('pushAudioFrame not supported in this platform!');
    return this._engine.returnResult(
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
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  createCustomAudioTrack(
    trackType: NATIVE_RTC.AUDIO_TRACK_TYPE,
    config: NATIVE_RTC.AudioTrackConfig
  ): CallApiReturnType {
    AgoraConsole.warn('createCustomAudioTrack not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  destroyCustomAudioTrack(trackId: number): CallApiReturnType {
    AgoraConsole.warn(
      'destroyCustomAudioTrack not supported in this platform!'
    );
    return this._engine.returnResult(
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
    return this._engine.returnResult(
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
    return this._engine.returnResult(
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
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }
  release(): CallApiReturnType {
    AgoraConsole.warn('release not supported in this platform!');
    return this._engine.returnResult(
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
    return this._engine.returnResult(
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
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushCaptureAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushCaptureAudioFrame not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushReverseAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushReverseAudioFrame not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pushDirectAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pushDirectAudioFrame not supported in this platform!');
    return this._engine.returnResult(
      false,
      -NATIVE_RTC.ERROR_CODE_TYPE.ERR_NOT_SUPPORTED
    );
  }

  pullAudioFrame(frame: NATIVE_RTC.AudioFrame): CallApiReturnType {
    AgoraConsole.warn('pullAudioFrame not supported in this platform!');
    return this._engine.returnResult(
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
    return this._engine.returnResult(
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
      if (this._engine.globalState.enabledVideo == false) {
        AgoraConsole.error('call enableVideo(true) before startPreview');
        return this._engine.returnResult(false);
      }
      if (!this._engine.globalState.pushVideoFrameEnabled) {
        AgoraConsole.error(
          'pushVideoFrameEnabled is disabled , call setExternalVideoSource first'
        );
        return this._engine.returnResult(false);
      }
      //创建custom track的html element
      let irisContainer = this._engine.irisElement.getIrisElement();
      if (!irisContainer) {
        irisContainer = this._engine.irisElement.createIrisElement();
      }
      let canvasID = `MediaEngine_pushVideoFrame_CANVAS`;
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
        return this._engine.returnResult(
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
      let mediaStreamTrack = stream.getVideoTracks()[0];

      let videoType = NATIVE_RTC.VIDEO_SOURCE_TYPE.VIDEO_SOURCE_CUSTOM;
      let videoTrackPackage: VideoTrackPackage;
      try {
        videoTrackPackage = await this._engine.implHelper.createCustomVideoTrack(
          videoType,
          mediaStreamTrack
        );
      } catch (err) {
        err && AgoraConsole.error(err);
        return this._engine.returnResult(false);
      }
      let videoTrack: ILocalVideoTrack = videoTrackPackage.track as ILocalVideoTrack;
      if (videoTrack) {
        if (!videoTrack.enabled) {
          await this._engine.trackHelper.setEnabled(videoTrack, true);
        }
        //如果没有播放，需要play
        if (!videoTrack.isPlaying && videoTrackPackage.element) {
          this._engine.trackHelper.play(videoTrack, videoTrackPackage.element);
        }
        this._engine.irisClientManager.irisClientObserver.notifyLocal(
          NotifyType.PUBLISH_TRACK,
          [videoTrackPackage],
          this._engine.irisClientManager.irisClientList
        );
      }

      return this._engine.returnResult();
    };
    return this._engine.execute(processFunc);
  }
}
